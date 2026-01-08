export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          {/* Main Ring */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          {/* Pulsing Center */}
          <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Loading...
          </span>
          <div className="h-1 w-32 bg-primary/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-primary w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
