import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Main Ring */}
          <motion.div
            className="w-20 h-20 border-4 border-primary/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          {/* Spinning Ring */}
          <motion.div
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Pulsing Center */}
          <motion.div
            className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-4 h-4 bg-primary rounded-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xl font-bold tracking-tight text-foreground">
            Loading...
          </span>
          <div className="h-1 w-32 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{
                x: [-128, 128],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
