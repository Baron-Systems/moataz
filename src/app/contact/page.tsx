"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatSchedule } from "@/lib/schedule";
import { MapPin, Phone, Clock, Send, MessageSquare } from "lucide-react";

interface WorkSchedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scheduleLines, setScheduleLines] = useState<string[]>(["جاري التحميل..."]);

  useEffect(() => {
    fetch("/api/work-schedule")
      .then((r) => r.json())
      .then((data) => setScheduleLines(formatSchedule(data)));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, send to API
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              نحن هنا لمساعدتك. تواصل معنا للاستفسارات أو لحجز موعد
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F5F7FA] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#1E88E5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">العنوان</h3>
                    <p className="text-gray-600 mt-1">
                      الخليل<br />
                      بجانب الغرفة التجارية<br />
                      عمارة الكنز 2<br />
                      الطابق الثاني
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#F5F7FA] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#1E88E5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">الهاتف / واتساب</h3>
                    <a href="tel:+972568507260" className="text-gray-600 mt-1 block hover:text-[#1E88E5]" dir="ltr">
                      +972 56 850 7260
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#F5F7FA] p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-[#1E88E5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">ساعات العمل</h3>
                    <div className="text-gray-600 mt-1 space-y-1">
                      {scheduleLines.map((line, index) => {
                        const colonIndex = line.indexOf(":");
                        const dayLabel = line.slice(0, colonIndex + 1);
                        const timeRange = line.slice(colonIndex + 1);
                        return (
                          <div key={index} className="grid grid-cols-[1fr_auto] gap-2 items-baseline">
                            <span className="text-right">{dayLabel}</span>
                            <span dir="ltr">{timeRange}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/972568507260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mt-4"
                >
                  <MessageSquare className="w-5 h-5" />
                  تواصل عبر واتساب
                </a>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-sm h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.822712585625!2d35.0996!3d31.5325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzU3LjAiTiAzNcKwMDUnNTguNiJF!5e0!3m2!1sar!2s!4v1600000000000!5m2!1sar!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">نموذج التواصل</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none"
                    placeholder="05xxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1E88E5] text-white py-3 rounded-lg font-semibold hover:bg-[#1565C0] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  إرسال
                </button>
                {submitted && (
                  <p className="text-green-600 text-center">تم إرسال رسالتك بنجاح!</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
