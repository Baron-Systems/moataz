"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";

interface Stats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
}

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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/appointments");
      const data: Appointment[] = await res.json();
      const today = new Date().toISOString().split("T")[0];

      const todayList = data.filter((a) => a.date?.startsWith(today)).sort((a, b) => a.time.localeCompare(b.time));

      setStats({
        totalAppointments: data.length || 0,
        todayAppointments: todayList.length || 0,
        pendingAppointments: data.filter((a) => a.status === "pending").length || 0,
        confirmedAppointments: data.filter((a) => a.status === "confirmed").length || 0,
      });
      setTodayAppointments(todayList);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      label: "إجمالي الحجوزات",
      value: stats.totalAppointments,
      icon: Activity,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "حجوزات اليوم",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "حجوزات معلقة",
      value: stats.pendingAppointments,
      icon: AlertCircle,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "حجوزات مؤكدة",
      value: stats.confirmedAppointments,
      icon: CheckCircle2,
      color: "bg-[#0F4C81]",
      lightColor: "bg-[#0F4C81]/10",
      textColor: "text-[#0F4C81]",
    },
  ];

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

  return (
    <AdminLayout title="الرئيسية">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`${stat.lightColor} p-3 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1E88E5]" />
              <h2 className="text-lg font-bold text-slate-800">حجوزات اليوم</h2>
            </div>
            <Link
              href="/admin/appointments"
              className="text-sm text-[#1E88E5] hover:text-[#0F4C81] font-medium flex items-center gap-1"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">جاري التحميل...</div>
          ) : todayAppointments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500">لا توجد حجوزات لهذا اليوم</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {todayAppointments.map((appt) => (
                <div key={appt.id} className="p-5 hover:bg-slate-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-800">{appt.fullName}</h3>
                        {statusBadge(appt.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {appt.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appt.visitType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appt.time}
                        </span>
                      </div>
                      {appt.description && (
                        <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {appt.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-4">اختصارات سريعة</h2>
          <div className="space-y-2">
            {[
              { href: "/admin/appointments", label: "إدارة الحجوزات", color: "bg-blue-50 text-blue-600" },
              { href: "/admin/work-schedule", label: "جدول الدوام", color: "bg-emerald-50 text-emerald-600" },
              { href: "/admin/holidays", label: "الإجازات", color: "bg-amber-50 text-amber-600" },
              { href: "/admin/time-blocks", label: "حجب الفترات", color: "bg-red-50 text-red-600" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition group"
              >
                <span className="font-medium text-slate-700 group-hover:text-[#0F4C81]">{link.label}</span>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${link.color}`}>
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
