import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        <div className="bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">قصص نجاح المرضى</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              تجارب حقيقية من مرضى شاركونا رحلتهم العلاجية ونتائجهم المبهرة
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t: { id: number; name: string; text: string; publishedAt: Date }) => (
              <div
                key={t.id}
                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm"
              >
                <Quote className="w-10 h-10 text-[#1E88E5] mb-4 opacity-50" />
                <p className="text-gray-700 leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#0F4C81] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F4C81]">{t.name}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(t.publishedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
