import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Heart, Bandage, Shield, Stethoscope, Activity, UserCheck, Syringe, Footprints,
  ArrowLeft, Thermometer, Droplets, Zap, Watch, Gauge, Package
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "خدماتنا - D.F.C",
  description: "اكتشف خدماتنا المتخصصة في علاج القدم السكري والجروح المزمنة.",
};

const services = [
  { icon: Footprints, title: "علاج القدم السكري", desc: "تشخيص وعلاج مشكلات القدم الناتجة عن مرض السكري، بما يشمل التقرحات، والالتهابات، وضعف الإحساس والدورة الدموية، بهدف منع المضاعفات والحفاظ على الأطراف." },
  { icon: Heart, title: "علاج تقرحات القدم السكري", desc: "تقديم عناية متخصصة لتقرحات القدم السكري باستخدام الضمادات الحديثة، وتنظيف الجروح، وتخفيف الضغط عن المنطقة المصابة، مع متابعة دورية حتى التئام الجرح." },
  { icon: Activity, title: "علاج الجروح المزمنة والمعقدة", desc: "علاج الجروح التي تستمر لفترات طويلة أو لا تستجيب للعلاجات التقليدية، من خلال تقييم أسباب تأخر الالتئام ووضع خطة علاجية متكاملة لكل حالة." },
  { icon: Thermometer, title: "علاج الجروح المعدية", desc: "تشخيص وعلاج الجروح المصابة بالعدوى، وتنظيفها والعناية بها، مع متابعة علامات الالتهاب والحد من انتشار العدوى إلى الأنسجة المحيطة." },
  { icon: Shield, title: "علاج قرح الضغط والفراش", desc: "برامج علاجية متكاملة لقرح الضغط الناتجة عن الجلوس أو الاستلقاء لفترات طويلة، تشمل العناية بالجرح، وتخفيف الضغط، والمتابعة المستمرة." },
  { icon: Droplets, title: "علاج الغرغرينا", desc: "تقييم وعلاج حالات الغرغرينا الناتجة عن ضعف التروية الدموية أو السكري، مع العمل على الحد من انتشارها والمحافظة على الأنسجة السليمة قدر الإمكان." },
  { icon: Zap, title: "علاج قرح الركود الوريدي", desc: "علاج القرح الناتجة عن ضعف عودة الدم عبر الأوردة، من خلال العناية المتخصصة بالجروح واستخدام الوسائل المناسبة لتحسين الدورة الدموية." },
  { icon: Gauge, title: "علاج أمراض الشرايين الطرفية", desc: "تقييم الحالات المرتبطة بضعف تدفق الدم إلى القدمين والساقين، والتنسيق مع الأطباء والمستشفيات المختصة عند الحاجة لضمان رعاية متكاملة." },
  { icon: Stethoscope, title: "علاج جروح الحوادث والحروق", desc: "العناية بالجروح الناتجة عن الحوادث والإصابات والحروق، مع تنظيف الجرح، وتقليل خطر العدوى، واستخدام الضمادات المناسبة لتسريع الالتئام." },
  { icon: Syringe, title: "إزالة الأنسجة الميتة", desc: "إزالة الأنسجة التالفة أو الميتة من الجرح بطريقة طبية متخصصة، للمساعدة على تقليل العدوى وتحفيز نمو الأنسجة السليمة وتسريع عملية الشفاء." },
  { icon: Bandage, title: "الضمادات الطبية المتخصصة والعناية بالجروح", desc: "اختيار واستخدام الضمادات الحديثة المناسبة لنوع الجرح ودرجة الإفرازات وحالة الأنسجة، بما يساعد على توفير بيئة مناسبة لالتئام الجروح." },
  { icon: UserCheck, title: "الوقاية من البتر ومضاعفات السكري", desc: "برامج متخصصة للكشف المبكر عن عوامل الخطورة، وعلاج التقرحات والالتهابات قبل تطورها، بهدف تقليل احتمالية البتر والحفاظ على سلامة القدم." },
];

const footCareItems = [
  "الضمادات الطبية",
  "الجوارب الطبية المناسبة لمرضى السكري",
  "الأحذية الطبية",
  "وسائل تخفيف الضغط عن مناطق الجروح",
  "إرشادات العناية اليومية بالقدم",
  "الفحص الدوري للقدم واكتشاف المشكلات مبكرًا",
];

const deviceItems = [
  "أجهزة فحص السكر المنزلية",
  "مستلزمات وأشرطة فحص السكر",
  "أجهزة المراقبة المستمرة للسكر CGM – Sensor",
  "إرشادات استخدام أجهزة القياس والمتابعة",
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-14 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">خدماتنا المتخصصة</h1>
            <p className="text-blue-100 mt-2 max-w-2xl mx-auto">نقدّم في مركز D.F.C لعلاج القدم السكري والجروح المزمنة مجموعة متكاملة من الخدمات الطبية المتخصصة، بدءًا من التقييم الدقيق للحالة ووضع الخطة العلاجية المناسبة، وصولًا إلى المتابعة المستمرة والوقاية من المضاعفات، باستخدام أحدث التقنيات والضمادات الطبية المتطورة.</p>
          </div>
        </div>

        {/* Main Services */}
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

        {/* Foot Care Section */}
        <section className="py-14 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-[#1E88E5] font-semibold text-sm">العناية والوقاية</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mt-2">العناية والوقاية للقدم السكري</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                نوفّر مجموعة من المنتجات والحلول المساعدة على حماية القدم وتقليل الضغط والاحتكاك والوقاية من التقرحات.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {footCareItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-100 hover:shadow-md transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring Devices Section */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-[#1E88E5] font-semibold text-sm">الأجهزة والمستلزمات</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mt-2">أجهزة قياس ومراقبة السكر</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                نوفر حلولًا تساعد المرضى على متابعة مستوى السكر والتحكم به بصورة أفضل.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {deviceItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-100 hover:shadow-md transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Watch className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Surgery Photo / CTA */}
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
