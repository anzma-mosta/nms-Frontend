import { useTranslation } from "react-i18next";
import { Search, Send, Phone, Video, MoreVertical, Paperclip } from "lucide-react";
import { cn } from "../../../utils/cn";

export const StudentMessages = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <div className="h-full flex flex-col glass rounded-[2.5rem] overflow-hidden border-2 shadow-2xl shadow-primary/5">
      <div className="p-6 border-b flex items-center justify-between bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              AI
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="font-black text-foreground">
              {isAr ? "الدعم الفني" : "Technical Support"}
            </h3>
            <p className="text-xs text-emerald-500 font-bold uppercase tracking-tighter">
              {isAr ? "متصل الآن" : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-muted-foreground">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-muted-foreground">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 dark:bg-slate-900/30">
        <div className="flex justify-center">
          <span className="px-4 py-1 rounded-full bg-primary/5 text-[10px] font-black text-primary uppercase tracking-widest">
            {isAr ? "اليوم" : "Today"}
          </span>
        </div>
        {/* Messages placeholder */}
        <div className={cn("flex gap-4 max-w-[80%]", isAr ? "flex-row" : "flex-row")}>
          <div className="w-10 h-10 rounded-2xl bg-primary/10 shrink-0 flex items-center justify-center text-primary font-bold">
            AI
          </div>
          <div className="space-y-2">
            <div className="p-5 rounded-[2rem] rounded-tl-none bg-background border shadow-sm text-sm leading-relaxed">
              {isAr 
                ? "مرحباً بك! كيف يمكنني مساعدتك اليوم في رحلتك التعليمية؟" 
                : "Welcome! How can I help you with your learning journey today?"}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold px-2">10:00 AM</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-background/50 backdrop-blur-md border-t">
        <div className="relative flex items-center gap-4">
          <button className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t("dashboard.type_message")}
              className="w-full h-14 bg-background border-2 border-primary/5 rounded-2xl px-6 focus:outline-none focus:border-primary/20 transition-all font-medium"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl hover:bg-primary/5 transition-colors text-muted-foreground">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <button className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <Send className={cn("w-6 h-6", isAr && "rotate-180")} />
          </button>
        </div>
      </div>
    </div>
  );
};
