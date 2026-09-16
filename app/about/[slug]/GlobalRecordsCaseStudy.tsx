import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import SelectedImpactSection from "./SelectedImpactSection";
import BuiltHeading from "./BuiltHeading";

const PROJECTS = [
    {
        number: "01",
        title: "Music Catalog Database",
        stack: "Supabase / SQL / APIs",
        description:
            "From learning how tables, buckets and Row Level Security work to building my own database and connecting it to the tools I use.",
    },
    {
        number: "02",
        title: "Internal Analytics Dashboard",
        stack: "React / JavaScript / Node.js",
        description:
            "Built to make recurring business data easier to explore, understand and use.",
    },
    {
        number: "03",
        title: "Reporting Automation",
        stack: "Python / Google Apps Script / APIs",
        description:
            "Turning repetitive reporting processes into automated workflows.",
    },
];

const DATA_FLOW = [
    "Digital sources",
    "Python / ETL",
    "Database",
    "API",
    "Dashboard",
    "Business decision",
];

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

const SCRAPBOOK = [
    {
        label: "dashboard",
        caption: "dashboard_v04_final_FINAL.jsx",
        captionStyle: "font-mono",
        rotate: "-rotate-3",
        image: "/about/global-records/dashboard.jpg",
        imageAlt: "Tandem artist dashboard catalog view",
    },
    {
        label: "python script",
        caption: "yes, it finally worked.",
        captionStyle: "font-serif italic",
        rotate: "rotate-2",
        image: "/about/global-records/python-script.png",
        imageAlt: "Backend route handler code for uploading a track",
    },
    {
        label: "supabase schema",
        caption: "SELECT * FROM my_problems;",
        captionStyle: "font-mono",
        rotate: "-rotate-2",
        image: "/about/global-records/supabase-schema.png",
        imageAlt: "Supabase schema diagram for the music catalog database",
    },
    {
        label: "automated spreadsheet",
        caption: "runs while I sleep.",
        captionStyle: "font-serif italic",
        rotate: "rotate-3",
        image: "/about/global-records/automated-spreadsheet.png",
        imageAlt: "Google Apps Script code for automating a spreadsheet",
    },
];

export default function GlobalRecordsCaseStudy() {
    return (
        <>
            {/* SELECTED IMPACT */}
            <SelectedImpactSection />

            {/* THINGS I ACTUALLY BUILT */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <BuiltHeading />

                    <div className="mt-12 border-t border-black/10">
                        {PROJECTS.map((project, index) => (
                            <Reveal key={project.number} delay={index * 0.1}>
                                <div className="-mx-4 flex flex-col gap-4 border-b border-black/10 px-4 py-8 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex gap-6">
                                        <span className="pt-1 text-xs tracking-[0.2em] text-black/35">
                                            {project.number}
                                        </span>

                                        <div>
                                            <h3 className="font-serif text-2xl sm:text-3xl">
                                                {project.title}
                                            </h3>

                                            <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-burgundy/70">
                                                {project.stack}
                                            </p>

                                            <p className="mt-3 max-w-lg leading-7 text-black/55">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW THE DATA MOVES */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            How the data moves
                        </p>

                        <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">
                            Roughly how it all connects.
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mt-14 flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
                            {DATA_FLOW.map((step, index) => (
                                <div key={step} className="flex items-center gap-3 md:gap-3">
                                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-black/60">
                                        {step}
                                    </span>

                                    {index < DATA_FLOW.length - 1 && (
                                        <span className="text-black/25">
                                            <span className="md:hidden">↓</span>
                                            <span className="hidden md:inline">→</span>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.18}>
                        <p className="mt-10 -rotate-1 font-serif text-base italic text-black/40">
                            &ldquo;data goes in → chaos happens → useful thing comes out&rdquo;
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* TOOLS I ACTUALLY USED HERE */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            Tools I actually used here
                        </p>

                        <p className="mt-5 max-w-lg leading-7 text-black/50">
                            Hover a tool to see what it was actually for.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mt-10 flex flex-wrap gap-x-3 gap-y-8">
                            {TOOLS.map((tool) => (
                                <div key={tool.name} className="group relative">
                                    <span className="inline-flex cursor-default items-center rounded-full border border-black/15 px-4 py-2 text-sm text-black/70 transition group-hover:border-burgundy/40 group-hover:text-burgundy">
                                        {tool.name}
                                    </span>

                                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-mono text-[10px] text-white/90 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                        {tool.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* WHAT I LEARNED */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            What I learned
                        </p>

                        <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] sm:text-5xl">
                            Turns out, the hardest problems aren&apos;t always technical.
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">
                            Working here taught me that building the right solution starts
                            before writing any code. Understanding the business problem, the
                            people using the tool, and what actually needs to improve
                            matters just as much as the technology behind it.
                        </p>
                    </Reveal>

                    <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap">
                        <Reveal delay={0.1}>
                            <p className="-rotate-1 border-b border-black/15 pb-2 font-mono text-sm text-black/45 transition hover:-translate-y-0.5 hover:text-black/65">
                                good data ≠ useful data
                            </p>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <p className="rotate-1 border-b border-black/15 pb-2 font-mono text-sm text-black/45 transition hover:-translate-y-0.5 hover:text-black/65">
                                useful data = context + question + action
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* BEHIND THE SCENES */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            Behind the scenes
                        </p>

                        <p className="mt-5 max-w-lg leading-7 text-black/50">
                            A small, growing scrapbook, space reserved for anonymised
                            screenshots as I add them.
                        </p>
                    </Reveal>

                    <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-14">
                        {SCRAPBOOK.map((frame, index) => (
                            <Reveal key={frame.label} delay={index * 0.08}>
                                <div className={`relative ${frame.rotate}`}>
                                    <span className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 rotate-2 bg-rose-200/70 shadow-sm" />

                                    <div className="bg-paper-card flex aspect-[4/3] w-48 flex-col justify-between rounded-sm border border-black/10 p-3 shadow-md sm:w-56">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/35">
                                            {frame.label}
                                        </span>

                                        {frame.image ? (
                                            <div className="relative flex-1 overflow-hidden rounded-sm border border-black/15">
                                                <Image
                                                    src={frame.image}
                                                    alt={frame.imageAlt ?? ""}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 192px, 224px"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex-1 rounded-sm border border-dashed border-black/15" />
                                        )}
                                    </div>

                                    <p
                                        className={`mt-3 text-center text-xs text-black/45 ${frame.captionStyle}`}
                                    >
                                        {frame.caption}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL SECTION */}
            <section className="border-t border-black/10">
                <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            What I&apos;m taking with me
                        </p>

                        <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] sm:text-5xl">
                            A better sense of data, and a habit of asking why.
                        </h2>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-black/60">
                            A better understanding of data, stronger technical instincts,
                            and the habit of asking &ldquo;why are we doing this
                            manually?&rdquo; a little too often.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mt-10 flex flex-col items-start gap-4">
                            <Link
                                href="/#projects"
                                className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-burgundy"
                            >
                                Next → Explore my projects
                            </Link>

                            <Link
                                href="/about#whats-next"
                                className="text-sm text-black/45 transition hover:text-burgundy"
                            >
                                Explore what I&apos;m learning next →
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
