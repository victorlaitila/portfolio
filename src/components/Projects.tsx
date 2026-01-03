import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/article-summarizer-thumbnail.png";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import Shimmer from "./ui/shimmer";

const projects = [
  {
    title: "AI Article Summarizer",
    description: "A web application that extracts and summarizes content from URLs, text input, or uploaded files, providing concise summaries along with automatically generated keywords. It also includes features like saving summaries, text-to-speech playback, multi-mode summarization, and intuitive copy, download, and share options for a seamless reading experience.",
    image: project1,
    tags: ["React", "TypeScript", "Tailwind CSS", "Python", "Docker", "SQLite", "Vitest"],
    github: "https://github.com/victorlaitila/ai-article-summarizer",
    demo: "https://victorlaitila.github.io/ai-article-summarizer/",
  },
  {
    title: "Project 2",
    description: "To be added soon.",
    image: project2,
    tags: [],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Project 3",
    description: "To be added soon.",
    image: project3,
    tags: [],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden group bg-card border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              > 
                <Shimmer />
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4 text-primary" />
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </a>
                   </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
