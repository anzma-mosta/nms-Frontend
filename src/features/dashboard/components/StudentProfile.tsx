import React from "react";
import { useTranslation } from "react-i18next";
import { User, Mail, Phone, MapPin, Camera, Save, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { Button } from "../../../components/atoms/Button";

export const StudentProfile = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-[2.5rem] border border-secondary" />
        <div className="absolute -bottom-12 right-12 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] bg-card border-4 border-background flex items-center justify-center text-primary text-4xl font-black shadow-xl overflow-hidden">
              {user?.name?.[0] || "U"}
            </div>
            <button className="absolute bottom-2 left-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <div className="pb-4">
            <h2 className="text-3xl font-black">{user?.name || "اسم المستخدم"}</h2>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm mt-1">
              {user?.role === "parent" ? t("auth.parent") : t("auth.student")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card p-8 rounded-[2rem] border border-secondary space-y-6 shadow-sm">
            <h3 className="text-xl font-black flex items-center gap-2">
              <User className="text-primary" size={24} />
              المعلومات الشخصية
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full bg-secondary/30 border-none rounded-2xl py-3 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full bg-secondary/30 border-none rounded-2xl py-3 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-secondary/30 border-none rounded-2xl py-3 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">العنوان</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="القاهرة، مصر"
                    className="w-full bg-secondary/30 border-none rounded-2xl py-3 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="h-12 rounded-2xl font-black gap-2 px-8">
                <Save size={18} />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-8 rounded-[2rem] border border-secondary space-y-6 shadow-sm">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Lock className="text-primary" size={24} />
              الأمان
            </h3>
            <p className="text-sm text-muted-foreground font-bold">قم بتحديث كلمة المرور الخاصة بك بانتظام للحفاظ على أمان حسابك.</p>
            <Button variant="outline" className="w-full h-12 rounded-2xl font-black border-2">
              تغيير كلمة المرور
            </Button>
          </div>

          <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 space-y-4">
            <h4 className="font-black text-primary">حالة الحساب</h4>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-black">نشط ومفعل</span>
            </div>
            <p className="text-xs font-bold text-muted-foreground">تاريخ الانضمام: يناير 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};
