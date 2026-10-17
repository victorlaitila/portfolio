import type { ComponentType, SVGProps } from "react";
import {
  SiReact,
  SiTypescript,
  SiVuedotjs,
  SiAngular,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDotnet,
  SiScala,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiRobotframework,
  SiFigma,
} from "react-icons/si";
import { TbBrandAzure, TbBrandAws } from "react-icons/tb";
import { Database, DatabaseZap, RefreshCw, Blocks, Webhook, Infinity as InfinityIcon, BrainCircuit, MessageSquareText, Bot, Puzzle, Plug } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const skillIcons: Record<string, IconComponent> = {
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Vue.js": SiVuedotjs,
  "AngularJS": SiAngular,
  "CSS": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Python": SiPython,
  "SQL": Database,
  "NoSQL": DatabaseZap,
  "C#/.NET": SiDotnet,
  "Scala": SiScala,
  "Azure DevOps": TbBrandAzure,
  "Google Cloud": SiGooglecloud,
  "AWS": TbBrandAws,
  "Docker": SiDocker,
  "Git": SiGit,
  "GitHub Actions": SiGithubactions,
  "Robot Framework": SiRobotframework,
  "Agile Development": RefreshCw,
  "Software Architecture": Blocks,
  "REST APIs": Webhook,
  "CI/CD": InfinityIcon,
  "Figma": SiFigma,
  "LLM APIs": BrainCircuit,
  "Prompt Engineering": MessageSquareText,
  "Agentic Coding (Claude Code, Codex, Copilot)": Bot,
  "Agent Skills": Puzzle,
  "MCP Servers": Plug,
};

export function getSkillIcon(name: string): IconComponent | undefined {
  return skillIcons[name];
}
