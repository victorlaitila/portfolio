import { Briefcase, Code, FolderKanban, GraduationCap, Home, Mail, User, type LucideIcon } from "lucide-react";
import { SECTION_IDS, type SectionId } from "@/config/site";
import { getCareerData } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const NAV_LINKS: Array<{ id: SectionId; label: string; icon: LucideIcon }> = [
  { id: SECTION_IDS.home, label: "Home", icon: Home },
  { id: SECTION_IDS.about, label: "About", icon: User },
  { id: SECTION_IDS.skills, label: "Skills", icon: Code },
  { id: SECTION_IDS.projects, label: "Projects", icon: FolderKanban },
  { id: SECTION_IDS.experience, label: "Experience", icon: Briefcase },
  { id: SECTION_IDS.education, label: "Education", icon: GraduationCap },
  { id: SECTION_IDS.contact, label: "Contact", icon: Mail },
];

const NAV_IDS = NAV_LINKS.map((link) => link.id);

export function Navigation() {
  const { personal } = getCareerData();
  const [activeSection, setActiveSection] = useActiveSection(NAV_IDS);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <a href={`#${SECTION_IDS.home}`}>
            <img
              src={`${import.meta.env.BASE_URL}vl-logo.webp`}
              alt={`${personal.name} logo`}
              width={432}
              height={288}
              className="h-20 md:h-24 w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-4 sm:gap-6 mr-2">
            {NAV_LINKS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "font-display transition-smooth text-xs font-medium flex items-center gap-2",
                  activeSection === id ? "text-foreground" : "text-muted-foreground",
                )}
                aria-label={label}
              >
                <Icon className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
