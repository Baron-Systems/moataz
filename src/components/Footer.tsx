"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { formatSchedule } from "@/lib/schedule";

interface WorkSchedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export default function Footer() {
  const [scheduleLines, setScheduleLines] = useState<string[]>(["جاري التحميل..."]);

  useEffect(() => {
    fetch("/api/work-schedule")
      .then((r) => r.json())
      .then((data: WorkSchedule[]) => setScheduleLines(formatSchedule(data)));
  }, []);

  return (
    <footer className="bg-[#0F4C81] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">D.F.C</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              مركز الجروح والقدم السكري التخصصي - بإشراف أخصائي الجروح والقدم السكري معتز أبو رميلة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">عن المركز</Link></li>
              <li><Link href="/services" className="hover:text-white">خدماتنا</Link></li>
              <li><Link href="/testimonials" className="hover:text-white">قصص النجاح</Link></li>
              <li><Link href="/booking" className="hover:text-white">حجز موعد</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">معلومات التواصل</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                الخليل - بجانب الغرفة التجارية - عمارة الكنز 2 - الطابق الثاني
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+972568507260" className="hover:text-white" dir="ltr">+972 56 850 7260</a>
              </li>
              {scheduleLines.map((line, index) => {
                const colonIndex = line.indexOf(":");
                const dayLabel = line.slice(0, colonIndex + 1);
                const timeRange = line.slice(colonIndex + 1);
                return (
                  <li key={index} className="flex items-start gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline flex-1">
                      <span className="text-right">{dayLabel}</span>
                      <span dir="ltr">{timeRange}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} مركز الجروح والقدم السكري D.F.C - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
