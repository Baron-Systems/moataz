"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Edit2, Trash2, X, Ban, Calendar, Clock, AlertCircle } from "lucide-react";

interface TimeBlock {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

const emptyForm = {
  title: "",
  date: "",
  startTime: "",
  endTime: "",
};

export default function AdminTimeBlocksPage() {
  const [blocks, setBlocks] = useState<TimeBlock[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  async function fetchBlocks() {
    const res = await fetch("/api/time-blocks");
    const data = await res.json();
    setBlocks(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingId ? `/api/time-blocks/${editingId}` : "/api/time-blocks";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(emptyForm);
    setEditingId(null);
    fetchBlocks();
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من حذف هذه الفترة المحجوبة؟")) return;
    await fetch(`/api/time-blocks/${id}`, { method: "DELETE" });
    fetchBlocks();
  }

  function startEdit(b: TimeBlock) {
    setForm({
      title: b.title,
      date: b.date.split("T")[0],
      startTime: b.startTime,
      endTime: b.endTime,
    });
    setEditingId(b.id);
  }

  return (
    <AdminLayout title="حجب الفترات الزمنية">
      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Ban className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            {editingId ? "تعديل فترة محجوبة" : "حجب فترة زمنية"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">العنوان</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              placeholder="مثلاً: اجتماع"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">التاريخ</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full pr-9 pl-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">من الساعة</label>
            <div className="relative">
              <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="time"
                required
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full pr-9 pl-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">إلى الساعة</label>
            <div className="relative">
              <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="time"
                required
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full pr-9 pl-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              />
            </div>
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
      </div>

      {/* Mobile cards / Desktop table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">الفترات المحجوبة</h2>
        </div>

        {blocks.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ban className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">لا توجد فترات محجوبة</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {blocks.map((b) => (
                <div key={b.id} className="p-4 hover:bg-slate-50 transition">
                  <p className="font-bold text-slate-800 mb-2">{b.title}</p>
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-600">
                    <span>
                      {new Date(b.date).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {b.startTime} - {b.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(b)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium transition"
                    >
                      <Edit2 className="w-4 h-4" /> تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">التاريخ</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الفترة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blocks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4 font-medium text-slate-800">{b.title}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {new Date(b.date).toLocaleDateString("ar-SA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {b.startTime} - {b.endTime}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(b)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
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

      <div className="mt-6 bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-purple-800 text-sm">ملاحظة</h3>
          <p className="text-sm text-purple-700 mt-1">
            الفترات المحجوبة تمنع ظهور المواعيد في هذا الوقت محدد دون إغلاق اليوم كاملاً.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
