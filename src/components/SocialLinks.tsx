import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { getCareerData } from "@/data";
import { cn } from "@/lib/utils";

interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external: boolean;
}

function getSocialLinks(): SocialLink[] {
  const { personal } = getCareerData();
  const links: SocialLink[] = [];
  if (personal.links.github) {
    links.push({ label: "GitHub", href: personal.links.github, icon: TbBrandGithub, external: true });
  }
  if (personal.links.linkedin) {
    links.push({ label: "LinkedIn", href: personal.links.linkedin, icon: TbBrandLinkedin, external: true });
  }
  links.push({ label: "Email", href: `mailto:${personal.email}`, icon: Mail, external: false });
  return links;
}

/** Icon buttons for GitHub, LinkedIn and email, from career.yaml. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {getSocialLinks().map(({ label, href, icon: Icon, external }) => (
        <Button key={label} variant="ghost" size="icon" asChild>
          <a
            href={href}
            aria-label={label}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}
