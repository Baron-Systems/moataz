"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch {
      setError("حدث خطأ. حاول مرة أخرى.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5">
            <Image src="/images/logo.png" alt="D.F.C Logo" width={80} height={80} className="rounded-2xl object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">بوابة الطبيب</h1>
          <p className="text-slate-500 mt-2">تسجيل الدخول إلى لوحة تحكم مركز D.F.C</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pr-12 pl-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] outline-none transition text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E88E5]/30 focus:border-[#1E88E5] outline-none transition text-sm"
                  placeholder="********"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E88E5] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1565C0] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          © {new Date().getFullYear()} مركز D.F.C — جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
