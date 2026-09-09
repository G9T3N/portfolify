import React from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags?: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  tags = [],
  liveUrl,
  sourceUrl,
}) => (
  <article className="border border-[#abb2bf] bg-[#282c33] hover:border-[#297f29] transition-colors duration-300 h-full flex flex-col">
    <img src={image} className="w-full h-48 object-cover" alt={`${title} preview`} />
    <div className="p-4 border-t border-[#abb2bf] space-y-4 flex-1 flex flex-col">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#abb2bf]">
          {tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}
      <h3 className="text-white text-xl lg:text-2xl font-medium">{title}</h3>
      <p className="text-[#abb2bf] text-sm lg:text-base flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 lg:gap-4 pt-1">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 lg:px-4 lg:py-2 border border-[#297f29] text-white text-sm lg:text-base font-medium hover:bg-[#297f29] transition-colors"
          >
            Live &lt;~&gt;
          </a>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 lg:px-4 lg:py-2 border border-[#abb2bf] text-[#abb2bf] text-sm lg:text-base font-medium hover:bg-[#abb2bf] hover:text-[#282c33] transition-colors"
          >
            Source &gt;
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
