import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TreatmentResults from "@/components/TreatmentResults";
import PatientVideos from "@/components/PatientVideos";
import { prisma } from "@/lib/prisma";
import { Quote } from "lucide-react";

export const metadata = {
  title: "قصص النجاح - مركز الجروح والقدم السكري D.F.C",
  description: "اقرأ قصص نجاح مرضانا في علاج القدم السكري والجروح المزمنة في مركز D.F.C بالخليل.",
};

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { publishedAt: "desc" },
  });
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">قصص نجاح المرضى</h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
              تجارب حقيقية من مرضى شاركونا رحلتهم العلاجية ونتائجهم المبهرة
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t: { id: number; name: string; text: string; publishedAt: Date }) => (
              <div
                key={t.id}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Quote className="w-8 h-8 text-[#1E88E5] mb-3 opacity-50" />
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="flex items-center gap-3 border-t pt-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#0F4C81] font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F4C81] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.publishedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TreatmentResults />
        <PatientVideos />
      </main>
      <Footer />
    </div>
  );
}
