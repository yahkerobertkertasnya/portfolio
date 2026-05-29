import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/utils/class-name.ts";

interface IProps {
  personalProjects?: ReactNode;
  professionalProjects?: ReactNode;
}

enum ProjectType {
  Professional,
  Personal,
}

export default function ProjectList({ personalProjects, professionalProjects }: IProps) {
  const [type, setType] = useState(ProjectType.Professional);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    const elements = document.querySelectorAll("section");
    elements.forEach((element) => observer.observe(element));
  }, [type]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-12 bg-white/30"></div>
        <div className="flex items-center gap-10 max-lg:gap-8 max-sm:gap-6">
          <button
            className={cn(
              "group relative px-3 py-1.5 text-lg font-medium tracking-wide transition-all duration-300 max-lg:text-base",
              type === ProjectType.Professional ? "text-[#00ADB5] drop-shadow-[0_0_8px_rgba(0,173,181,0.3)]" : "text-white/70 hover:text-white/90",
            )}
            onClick={() => setType(ProjectType.Professional)}>
            Professional
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left transition-all duration-300",
                type === ProjectType.Professional
                  ? "scale-x-100 bg-[#00ADB5] shadow-[0_0_8px_rgba(0,173,181,0.3)]"
                  : "scale-x-0 bg-white/50 group-hover:scale-x-100",
              )}
            />
          </button>
          <button
            className={cn(
              "group relative px-3 py-1.5 text-lg font-medium tracking-wide transition-all duration-300 max-lg:text-base",
              type === ProjectType.Personal ? "text-[#00ADB5] drop-shadow-[0_0_8px_rgba(0,173,181,0.3)]" : "text-white/70 hover:text-white/90",
            )}
            onClick={() => setType(ProjectType.Personal)}>
            Personal
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left transition-all duration-300",
                type === ProjectType.Personal
                  ? "scale-x-100 bg-[#00ADB5] shadow-[0_0_8px_rgba(0,173,181,0.3)]"
                  : "scale-x-0 bg-white/50 group-hover:scale-x-100",
              )}
            />
          </button>
        </div>
        <div className="h-[1px] w-12 bg-white/30"></div>
      </div>

      <div className="mt-12 flex w-full flex-col max-lg:mt-8">
        {type === ProjectType.Professional && professionalProjects}
        {type === ProjectType.Personal && personalProjects}
      </div>
    </div>
  );
}
