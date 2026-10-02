import { ExternalLink, Github, Youtube } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import type { Project } from "@/data/types";
import backgroundImg from "@/assets/background-projects.webp";
import { GlowCard } from "./GlowCard";
import { Section } from "./Section";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

const PROJECT_LINKS = [
  { field: "demo", label: "Demo", icon: ExternalLink, iconClassName: "h-4 w-4" },
  { field: "url", label: "GitHub", icon: Github, iconClassName: "h-4 w-4" },
  { field: "video", label: "Video", icon: Youtube, iconClassName: "h-6 w-4" },
] as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <GlowCard>
      <a href={project.demo ?? project.video ?? project.url ?? undefined} {...EXTERNAL}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {project.badge && (
            <div className="absolute top-2 right-2">
              <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md">{project.badge}</span>
            </div>
          )}
        </div>
      </a>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-base font-bold">{project.name}</h3>
          {PROJECT_LINKS.map(({ field, label, icon: Icon, iconClassName }) => {
            const href = project[field];
            return (
              href && (
                <a key={field} href={href} aria-label={label} {...EXTERNAL}>
                  <Icon className={`${iconClassName} text-primary`} />
                </a>
              )
            );
          })}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

export function Projects() {
  const { projects } = getCareerData();

  return (
    <Section id={SECTION_IDS.projects} title="Featured Projects" background={backgroundImg}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
