import React from "react";
import { mono } from "@/app/fonts";

export interface TechnicalMatrixProps {
  title?: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
  className?: string;
}

export const TechnicalMatrix: React.FC<TechnicalMatrixProps> = ({
  title,
  headers,
  rows,
  caption,
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border border-neutral-800/80 bg-[#07070a] overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-800/80 flex items-center justify-between">
          <span
            className={`${mono.className} font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold`}
          >
            {title}
          </span>
          <span className="font-mono text-[10px] text-neutral-500">
            {rows.length} ENTRIES
          </span>
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-400 text-[11px] uppercase tracking-wider">
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  className="py-3 px-4 font-semibold whitespace-nowrap first:pl-5 last:pr-5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900/80">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-neutral-900/30 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="py-3 px-4 text-neutral-300 align-top first:pl-5 last:pr-5"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <div className="px-4 py-2 border-t border-neutral-900 bg-neutral-950/40 text-[11px] text-neutral-500">
          {caption}
        </div>
      )}
    </div>
  );
};
