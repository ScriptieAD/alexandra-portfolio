import Reveal from "../../components/Reveal";
import { getTechColor } from "../../components/techColors";

const TOOLS = [
    { name: "Python", description: "ETL / cleaning / automation" },
    { name: "Pandas", description: "data cleaning / transformation" },
    { name: "SQL", description: "querying / modelling / data logic" },
    { name: "Supabase", description: "database / storage / RLS / APIs" },
    { name: "React", description: "internal analytics tools" },
    { name: "Node.js", description: "backend / API logic" },
    { name: "Google Apps Script", description: "reporting / automation" },
    { name: "YouTube API", description: "data retrieval / automation" },
    { name: "Selenium", description: "browser automation" },
    { name: "Google Sheets", description: "reporting / lightweight storage" },
];

export default function GlobalRecordsTools() {
    return (
        <Reveal onLoad delay={0.2}>
            <div className="mt-14 border-t border-black/10 pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                    Tools I actually used here
                </p>

                <p className="mt-5 max-w-lg leading-7 text-black/50">
                    Hover a tool to see what it was actually for.
                </p>

                <div className="mt-10 flex flex-wrap gap-x-3 gap-y-8">
                    {TOOLS.map((tool) => {
                        const color = getTechColor(tool.name);
                        return (
                            <div key={tool.name} className="group relative">
                                <span
                                    style={{
                                        borderColor: `${color}66`,
                                        color,
                                        backgroundColor: `${color}0d`,
                                    }}
                                    className="inline-flex cursor-default items-center rounded-full border px-4 py-2 text-sm transition"
                                >
                                    {tool.name}
                                </span>

                                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-mono text-[10px] text-white/90 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                    {tool.description}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Reveal>
    );
}
