export type ExperienceEngagementType = "Fulltime" | "Parttime" | "Freelance";

export interface IExperience {
  title: string;
  company?: string | null;
  engagementType?: ExperienceEngagementType;
  location?: string;
  startDate: Date;
  endDate?: Date;
  duration?: string;
  description: string[];
  techStack: string[];
  imageUrls: {
    src: string;
    alt: string;
    description: string;
  }[];
}
