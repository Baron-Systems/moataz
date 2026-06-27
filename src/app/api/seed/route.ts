import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Seed visit types
    const visitTypes = [
      { name: "استشارة وتقييم حالة", slotCount: 1, minDuration: 30, maxDuration: 30, restMinutes: 0, isActive: true },
      { name: "زيارة أولى", slotCount: 2, minDuration: 60, maxDuration: 60, restMinutes: 0, isActive: true },
      { name: "مراجعة ومتابعة", slotCount: 1, minDuration: 30, maxDuration: 30, restMinutes: 0, isActive: true },
      { name: "تغيير ضماد", slotCount: 1, minDuration: 30, maxDuration: 30, restMinutes: 0, isActive: true },
      { name: "تنظيف جرح", slotCount: 1, minDuration: 30, maxDuration: 30, restMinutes: 0, isActive: true },
      { name: "علاج قدم سكري", slotCount: 1, minDuration: 30, maxDuration: 30, restMinutes: 0, isActive: true },
      { name: "علاج قرحة قدم سكري", slotCount: 2, minDuration: 60, maxDuration: 60, restMinutes: 0, isActive: true },
      { name: "علاج قرحة فراش", slotCount: 2, minDuration: 60, maxDuration: 60, restMinutes: 0, isActive: true },
    ];

    for (const vt of visitTypes) {
      const existing = await prisma.visitType.findFirst({ where: { name: vt.name } });
      if (!existing) {
        await prisma.visitType.create({ data: vt });
      }
    }

    // Seed work schedule
    const workDays = [
      { dayOfWeek: 0, startTime: "09:00", endTime: "17:00", isActive: true },
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isActive: true },
      { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isActive: true },
      { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isActive: true },
      { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
      { dayOfWeek: 5, startTime: "09:00", endTime: "14:00", isActive: true },
    ];

    for (const ws of workDays) {
      const existing = await prisma.workSchedule.findFirst({ where: { dayOfWeek: ws.dayOfWeek } });
      if (!existing) {
        await prisma.workSchedule.create({ data: ws });
      }
    }

    // Seed testimonials
    const testimonials = [
      { name: "عرين محمد", text: "بدأت رحلتي الصحية عام 2018 بعد إصابتي بالتهاب فيروسي أثر على النخاع الشوكي وأدى إلى فقدان القدرة على الحركة والاعتماد على الكرسي المتحرك. وبعد سنوات من التحديات الصحية، عانيت من قرحة فراش عميقة استمرت لأشهر طويلة دون تحسن يُذكر. راجعت أخصائي الجروح والقدم السكري معتز أبو إرميلة. وخلال الزيارة الأولى تم تقييم الحالة ووضع خطة علاجية واضحة. وبفضل الله ثم بفضل الخبرة والمتابعة المستمرة، التئم الجرح بشكل كامل.", publishedAt: new Date("2024-01-15") },
      { name: "إسماعيل جحشن", text: "أتقدم بخالص الشكر والتقدير لمركز الجروح والقدم السكري D.F.C وللأخصائي معتز أبو إرميلة على الرعاية والاهتمام والمتابعة المستمرة. خضعت لجلسات علاج متخصصة لعلاج تقرحات القدم، ولمست تحسناً واضحاً وتقدماً ملموساً خلال فترة العلاج. تميزت الخطة العلاجية بالمتابعة الدقيقة واستخدام الأساليب المناسبة للحالة.", publishedAt: new Date("2024-02-20") },
      { name: "أم غالب النشناشة", text: "كل الشكر والتقدير لمركز الجروح والقدم السكري D.F.C على حسن الاستقبال والاهتمام والرعاية المقدمة للمرضى. نتمنى لكم المزيد من النجاح والتوفيق.", publishedAt: new Date("2024-03-10") },
      { name: "أم محمود عبيدة", text: "مركز متميز في التعامل مع المرضى بكل احترام واهتمام. نشكر الأخصائي معتز أبو إرميلة وفريق العمل على أخلاقهم العالية وحرصهم الدائم على راحة المرضى.", publishedAt: new Date("2024-04-05") },
      { name: "مصعب أبو سنينة", text: "بعد سنوات من المعاناة، تابعت حالتي لدى الأخصائي معتز أبو إرميلة. بفضل الله ثم بفضل الخبرة والمتابعة المستمرة تحسنت حالتي بشكل كبير. أشكر المركز على الرعاية والاهتمام والمتابعة الدائمة.", publishedAt: new Date("2024-05-12") },
    ];

    for (const t of testimonials) {
      const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
      if (!existing) {
        await prisma.testimonial.create({ data: t });
      }
    }

    return NextResponse.json({ success: true, message: "Seed completed" });
  } catch (error) {
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
