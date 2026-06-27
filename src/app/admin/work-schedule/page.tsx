"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Check, Clock, CalendarDays, AlertCircle } from "lucide-react";

interface WorkSchedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function AdminWorkSchedulePage() {
  const [schedule, setSchedule] = useState<WorkSchedule[]>([]);
  const [savingDay, setSavingDay] = useState<number | null>(null);
  const [savedDay, setSavedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/work-schedule")
      .then((r) => r.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      });
  }, []);

  function updateDay(dayOfWeek: number, field: keyof WorkSchedule, value: string | boolean) {
    setSchedule((prev) => {
      const existing = prev.find((s) => s.dayOfWeek === dayOfWeek);
      if (existing) {
        return prev.map((s) => (s.dayOfWeek === dayOfWeek ? { ...s, [field]: value } : s));
      }
      return [...prev, { id: 0, dayOfWeek, startTime: "09:00", endTime: "17:00", isActive: true, [field]: value }];
    });
  }

  async function handleSave(dayOfWeek: number) {
    const day = schedule.find((s) => s.dayOfWeek === dayOfWeek);
    if (!day) return;

    setSavingDay(dayOfWeek);
    await fetch("/api/work-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dayOfWeek,
        startTime: day.startTime,
        endTime: day.endTime,
        isActive: day.isActive,
      }),
    });

    setSavingDay(null);
    setSavedDay(dayOfWeek);
    setTimeout(() => setSavedDay(null), 2000);
    fetch("/api/work-schedule")
      .then((r) => r.json())
      .then((data) => setSchedule(data));
  }

  function getDaySchedule(dayOfWeek: number) {
    return schedule.find((s) => s.dayOfWeek === dayOfWeek) || {
      id: 0,
      dayOfWeek,
      startTime: "09:00",
      endTime: "17:00",
      isActive: false,
    };
  }

  return (
    <AdminLayout title="جدول الدوام">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">ساعات العمل</h2>
            <p className="text-sm text-slate-500">حدد أيام وساعات الدوام للمواعيد المتاحة</p>
          </div>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center text-slate-500">جاري التحميل...</div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {days.map((dayName, dayOfWeek) => {
                const ws = getDaySchedule(dayOfWeek);
                const isSaving = savingDay === dayOfWeek;
                const isSaved = savedDay === dayOfWeek;
                return (
                  <div
                    key={dayOfWeek}
                    className={`p-4 transition ${ws.isActive ? "hover:bg-slate-50" : "bg-slate-50/50"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-bold ${ws.isActive ? "text-slate-800" : "text-slate-400"}`}>
                        {dayName}
                      </span>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ws.isActive}
                          onChange={(e) => updateDay(dayOfWeek, "isActive", e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                        />
                        <span className={`text-sm font-medium ${ws.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                          {ws.isActive ? "يعمل" : "متوقف"}
                        </span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="relative">
                        <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="time"
                          value={ws.startTime}
                          onChange={(e) => updateDay(dayOfWeek, "startTime", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl pr-9 pl-3 py-2 outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="time"
                          value={ws.endTime}
                          onChange={(e) => updateDay(dayOfWeek, "endTime", e.target.value)}
                          className="w-full border border-slate-200 rounded-xl pr-9 pl-3 py-2 outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleSave(dayOfWeek)}
                      disabled={isSaving}
                      className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition ${
                        isSaved
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-[#1E88E5] text-white hover:bg-[#1565C0]"
                      } disabled:opacity-50`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4" /> تم الحفظ
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> {isSaving ? "جاري الحفظ..." : "حفظ"}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">اليوم</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">وقت البداية</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">وقت النهاية</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الحالة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">حفظ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {days.map((dayName, dayOfWeek) => {
                    const ws = getDaySchedule(dayOfWeek);
                    const isSaving = savingDay === dayOfWeek;
                    const isSaved = savedDay === dayOfWeek;
                    return (
                      <tr
                        key={dayOfWeek}
                        className={`transition ${ws.isActive ? "hover:bg-slate-50" : "bg-slate-50/50 hover:bg-slate-50"}`}
                      >
                        <td className="px-5 py-4">
                          <span className={`font-medium ${ws.isActive ? "text-slate-800" : "text-slate-400"}`}>
                            {dayName}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="relative inline-block">
                            <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                              type="time"
                              value={ws.startTime}
                              onChange={(e) => updateDay(dayOfWeek, "startTime", e.target.value)}
                              className="border border-slate-200 rounded-xl pr-9 pl-3 py-2 outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                            />
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="relative inline-block">
                            <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                              type="time"
                              value={ws.endTime}
                              onChange={(e) => updateDay(dayOfWeek, "endTime", e.target.value)}
                              className="border border-slate-200 rounded-xl pr-9 pl-3 py-2 outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                            />
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={ws.isActive}
                              onChange={(e) => updateDay(dayOfWeek, "isActive", e.target.checked)}
                              className="w-5 h-5 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                            />
                            <span className={`text-sm font-medium ${ws.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                              {ws.isActive ? "يعمل" : "متوقف"}
                            </span>
                          </label>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleSave(dayOfWeek)}
                            disabled={isSaving}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                              isSaved
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-[#1E88E5] text-white hover:bg-[#1565C0]"
                            } disabled:opacity-50`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-4 h-4" /> تم الحفظ
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" /> {isSaving ? "جاري الحفظ..." : "حفظ"}
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800 text-sm">ملاحظة</h3>
          <p className="text-sm text-amber-700 mt-1">
            يجب حفظ كل يوم على حدة. تغيير ساعات العمل يؤثر على المواعيد المتاحة للمرضى مباشرة.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
