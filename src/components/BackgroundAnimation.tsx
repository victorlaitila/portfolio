import Lottie from "lottie-react";
import bgAnimation from "@/assets/bg-animation.json";
import heroBgDark from "@/assets/hero-bg-dark.jpg";

export function BackgroundAnimation({ overlayColor = "bg-black/75" }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBgDark})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Lottie animationData={bgAnimation} loop autoplay className="w-full h-full object-cover" />
      <div className={`absolute inset-0 ${overlayColor}`} />
    </div>
  );
}
