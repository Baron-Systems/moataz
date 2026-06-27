"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Search,
  Phone,
  Calendar,
  Clock,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  X,
  User,
  Stethoscope,
} from "lucide-react";

interface Appointment {
  id: number;
  fullName: string;
  phone: string;
  visitType: string;
  date: string;
  time: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [filterDate]);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const url = filterDate ? `/api/appointments?date=${filterDate}` : "/api/appointments";
      const res = await fetch(url);
      const data = await res.json();
      setAppointments(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchAppointments();
    } catch {
      // silent
    }
  }

  async function deleteAppointment(id: number) {
    if (!confirm("هل أنت متأكد من حذف هذا الحجز؟")) return;
    try {
      await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      fetchAppointments();
    } catch {
      // silent
    }
  }

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.visitType.includes(search);
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function statusBadge(status: string) {
    const classes =
      status === "pending"
        ? "bg-amber-100 text-amber-700"
        : status === "confirmed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700";
    const label = status === "pending" ? "معلق" : status === "confirmed" ? "مؤكد" : "ملغي";
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>{label}</span>;
  }

  const hasFilters = filterDate || search || statusFilter !== "all";

  function clearFilters() {
    setFilterDate("");
    setSearch("");
    setStatusFilter("all");
  }

  return (
    <AdminLayout title="إدارة الحجوزات">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#1E88E5]" />
          <h2 className="font-bold text-slate-800">فلترة الحجوزات</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="بحث بالاسم أو الجوال أو نوع الزيارة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] text-sm appearance-none bg-white"
            >
              <option value="all">كل الحالات</option>
              <option value="pending">معلقة</option>
              <option value="confirmed">مؤكدة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition"
            >
              <X className="w-4 h-4" />
              إلغاء الفلترة
            </button>
          )}
        </div>
      </div>

      {/* Mobile cards / Desktop table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">قائمة الحجوزات</h2>
          <span className="text-sm text-slate-500">{filtered.length} حجز</span>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center text-slate-500">جاري تحميل الحجوزات...</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">لا توجد حجوزات</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#1E88E5] hover:text-[#0F4C81] mt-2"
              >
                إلغاء الفلترة
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filtered.map((appt) => (
                <div key={appt.id} className="p-4 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#0F4C81]" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{appt.fullName}</p>
                        <a
                          href={`tel:${appt.phone}`}
                          className="text-sm text-slate-500 hover:text-[#1E88E5] flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {appt.phone}
                        </a>
                      </div>
                    </div>
                    {statusBadge(appt.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-slate-400" />
                      {appt.visitType}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(appt.date).toLocaleDateString("ar-SA")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {appt.time}
                    </span>
                    {appt.description && (
                      <span className="flex items-center gap-1.5 col-span-2">
                        <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{appt.description}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {appt.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(appt.id, "confirmed")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium transition"
                      >
                        <CheckCircle2 className="w-4 h-4" /> تأكيد
                      </button>
                    )}
                    {appt.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(appt.id, "cancelled")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-medium transition"
                      >
                        <XCircle className="w-4 h-4" /> إلغاء
                      </button>
                    )}
                    <button
                      onClick={() => deleteAppointment(appt.id)}
                      className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
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
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">المريض</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">نوع الزيارة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الموعد</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الوصف</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">الحالة</th>
                    <th className="px-5 py-3.5 text-sm font-semibold text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#0F4C81]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-[#0F4C81]" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{appt.fullName}</p>
                            <a
                              href={`tel:${appt.phone}`}
                              className="text-sm text-slate-500 hover:text-[#1E88E5] flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {appt.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Stethoscope className="w-4 h-4 text-slate-400" />
                          {appt.visitType}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1 text-sm text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {new Date(appt.date).toLocaleDateString("ar-SA")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {appt.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 max-w-xs truncate" title={appt.description}>
                          {appt.description ? (
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              {appt.description}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-4">{statusBadge(appt.status)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {appt.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(appt.id, "confirmed")}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="تأكيد"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {appt.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(appt.id, "cancelled")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="إلغاء"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(appt.id)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
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
