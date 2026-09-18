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
