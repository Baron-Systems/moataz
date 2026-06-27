const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

interface WorkSchedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "م" : "ص";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatSchedule(schedule: WorkSchedule[]): string[] {
  const active = [...schedule]
    .filter((s) => s.isActive)
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  if (active.length === 0) return ["لم يتم تحديد ساعات العمل"];

  const groups: { startIdx: number; endIdx: number; startTime: string; endTime: string }[] = [];
  let current = { startIdx: active[0].dayOfWeek, endIdx: active[0].dayOfWeek, startTime: active[0].startTime, endTime: active[0].endTime };

  for (let i = 1; i < active.length; i++) {
    const s = active[i];
    if (s.dayOfWeek === current.endIdx + 1 && s.startTime === current.startTime && s.endTime === current.endTime) {
      current.endIdx = s.dayOfWeek;
    } else {
      groups.push(current);
      current = { startIdx: s.dayOfWeek, endIdx: s.dayOfWeek, startTime: s.startTime, endTime: s.endTime };
    }
  }
  groups.push(current);

  return groups.map((g) => {
    const dayLabel = g.startIdx === g.endIdx ? days[g.startIdx] : `${days[g.startIdx]} - ${days[g.endIdx]}`;
    return `${dayLabel}: ${formatTime(g.startTime)} - ${formatTime(g.endTime)}`;
  });
}
