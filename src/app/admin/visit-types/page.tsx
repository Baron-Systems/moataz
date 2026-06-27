"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Plus, Trash2, Edit2, Save, X, Settings, Check } from "lucide-react";

interface VisitType {
  id: number;
  name: string;
  slotCount: number;
  isActive: boolean;
}

const emptyForm = {
  name: "",
  slotCount: 1,
  isActive: true,
};

export default function AdminVisitTypesPage() {
  const [types, setTypes] = useState<VisitType[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTypes();
  }, []);

  async function fetchTypes() {
    const res = await fetch("/api/visit-types");
    const data = await res.json();
    setTypes(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingId ? `/api/visit-types/${editingId}` : "/api/visit-types";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(emptyForm);
    setEditingId(null);
    fetchTypes();
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await fetch(`/api/visit-types/${id}`, { method: "DELETE" });
    fetchTypes();
  }

  function startEdit(vt: VisitType) {
    setForm({
      name: vt.name,
      slotCount: vt.slotCount,
      isActive: vt.isActive,
    });
    setEditingId(vt.id);
  }

  return (
    <AdminLayout title="أنواع الزيارات">
      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            {editingId ? "تعديل نوع زيارة" : "إضافة نوع زيارة"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">اسم الزيارة</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
              placeholder="مثلاً: زيارة أولى"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              عدد الخانات <span className="text-slate-400 font-normal">(30 دقيقة للخانة)</span>
            </label>
            <input
              type="number"
              required
              min={1}
              value={form.slotCount}
              onChange={(e) => setForm({ ...form, slotCount: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
            />
          </div>
          <div className="flex items-center gap-2 h-[42px] px-4">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-[#1E88E5] focus:ring-[#1E88E5]"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">متاح للحجز</label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#1E88E5] text-white px-5 py-2.5 rounded-xl hover:bg-[#1565C0] transition font-medium text-sm"
            >
              <Save className="w-4 h-4" />
              {editingId ? "حفظ التعديلات" : "إضافة نوع"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditingId(null); }}
                className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition font-medium text-sm"
              >
                <X className="w-4 h-4" />
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Mobile cards / Desktop table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">أنواع الزيارات</h2>
        </div>

        {types.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">لا توجد أنواع زيارات</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {types.map((vt) => (
                <div key={vt.id} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="font-bold text-slate-800">{vt.name}</p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        vt.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {vt.isActive ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> متاح
                        </>
                      ) : (
                        "غير متاح"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {vt.slotCount} خانة
                    </span>
                    <span>{vt.slotCount * 30} دقيقة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(vt)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium transition"
                    >
                      <Edit2 className="w-4 h-4" /> تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(vt.id)}
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
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الاسم</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">عدد الخانات</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">المدة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الحالة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {types.map((vt) => (
                    <tr key={vt.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4 font-medium text-slate-800">{vt.name}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {vt.slotCount} خانة
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{vt.slotCount * 30} دقيقة</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            vt.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {vt.isActive ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> متاح
                            </>
                          ) : (
                            "غير متاح"
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(vt)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(vt.id)}
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
