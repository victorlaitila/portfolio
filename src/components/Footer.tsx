import { getCareerData } from "@/data";
import backgroundImg from "@/assets/background-general.webp";
import { SectionBackground } from "./SectionBackground";

export function Footer() {
  const { personal } = getCareerData();

  return (
    <footer className="py-8 border-t border-border relative z-10 overflow-hidden">
      <SectionBackground src={backgroundImg} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            © {new Date().getFullYear()} {personal.name}
          </p>
          <p className="text-xs mt-2">Designed & Developed with passion</p>
        </div>
      </div>
    </footer>
  );
}
