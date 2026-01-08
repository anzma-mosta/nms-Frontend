import { useState } from "react";
import { Bell, Check, Info, AlertCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";
import { Button } from "../atoms/Button";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning" | "message";
  read: boolean;
}

export const Notifications = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: isAr ? "مرحباً بك في أكاديمية WAKP" : "Welcome to WAKP Academy",
      description: isAr ? "استكشف أحدث الكورسات التعليمية المتاحة الآن." : "Explore the latest educational courses available now.",
      time: "2m ago",
      type: "info",
      read: false,
    },
    {
      id: "2",
      title: isAr ? "تم اكتمال الدفع" : "Payment Successful",
      description: isAr ? "تم تفعيل اشتراكك في كورس البرمجة بنجاح." : "Your subscription to the Programming course is active.",
      time: "1h ago",
      type: "success",
      read: false,
    },
    {
      id: "3",
      title: isAr ? "رسالة جديدة من المدرب" : "New Message from Instructor",
      description: isAr ? "لديك تعليق جديد على الواجب الخاص بك." : "You have a new comment on your assignment.",
      time: "3h ago",
      type: "message",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return <Check className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "message": return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full hover:bg-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-background">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={cn(
                "absolute top-full mt-4 w-80 sm:w-96 bg-card border-2 border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden",
                isAr ? "left-0 origin-top-left" : "right-0 origin-top-right"
              )}
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/30">
                <h3 className="font-black text-lg">{isAr ? "الإشعارات" : "Notifications"}</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {isAr ? "تحديد الكل كمقروء" : "Mark all as read"}
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-xl transition-colors flex gap-3 group relative",
                        notification.read ? "bg-transparent opacity-70" : "bg-primary/5 border border-primary/10"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        notification.read ? "bg-secondary" : "bg-primary/20"
                      )}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-black text-foreground line-clamp-1">{notification.title}</p>
                          <span className="text-[10px] text-muted-foreground font-bold">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {notification.description}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                      <Bell className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground font-bold">
                      {isAr ? "لا توجد إشعارات حالياً" : "No notifications yet"}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-border/50 text-center bg-secondary/10">
                <Button variant="ghost" className="w-full text-xs font-black">
                  {isAr ? "عرض جميع الإشعارات" : "View all notifications"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
