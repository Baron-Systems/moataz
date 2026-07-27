import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { formatSchedule } from "@/lib/schedule";
import { Phone, Calendar, MapPin, ChevronLeft, Heart, Shield, Clock, Award, Stethoscope, Users, ArrowLeft, Star, Footprints, Syringe } from "lucide-react";

const stats = [
  { num: "+10", label: "سنوات خبرة" },
  { num: "+1000", label: "مريض تم علاجه" },
  { num: "98%", label: "نسبة الرضا" },
  { num: "+50", label: "حالة شهرياً" },
];

const features = [
  { icon: Shield, title: "رعاية متخصصة", desc: "أحدث تقنيات العلاج" },
  { icon: Heart, title: "متابعة مستمرة", desc: "لحظة بلحظة" },
  { icon: Clock, title: "مواعيد مرنة", desc: "نناسب جدولك" },
  { icon: Award, title: "خبرة عالية", desc: "سنوات من الخبرة" },
];

const services = [
  { icon: Footprints, title: "علاج القدم السكري", desc: "تشخيص وعلاج شامل" },
  { icon: Heart, title: "علاج تقرحات القدم السكري", desc: "ضمادات متطورة" },
  { icon: Shield, title: "علاج الجروح المزمنة والمعقدة", desc: "أساليب متقدمة" },
  { icon: Stethoscope, title: "علاج قرح الضغط والفراش", desc: "برامج متكاملة" },
  { icon: Syringe, title: "إزالة الأنسجة الميتة", desc: "إزالة الأنسجة الميتة" },
  { icon: Award, title: "الوقاية من البتر ومضاعفات السكري", desc: "حفظ الأطراف" },
];

const testimonials = [
  { name: "عرين محمد", text: "بعد سنوات من التحديات الصحية، التئم الجرح بشكل كامل.", location: "" },
  { name: "إسماعيل جحشن", text: "لمست تحسناً واضحاً وتقدماً ملموساً خلال فترة العلاج.", location: "" },
  { name: "مصعب أبو سنينة", text: "بفضل الخبرة والمتابعة المستمرة تحسنت حالتي بشكل كبير.", location: "" },
];

export default async function Home() {
  const schedule = await prisma.workSchedule.findMany({
    where: { isActive: true },
    orderBy: { dayOfWeek: "asc" },
  });
  const scheduleLines = formatSchedule(schedule);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3a63] via-[#0F4C81] to-[#1565C0]">
        <div className="absolute inset-0 bg-[url('/images/hero-1.png')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3a63]/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 items-center">
            {/* Mobile-only badge */}
            <div className="order-1 flex justify-center lg:hidden">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5">
                <Stethoscope className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100 text-sm">مركز طبي متخصص</span>
              </div>
            </div>

            {/* Image */}
            <div className="order-2 flex justify-center items-center lg:order-2">
              <div className="relative animate-float">
                {/* Subtle glow - no blur */}
                <div className="absolute -inset-3 rounded-full bg-[#1E88E5]/20" />

                {/* Clean circular image with gradient ring */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
                  {/* Gradient ring border */}
                  <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[#1E88E5] via-[#0F4C81] to-[#1E88E5] shadow-xl">
                    {/* Inner white ring */}
                    <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-b from-white/30 to-white/10">
                      {/* Image - sharp, no overflow-hidden issues */}
                      <img
                        src="/images/doctor-circle.png"
                        alt="معتز أبو رميلة - أخصائي القدم السكري"
                        className="w-full h-full rounded-full object-cover object-top"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Top badge */}
                <div className="absolute top-6 -left-8 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-blue-50 flex items-center gap-2 hidden md:flex">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F4C81] text-xs leading-none">أخصائي معتمد</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">القدم السكري</p>
                  </div>
                </div>

                {/* Bottom stats card */}
                <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-xl border border-blue-50 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#0F4C81] text-lg leading-none">+1000</p>
                      <p className="text-xs text-gray-500 mt-0.5">مريض تم علاجه</p>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 hidden md:flex">
                  <span className="w-2 h-2 bg-[#1E88E5] rounded-full opacity-60" />
                  <span className="w-2 h-2 bg-[#1E88E5] rounded-full opacity-40" />
                  <span className="w-2 h-2 bg-[#1E88E5] rounded-full opacity-20" />
                </div>
              </div>
            </div>

            {/* Text block */}
            <div className="order-3 text-center lg:text-right lg:order-1">
              <div className="hidden lg:inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <Stethoscope className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100 text-sm">مركز طبي متخصص</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-relaxed text-white">
                مركز الجروح والقدم السكري
              </h1>
              <p className="text-xl text-blue-200 mb-3">D.F.C</p>
              <p className="text-white/90 mb-6">
                بإشراف أخصائي الجروح <span className="font-bold text-white">معتز أبو رميلة</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/booking" className="bg-white text-[#0F4C81] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-lg">
                  <Calendar className="w-5 h-5" /> احجز موعدك
                </Link>
                <a href="https://wa.me/972568507260" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full">
          <path d="M0,80 L0,40 Q360,0 720,40 T1440,40 L1440,80 Z" fill="white" />
        </svg>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-6 hidden md:block">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-extrabold text-[#0F4C81]">{s.num}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative group max-w-md mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#0F4C81]/10 to-[#1E88E5]/10 rounded-3xl group-hover:scale-105 transition-transform" />
              <Image src="/images/doctor-patient.jpg" alt="مع مريض" width={480} height={320} className="relative rounded-3xl shadow-lg object-cover w-full" />
            </div>
            <div>
              <span className="text-[#1E88E5] font-semibold text-sm">عن المركز</span>
              <h2 className="text-3xl font-extrabold text-[#0F4C81] mt-2 mb-4">رعاية متخصصة لقدمك</h2>
              <p className="text-gray-600 leading-relaxed mb-5">مركز D.F.C متخصص في علاج القدم السكري والجروح المزمنة بأحدث التقنيات العالمية.</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-blue-50 transition">
                    <f.icon className="w-5 h-5 text-[#1E88E5]" />
                    <span className="text-sm font-medium text-gray-700">{f.title}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#0F4C81] font-bold mt-5 hover:text-[#1E88E5] transition">
                تعرف على المزيد <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Specialist */}
      <section className="py-16 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#0F4C81]/5 border border-[#0F4C81]/10 rounded-full px-4 py-1.5 mb-4">
                <Stethoscope className="w-4 h-4 text-[#0F4C81]" />
                <span className="text-[#0F4C81] text-sm font-semibold">خبرة متخصصة في علاج الجروح</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mb-4">
                الأخصائي معتز أبو رميله
              </h2>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                <p>
                  يُعد الأخصائي معتز أبو رميله من أبرز المتخصصين في علاج القدم السكرية والجروح المزمنة في فلسطين، بخبرة مهنية واسعة تمتد لأكثر من عشر سنوات في هذا المجال.
                </p>
                <p>
                  وُلد الأخصائي معتز أبو رميله في مدينة الخليل، وتخرج في جامعة الخليل حاصلًا على درجة البكالوريوس في التمريض. بدأ مسيرته المهنية ممرضًا في مستشفى محمد علي المحتسب، ثم انتقل للعمل ممرض عمليات في مستشفى الأهلي – الخليل، حيث أمضى عشر سنوات اكتسب خلالها خبرة واسعة في الرعاية الجراحية، وإدارة الحالات المعقدة، والتعامل مع مختلف التخصصات الجراحية.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0F4C81]" />
                  <span className="text-sm font-semibold text-[#0F4C81]">+10 سنوات خبرة</span>
                </div>
                <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0F4C81]" />
                  <span className="text-sm font-semibold text-[#0F4C81]">آلاف الحالات المعالجة</span>
                </div>
              </div>
              <Link href="/about-specialist" className="inline-flex items-center gap-2 bg-[#0F4C81] text-white px-6 py-3 rounded-xl font-bold mt-6 hover:bg-[#1565C0] transition shadow-lg">
                اقرأ السيرة المهنية <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            {/* Image Column */}
            <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-[#0F4C81]/10" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[4px] bg-gradient-to-br from-[#0F4C81] via-[#1E88E5] to-[#0F4C81]">
                  <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-b from-white/30 to-white/10">
                    <img
                      src="/cv.png"
                      alt="الأخصائي معتز أبو رميله"
                      className="w-full h-full rounded-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1E88E5] font-semibold text-sm">خدماتنا</span>
            <h2 className="text-3xl font-extrabold text-[#0F4C81] mt-2">خدماتنا المتخصصة</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
              نقدّم في مركز D.F.C لعلاج القدم السكري والجروح المزمنة مجموعة متكاملة من الخدمات الطبية المتخصصة، بدءًا من التقييم الدقيق للحالة ووضع الخطة العلاجية المناسبة، وصولًا إلى المتابعة المستمرة والوقاية من المضاعفات، باستخدام أحدث التقنيات والضمادات الطبية المتطورة.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 hover:border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0F4C81] mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 bg-[#0F4C81] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition shadow-lg">
              عرض جميع الخدمات <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#1E88E5] font-semibold text-sm">شهادات المرضى</span>
            <h2 className="text-3xl font-extrabold text-[#0F4C81] mt-2">قصص نجاح حقيقية</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t pt-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-full flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-[#0F4C81] text-sm">{t.name}</p>
                    {t.location && <p className="text-xs text-gray-400">{t.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials" className="inline-flex items-center gap-1 text-[#1E88E5] font-bold hover:underline">
              المزيد من القصص <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-[#0F4C81] to-[#1E88E5] rounded-3xl p-10 md:p-14 text-white text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">احجز موعدك اليوم</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">نحن هنا لمساعدتك في علاج القدم السكري والجروح المزمنة.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/booking" className="bg-white text-[#0F4C81] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">حجز موعد</Link>
                <a href="https://wa.me/972568507260" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> تواصل عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#0F4C81] mb-4">موقع المركز</h3>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md h-64 md:h-72">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.822712585625!2d35.0996!3d31.5325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzU3LjAiTiAzNcKwMDUnNTguNiJF!5e0!3m2!1sar!2s!4v1600000000000!5m2!1sar!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="grayscale-[20%]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0F4C81] mb-4">معلومات التواصل</h3>
              <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1E88E5] mt-0.5" />
                  <div><p className="font-medium text-sm">العنوان</p><p className="text-gray-500 text-sm">الخليل - بجانب الغرفة التجارية - عمارة الكنز 2 - الطابق الثاني</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1E88E5] mt-0.5" />
                  <div><p className="font-medium text-sm">الهاتف</p><a href="tel:+972568507260" className="text-gray-500 text-sm hover:text-[#1E88E5]" dir="ltr">+972 56 850 7260</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1E88E5] mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">ساعات العمل</p>
                    <div className="space-y-1">
                      {scheduleLines.map((line, index) => {
                        const colonIndex = line.indexOf(":");
                        const dayLabel = line.slice(0, colonIndex + 1);
                        const timeRange = line.slice(colonIndex + 1);
                        return (
                          <div key={index} className="grid grid-cols-[1fr_auto] gap-2 items-baseline text-gray-500 text-sm">
                            <span className="text-right">{dayLabel}</span>
                            <span dir="ltr">{timeRange}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
