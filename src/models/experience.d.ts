export interface IExperience {
  title: string;
  company: string;
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
