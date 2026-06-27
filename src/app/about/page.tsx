import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Shield, Heart, Clock, Award, CheckCircle } from "lucide-react";

export const metadata = {
  title: "عن المركز - D.F.C",
  description: "تعرف على مركز الجروح والقدم السكري التخصصي في الخليل.",
};

const values = [
  { icon: Shield, title: "الجودة", desc: "أعلى معايير الرعاية الصحية" },
  { icon: Heart, title: "الاهتمام", desc: "متابعة شخصية لكل مريض" },
  { icon: Clock, title: "السرعة", desc: "حجوزات سريعة ومواعيد مرنة" },
  { icon: Award, title: "الخبرة", desc: "سنوات من التخصص" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-14 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">عن المركز</h1>
            <p className="text-blue-100 mt-2">D.F.C — رعاية متخصصة لقدمك</p>
          </div>
        </div>

        {/* Story */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#0F4C81]/10 to-[#1E88E5]/10 rounded-3xl" />
                <Image src="/images/doctor-new.jpeg" alt="معتز أبو رميلة" width={500} height={400} className="relative rounded-3xl shadow-xl object-cover w-full group-hover:scale-[1.01] transition" />
              </div>
              <div>
                <span className="text-[#1E88E5] font-semibold text-sm">قصتنا</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mt-2 mb-4">
                  مركز متخصص في علاج القدم السكري
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  مركز D.F.C تأسس بهدف تقديم رعاية طبية متخصصة لمرضى القدم السكري والجروح المزمنة في الخليل.
                  نعتمد أحدث البروتوكولات العلاجية العالمية والضمادات المتطورة.
                </p>
                <div className="space-y-2">
                  {["أخصائي معتمد في القدم السكري", "أحدث التقنيات والضمادات", "خطط علاجية مخصصة", "برامج وقاية متكاملة"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81]">قيمنا</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <v.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0F4C81] text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-[#1E88E5] font-semibold text-sm">الأخصائي</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mt-2 mb-4">
                  معتز أبو رميلة
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  أخصائي الجروح والقدم السكري، يتمتع بخبرة واسعة في تشخيص وعلاج قرح القدم السكري والجروح المزمنة.
                </p>
                <div className="space-y-2">
                  {["خبرة +10 سنوات", "شهادات متخصصة", "متابعة دقيقة لكل حالة", "تواصل ممتاز مع المرضى"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#1E88E5]/10 to-[#0F4C81]/10 rounded-3xl" />
                <Image src="/images/doctor-meeting.jpg" alt="معتز أبو رميلة" width={500} height={400} className="relative rounded-3xl shadow-xl object-cover w-full group-hover:scale-[1.01] transition" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
