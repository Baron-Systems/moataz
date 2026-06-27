"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Phone, User, ClipboardList, ChevronDown, CheckCircle } from "lucide-react";

interface VisitType {
  id: number;
  name: string;
  minDuration: number;
  maxDuration: number;
  restMinutes: number;
}

interface AvailableSlot {
  time: string;
  duration: number;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function addMinutes(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

export default function BookingPage() {
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    visitTypeId: "",
    date: "",
    time: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string }>({});

  const validateForm = () => {
    const errors: { fullName?: string; phone?: string } = {};
    if (form.fullName.length > 50) {
      errors.fullName = "الاسم يجب ألا يزيد عن 50 حرف";
    }
    if (form.phone.length > 13) {
      errors.phone = "رقم الواتساب يجب ألا يزيد عن 13 رقماً";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Load visit types
  useEffect(() => {
    fetch("/api/visit-types")
      .then((r) => r.json())
      .then((data) => setVisitTypes(data))
      .catch(() => setVisitTypes([]));
  }, []);

  // Load available slots when date or visit type changes
  useEffect(() => {
    if (form.date && form.visitTypeId) {
      setLoading(true);
      fetch(`/api/available-slots?date=${form.date}&visitTypeId=${form.visitTypeId}`)
        .then((r) => r.json())
        .then((data) => {
          setAvailableSlots(data.slots || []);
          setLoading(false);
        })
        .catch(() => {
          setAvailableSlots([]);
          setLoading(false);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [form.date, form.visitTypeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.time) return;
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setWhatsappUrl(data.whatsappUrl || "");
        setSubmitted(true);
        setForm({ fullName: "", phone: "", visitTypeId: "", date: "", time: "", description: "" });
      }
    } catch {
      // error handled silently
    }
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">حجز موعد</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              احجز موعدك الآن للحصول على رعاية متخصصة في علاج القدم السكري والجروح المزمنة
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {submitted ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#0F4C81] mb-2">تم الحجز بنجاح!</h2>
              <p className="text-gray-600 mb-6">
                تم إرسال طلب الحجز وسنتواصل معك قريباً لتأكيد الموعد
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-3"
                >
                  إرسال إشعار واتساب للطبيب
                </a>
              )}
              <button
                onClick={() => { setSubmitted(false); setWhatsappUrl(""); }}
                className="bg-[#1E88E5] text-white px-6 py-2 rounded-lg hover:bg-[#1565C0] transition-colors"
              >
                حجز موعد جديد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    maxLength={13}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none"
                    placeholder="+970 xxxxxxxx"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع الزيارة</label>
                <div className="relative">
                  <ClipboardList className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    required
                    value={form.visitTypeId}
                    onChange={(e) => setForm({ ...form, visitTypeId: e.target.value, time: "" })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">اختر نوع الزيارة</option>
                    {visitTypes.map((vt) => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Available Time Slots */}
              {form.date && form.visitTypeId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المواعيد المتاحة</label>
                  {loading ? (
                    <p className="text-gray-500 text-center py-4">جاري تحميل المواعيد...</p>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot) => {
                        const endTime = addMinutes(slot.time, slot.duration);
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setForm({ ...form, time: slot.time })}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              form.time === slot.time
                                ? "bg-[#1E88E5] text-white"
                                : "bg-[#F5F7FA] text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {slot.time} - {endTime}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-red-500 text-center py-4">لا توجد مواعيد متاحة في هذا اليوم</p>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">وصف الحالة (اختياري)</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none resize-none"
                  placeholder="اشرح حالتك باختصار..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !form.time}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-lg font-semibold hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "جاري الحجز..." : "تأكيد الحجز"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
