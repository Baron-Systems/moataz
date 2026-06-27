"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Edit2, Trash2, X, CalendarDays, Clock, Sun, Moon } from "lucide-react";

interface Holiday {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  isFullDay: boolean;
  startTime?: string | null;
  endTime?: string | null;
}

const emptyForm = {
  title: "",
  startDate: "",
  endDate: "",
  isFullDay: true,
  startTime: "",
  endTime: "",
};

export default function AdminHolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  async function fetchHolidays() {
    const res = await fetch("/api/holidays");
    const data = await res.json();
    setHolidays(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingId ? `/api/holidays/${editingId}` : "/api/holidays";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(emptyForm);
    setEditingId(null);
    fetchHolidays();
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من حذف هذه الإجازة؟")) return;
    await fetch(`/api/holidays/${id}`, { method: "DELETE" });
    fetchHolidays();
  }

  function startEdit(h: Holiday) {
    setForm({
      title: h.title,
      startDate: h.startDate.split("T")[0],
      endDate: h.endDate.split("T")[0],
      isFullDay: h.isFullDay,
      startTime: h.startTime || "",
      endTime: h.endTime || "",
    });
    setEditingId(h.id);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <AdminLayout title="إدارة الإجازات">
      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            {editingId ? "تعديل إجازة" : "إضافة إجازة"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">العنوان</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              placeholder="مثلاً: عيد الأضحى"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">من تاريخ</label>
            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">إلى تاريخ</label>
            <input
              type="date"
              required
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#1E88E5] text-white px-5 py-2.5 rounded-xl hover:bg-[#1565C0] transition font-medium text-sm"
            >
              <Save className="w-4 h-4" />
              {editingId ? "حفظ" : "إضافة"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditingId(null); }}
                className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition font-medium text-sm"
              >
                <X className="w-4 h-4" /> إلغاء
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="isFullDay"
              checked={form.isFullDay}
              onChange={(e) => setForm({ ...form, isFullDay: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
            />
            <span className="text-sm font-medium text-slate-700">إجازة يوم كامل</span>
          </label>

          {!form.isFullDay && (
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="pr-9 pl-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                />
              </div>
              <div className="relative">
                <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="pr-9 pl-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile cards / Desktop table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">قائمة الإجازات</h2>
        </div>

        {holidays.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarDays className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">لا توجد إجازات</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {holidays.map((h) => (
                <div key={h.id} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="font-bold text-slate-800">{h.title}</p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        h.isFullDay
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {h.isFullDay ? (
                        <>
                          <Sun className="w-3.5 h-3.5" /> يوم كامل
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5" /> {h.startTime} - {h.endTime}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <span>من: {formatDate(h.startDate)}</span>
                    <span className="block">إلى: {formatDate(h.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(h)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium transition"
                    >
                      <Edit2 className="w-4 h-4" /> تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-medium transition"
                    >
                      <Trash2 className="w-4 h-4" /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">العنوان</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الفترة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">النوع</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {holidays.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4 font-medium text-slate-800">{h.title}</td>
                      <td className="px-5 py-4">
                        <div className="space-y-1 text-sm text-slate-600">
                          <span>من: {formatDate(h.startDate)}</span>
                          <span className="block">إلى: {formatDate(h.endDate)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            h.isFullDay
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {h.isFullDay ? (
                            <>
                              <Sun className="w-3.5 h-3.5" /> يوم كامل
                            </>
                          ) : (
                            <>
                              <Moon className="w-3.5 h-3.5" /> {h.startTime} - {h.endTime}
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(h)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(h.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
