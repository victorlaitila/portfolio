import { Home, User, Code, FolderKanban, Briefcase, Mail } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const logoSrc = `${import.meta.env.BASE_URL}vldev.png`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <a href="#home">
            <img src={logoSrc} width={200} alt="Logo" className="relative top-1 brightness-150" />
          </a>
          
          <div className="flex items-center gap-3 sm:gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-smooth text-sm font-medium flex items-center gap-2"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
