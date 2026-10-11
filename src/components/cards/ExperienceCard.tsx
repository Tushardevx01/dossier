import { FC } from "react";


import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ExperienceCardProps {
  role: string;
  year: string;
  impactSummary?: string;
  description: Array<string>;
  company: string;
  technologies: Array<string>;
  url?: string;
  index?: number;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  role,
  year,
  impactSummary,
  description,
  company,
  technologies,
  url,
  index = 0,
}) => {

  return (
    <div
      key={index}
      className="relative flex items-start gap-4 sm:gap-8 group"
    >
      {/* Timeline dot */}
      <div
        className="mt-6 flex-shrink-0 hidden sm:block"
      >
        <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full border-2 border-background shadow-lg" />
        <div className="w-px h-20 bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <Card
          className="relative overflow-hidden backdrop-blur-xl border transition-all duration-500 shadow-xl hover:shadow-2xl group-hover:shadow-luxury-hover-glow/20"
          style={{
            background: "hsl(var(--glass-bg))",
            borderColor: "hsl(var(--glass-border))",
          }}
        >
          {/* Glass shimmer effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ background: "var(--shimmer)" }}
          />

          <div className="relative z-10 p-4 sm:p-6">
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
            >
              <div>
                <h3
                  className="text-xl font-semibold font-nasalization mb-1"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {role}
                </h3>
                <p
                  className="font-medium"
                  style={{ color: "hsl(var(--secondary))" }}
                >
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors duration-200"
                    >
                      {company}
                    </a>
                  ) : (
                    company
                  )}
                </p>
              </div>
              <span
                className="text-sm mt-2 sm:mt-0"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {year}
              </span>
            </div>

            <ul
              className="space-y-2"
            >
              {impactSummary ? (
                <li className="text-xs font-semibold text-primary/90 leading-relaxed">{impactSummary}</li>
              ) : null}
              {description.map((point, pointIndex) => (
                <li
                  key={pointIndex}
                  className="text-xs font-inter flex items-start"
                  style={{ color: "hsl(var(--foreground) / 0.8)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div
              className="flex flex-wrap gap-2 mt-6"
            >
              {technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                >
                  <Badge
                    variant="outline"
                    className="text-xs transition-all duration-300 hover:shadow-md font-mono px-3 py-1"
                    style={{
                      borderColor: "hsl(var(--primary) / 0.3)",
                      color: "hsl(var(--foreground) / 0.9)",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {tech}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
