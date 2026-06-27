import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Heart, Bandage, Shield, Stethoscope, Activity, UserCheck, Syringe, Footprints, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "خدماتنا - D.F.C",
  description: "اكتشف خدماتنا المتخصصة في علاج القدم السكري والجروح المزمنة.",
};

const services = [
  { icon: Footprints, title: "علاج القدم السكري", desc: "تشخيص وعلاج شامل لجميع مشاكل القدم السكري باستخدام أحدث التقنيات والبروتوكولات العلاجية المعتمدة." },
  { icon: Heart, title: "علاج قرح القدم السكري", desc: "علاج متخصص لقرح القدم الناتجة عن السكري باستخدام الضمادات المتطورة والمواد العلاجية المناسبة." },
  { icon: Activity, title: "علاج الجروح المزمنة والمعقدة", desc: "علاج الجروح التي تستمر لأكثر من 6 أسابيع باستخدام أساليب متقدمة لتسريع التئام الجروح." },
  { icon: Shield, title: "علاج قرح الفراش", desc: "برامج علاجية متكاملة لقرح الضغط مع متابعة مستمرة وتقييم دوري للحالة." },
  { icon: Bandage, title: "تغيير الضمادات الطبية المتخصصة", desc: "استخدام ضمادات حديثة ومتخصصة تناسب كل نوع من الجروح ومرحلة التئامها." },
  { icon: Syringe, title: "إزالة الأنسجة الميتة (Debridement)", desc: "إجراء طبي متخصص لإزالة الأنسجة الميتة والتالفة لتسريع عملية الشفاء وتقليل خطر العدوى." },
  { icon: Stethoscope, title: "علاج التهابات القدم والجروح", desc: "تشخيص وعلاج الالتهابات البكتيرية والفطرية المصاحبة للجروح والقدم السكري." },
  { icon: UserCheck, title: "الوقاية من مضاعفات السكري والبتر", desc: "برامج وقاية شاملة للحفاظ على الأطراف وتقليل خطر البتر من خلال التثقيف والمتابعة الدورية." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-14 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">خدماتنا المتخصصة</h1>
            <p className="text-blue-100 mt-2 max-w-2xl mx-auto">نقدم مجموعة شاملة من الخدمات الطبية المتخصصة</p>
          </div>
        </div>

        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-5">
              {services.map((s, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 hover:border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                      <s.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F4C81] mb-2">{s.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Surgery Photo */}
        <section className="py-14 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#0F4C81]/10 to-[#1E88E5]/10 rounded-3xl" />
                <Image src="/images/surgery.jpg" alt="عملية جراحية" width={480} height={845} className="relative rounded-3xl shadow-lg object-contain w-full h-[380px] group-hover:scale-[1.01] transition" />
              </div>
              <div>
                <span className="text-[#1E88E5] font-semibold text-sm">تقنيات متطورة</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mt-2 mb-4">
                  أحدث التقنيات في علاج الجروح
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  نستخدم أحدث التقنيات العالمية في تشخيص وعلاج الجروح المزمنة، بما في ذلك الضمادات الحيوية والتقنيات التجددية.
                </p>
                <Link href="/booking" className="inline-flex items-center gap-2 bg-[#0F4C81] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition shadow-lg">
                  احجز موعدك الآن <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
