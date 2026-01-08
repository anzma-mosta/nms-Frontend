import React from "react";
import { useTranslation } from "react-i18next";
import { MessageSquare, Search, Send, Phone, Video, MoreVertical, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const contacts = [
  { id: 1, name: "د. محمد شاكر", role: "معلم ويب", avatar: "M", status: "online", lastMsg: "هل لديك أي سؤال بخصوص درس الأمس؟" },
  { id: 2, name: "أ. ليلى حسن", role: "معلمة تصميم", avatar: "L", status: "offline", lastMsg: "تم استلام الواجب بنجاح." },
  { id: 3, name: "فريق الدعم الفني", role: "دعم", avatar: "S", status: "online", lastMsg: "كيف يمكننا مساعدتك اليوم؟" },
];

export const StudentMessages = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-card rounded-[2rem] border border-secondary overflow-hidden shadow-sm">
      {/* Sidebar - Contacts */}
      <div className="w-80 border-l border-secondary flex flex-col hidden md:flex">
        <div className="p-6 border-b border-secondary space-y-4">
          <h2 className="text-xl font-black">{t("dashboard.sidebar.messages")}</h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="بحث في الرسائل..."
              className="w-full bg-secondary/50 border-none rounded-xl py-2.5 pr-10 pl-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className="w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors border-b border-secondary/50 text-right"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black border-2 border-primary/10">
                  {contact.avatar}
                </div>
                {contact.status === "online" && (
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-black truncate">{contact.name}</h4>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{contact.role}</span>
                </div>
                <p className="text-xs text-muted-foreground font-bold truncate">{contact.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-secondary/10">
        {/* Chat Header */}
        <div className="p-4 bg-card border-b border-secondary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
              M
            </div>
            <div>
              <h4 className="font-black text-sm">د. محمد شاكر</h4>
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">متصل الآن</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
              <Video size={20} />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col items-center mb-8">
            <div className="px-4 py-1.5 bg-secondary/50 rounded-full text-[10px] font-black text-muted-foreground uppercase tracking-wider">
              اليوم
            </div>
          </div>
          
          <div className="flex justify-start max-w-[80%]">
            <div className="bg-card p-4 rounded-2xl rounded-tr-none border border-secondary shadow-sm">
              <p className="text-sm font-bold leading-relaxed">أهلاً بك يا بطل! لقد راجعت الكود الخاص بك في الواجب الأخير، كان ممتازاً جداً. فقط حاول التركيز أكثر على الـ Responsive Design.</p>
              <span className="text-[10px] font-bold text-muted-foreground mt-2 block">10:30 ص</span>
            </div>
          </div>

          <div className="flex justify-end max-w-[80%] mr-auto">
            <div className="bg-primary p-4 rounded-2xl rounded-tl-none text-white shadow-lg shadow-primary/20">
              <p className="text-sm font-bold leading-relaxed">شكراً جزيلاً لك يا دكتور! سأقوم بتعديل الجزء الخاص بالـ Responsive فوراً وإعادة رفعه.</p>
              <span className="text-[10px] font-bold opacity-70 mt-2 block text-left">10:32 ص</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-card border-t border-secondary">
          <form className="flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
            <button type="button" className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
              <Paperclip size={22} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-secondary/50 border-none rounded-2xl py-3 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button type="submit" className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Send size={20} className="mr-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
