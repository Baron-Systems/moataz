import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Award, Users, Stethoscope } from "lucide-react";

export const metadata = {
  title: "عن الأخصائي - D.F.C",
  description: "تعرف على الأخصائي معتز أبو رميله، أخصائي علاج القدم السكري والجروح المزمنة.",
};

const highlights = [
  "بكالوريوس في التمريض من جامعة الخليل.",
  "خبرة واسعة في تمريض العمليات والرعاية الجراحية.",
  "متخصص في علاج القدم السكرية والجروح المزمنة.",
  "تدريبات متقدمة في تركيا والصين.",
  "خبرة في العلاج بالضغط السلبي للجروح NPWT.",
  "مساهمة في علاج آلاف المرضى والوقاية من البتر.",
  "تعاون مهني مع المستشفيات والأطباء والمؤسسات الصحية.",
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1bQsMUQqGu" },
  { label: "Facebook", href: "https://www.facebook.com/share/19Pmzbt9sD" },
  { label: "Instagram", href: "https://www.instagram.com/wound_care_mutaz_abu_rmaleh?igsh=emw1Y3gwcGhpaDk3" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function AboutSpecialistPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-12 text-center">
          <div className="max-w-[1150px] mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">عن الأخصائي</h1>
            <p className="text-blue-100 mt-2 text-sm md:text-base">تعرف على خلفية الأخصائي ومسيرته المهنية</p>
          </div>
        </div>

        {/* Intro */}
        <section className="py-12 bg-white">
          <div className="max-w-[1150px] mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Image */}
              <div className="flex flex-col items-center gap-5">
                <div className="w-60 h-60 md:w-72 md:h-72 rounded-full shadow-xl ring-4 ring-[#0F4C81]/10 overflow-hidden bg-white">
                  <img
                    src="/cv.png"
                    alt="الأخصائي معتز أبو رميله"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="bg-[#F4F8FB] rounded-2xl px-5 py-3 flex items-center gap-3 transition hover:shadow-sm">
                    <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#0F4C81]" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#0F4C81] text-sm leading-none">+10</p>
                      <p className="text-xs text-gray-500 mt-0.5">سنوات خبرة</p>
                    </div>
                  </div>
                  <div className="bg-[#F4F8FB] rounded-2xl px-5 py-3 flex items-center gap-3 transition hover:shadow-sm">
                    <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#0F4C81]" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#0F4C81] text-sm leading-none">آلاف</p>
                      <p className="text-xs text-gray-500 mt-0.5">الحالات المعالجة</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-[#0F4C81]/5 border border-[#0F4C81]/10 rounded-full px-4 py-1.5 mb-4">
                  <Stethoscope className="w-4 h-4 text-[#0F4C81]" />
                  <span className="text-[#0F4C81] text-sm font-semibold">خبرة متخصصة في علاج الجروح</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] mb-2">
                  الأخصائي معتز أبو رميله
                </h2>
                <p className="text-[#1E88E5] font-semibold text-sm mb-5">
                  أخصائي علاج القدم السكري والجروح المزمنة
                </p>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    يُعد الأخصائي معتز أبو رميله من أبرز المتخصصين في علاج القدم السكرية والجروح المزمنة في فلسطين، بخبرة مهنية واسعة تمتد لأكثر من عشر سنوات في هذا المجال.
                  </p>
                  <p>
                    وُلد الأخصائي معتز أبو رميله في مدينة الخليل، وتخرج في جامعة الخليل حاصلًا على درجة البكالوريوس في التمريض. بدأ مسيرته المهنية ممرضًا في مستشفى محمد علي المحتسب، ثم انتقل للعمل ممرض عمليات في مستشفى الأهلي – الخليل، حيث أمضى عشر سنوات اكتسب خلالها خبرة واسعة في الرعاية الجراحية، وإدارة الحالات المعقدة، والتعامل مع مختلف التخصصات الجراحية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="py-12 bg-[#F4F8FB]">
          <div className="max-w-[1150px] mx-auto px-4 space-y-10">
            <div>
              <h3 className="text-lg font-bold text-[#0F4C81] mb-4">المسيرة المهنية</h3>
              <p className="text-gray-600 leading-relaxed">
                شكّلت هذه الخبرة قاعدة علمية وعملية متينة دفعته إلى التخصص الكامل في علاج القدم السكرية والجروح المزمنة، كما تلقى تدريبات متقدمة في تركيا والصين على أحدث تقنيات العناية بالجروح والمحافظة على الأطراف.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F4C81] mb-4">التخصص والتدريب</h3>
              <p className="text-gray-600 leading-relaxed">
                ويُعد من أوائل الممرضين المتخصصين في فلسطين الذين ركزوا بصورة كاملة على علاج القدم السكرية والجروح المزمنة، وكان له دور ريادي في نشر مفهوم العلاج المتقدم للجروح باستخدام تقنية العلاج بالضغط السلبي NPWT، والمساهمة في إدخال هذه التقنية وتوفيرها للمؤسسات الصحية والمرضى في فلسطين.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F4C81] mb-4">الإنجازات المهنية</h3>
              <p className="text-gray-600 leading-relaxed">
                وخلال مسيرته المهنية، ساهم في علاج آلاف المرضى وإنقاذ العديد من الحالات المهددة بالبتر، من خلال تطبيق أحدث البروتوكولات العلاجية، واستخدام التقنيات الطبية المتطورة، والتعاون مع شبكة واسعة من المستشفيات والأطباء والمتخصصين.
              </p>
            </div>
          </div>
        </section>

        {/* Training & International Participation */}
        <section className="py-12 bg-white">
          <div className="max-w-[1150px] mx-auto px-4">
            <h3 className="text-lg font-bold text-[#0F4C81] mb-4">التدريب والمشاركات الدولية</h3>
            <p className="text-gray-600 leading-relaxed mb-10">
              يؤمن الأخصائي معتز أبو رميله بأن تبادل المعرفة والخبرة هو أساس تطوير الرعاية الصحية. لذلك يشارك في برامج تدريبية ومؤتمرات ومعارض طبية متخصصة، كما يقدّم تدريبات للطواقم الطبية في مجال علاج الجروح والقدم السكرية، تجمع بين المعرفة العلمية والتطبيق العملي وفق أحدث الممارسات والمعايير العالمية، بهدف تعزيز الكفاءات المهنية والارتقاء بجودة الرعاية المقدمة للمرضى.
            </p>
            <div className="space-y-10">
              {/* Card 1: image left, text right */}
              <div className="grid lg:grid-cols-2 gap-0 items-center bg-[#F4F8FB] rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[16/10] w-full">
                  <img src="/images/gallery-1.png" alt="معرض Arab Health – دبي" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 lg:p-8">
                  <span className="inline-block bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-semibold rounded-full px-3 py-1 mb-3">دبي، الإمارات</span>
                  <h4 className="text-xl font-bold text-[#0F4C81] mb-3">المشاركة في معرض Arab Health – دبي</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">مشاركة مهنية في معرض Arab Health – Dubai مع شريكنا العالمي Confort، الذي نفخر بتمثيله بصفته شريكًا ووكيلًا معتمدًا في فلسطين، للاطلاع على أحدث التقنيات والحلول المتخصصة في علاج الجروح والرعاية الطبية.</p>
                </div>
              </div>

              {/* Card 2: text left, image right */}
              <div className="grid lg:grid-cols-2 gap-0 items-center bg-[#F4F8FB] rounded-2xl overflow-hidden shadow-sm">
                <div className="order-2 lg:order-1 p-6 lg:p-8">
                  <span className="inline-block bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-semibold rounded-full px-3 py-1 mb-3">الصين</span>
                  <h4 className="text-xl font-bold text-[#0F4C81] mb-3">المشاركة في مؤتمر طبي للسكري – الصين</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">المشاركة في مؤتمر طبي متخصص بمرض السكري في الصين، للاطلاع على أحدث المستجدات العلمية والتقنيات الحديثة في مراقبة السكري وعلاج مضاعفاته والعناية بالقدم السكرية.</p>
                </div>
                <div className="order-1 lg:order-2 aspect-[16/10] w-full">
                  <img src="/images/gallery-3.png" alt="مؤتمر طبي للسكري – الصين" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Card 3: image left, text right */}
              <div className="grid lg:grid-cols-2 gap-0 items-center bg-[#F4F8FB] rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full">
                  <img src="/images/gallery-2.png" alt="تدريب مع شركة Microtech – الأردن" className="w-full h-auto object-contain" />
                </div>
                <div className="p-6 lg:p-8">
                  <span className="inline-block bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-semibold rounded-full px-3 py-1 mb-3">عمّان، الأردن</span>
                  <h4 className="text-xl font-bold text-[#0F4C81] mb-3">التدريب مع شركة Microtech – الأردن</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">المشاركة في برنامج تدريبي متخصص مع شركة Microtech في الأردن حول أجهزة مراقبة السكري، والمضخات، وأحدث الحلول التقنية المستخدمة في متابعة مستويات السكر.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12 bg-white">
          <div className="max-w-[1150px] mx-auto px-4">
            <h3 className="text-lg font-bold text-[#0F4C81] mb-5">نقاط الخبرة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#F4F8FB] rounded-2xl p-4 transition hover:shadow-md hover:-translate-y-0.5">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="py-10 bg-[#F4F8FB]">
          <div className="max-w-[1150px] mx-auto px-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-[#0F4C81] mb-1">تواصل مع الأخصائي</h3>
                <p className="text-sm text-gray-500">تابعنا على منصات التواصل الاجتماعي</p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#F4F8FB] rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#0F4C81] hover:text-white transition shadow-sm"
                  >
                    {s.label === "Facebook" ? (
                      <FacebookIcon className="w-5 h-5" />
                    ) : (
                      <InstagramIcon className="w-5 h-5" />
                    )}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
