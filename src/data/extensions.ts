/**
 * Portfolio-specific extensions that aren't managed by career-engine.
 * 
 * This includes:
 * - About section content (highlights, personal descriptions)
 * - Project assets (images, demo links, videos)
 * - Any other portfolio-specific data
 * 
 * This file is NOT overwritten by career-engine sync.
 */

import type { PortfolioExtensions } from './types';

import project1 from '@/assets/article-summarizer-thumbnail.png';
import project2 from '@/assets/construction1.png';
import project3 from '@/assets/construction2.png';

export const portfolioExtensions: PortfolioExtensions = {
  about: {
    highlights: [
      { icon: 'Code2', title: 'Clean Code' },
      { icon: 'Puzzle', title: 'Problem Solver' },
      { icon: 'Users', title: 'Team Player' },
      { icon: 'Brain', title: 'Fast Learner' },
    ],
    journey: "I'm a software engineer with a keen eye for creating seamless user experiences. Driven by a profound interest in technology, I'm committed to continuously expanding my knowledge and skills to stay at the forefront of innovation.",
    beyondTech: "While technology fuels my professional journey, I find balance by hitting the gym, playing sports, and strumming my guitar. Fitness and music not only keep me grounded, but also enhance my creativity and focus.",
  },
  projectAssets: [
    {
      image: project1,
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'Docker', 'PostgreSQL', 'Vitest', 'GitHub Actions', 'Sentry (Monitoring)'],
      demo: 'https://victorlaitila.github.io/ai-article-summarizer/',
      video: 'https://www.youtube.com/watch?v=lZrHd0tOBXo/',
    },
    {
      image: project2,
      tags: [],
    },
    {
      image: project3,
      tags: [],
    },
  ],
};
