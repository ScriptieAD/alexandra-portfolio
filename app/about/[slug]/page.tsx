import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import ArtechBadge from "../../components/ArtechBadge";
import WhatIDidAccordion from "../../components/WhatIDidAccordion";
import GlobalRecordsCaseStudy from "./GlobalRecordsCaseStudy";
import GlobalRecordsTools from "./GlobalRecordsTools";
import GlobalRecordsScrapbook from "./GlobalRecordsScrapbook";
import { experiences } from "../experiences-data";

export function generateStaticParams() {
    return experiences.map((exp) => ({ slug: exp.slug }));
}

function renderWithArtechBadge(text: string) {
    return text.split(/(Artech)/g).map((part, index) =>
        part === "Artech" ? <ArtechBadge key={index} /> : part
    );
}

export default async function ExperiencePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const index = experiences.findIndex((exp) => exp.slug === slug);
    const exp = experiences[index];

    if (!exp) {
        notFound();
    }

    const prev = experiences[index - 1];
    const next = experiences[index + 1];

    return (
        <main className="bg-paper-quiet min-h-screen text-ink">

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-black/10 bg-ivory/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">

                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 font-serif text-lg">
                            AC
                        </div>

                        <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:block">
                            Alexandra Crăciunescu
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 text-sm md:flex">
                        <Link href="/" className="transition hover:opacity-50">
                            Home
                        </Link>

                        <Link href="/#projects" className="transition hover:opacity-50">
                            Projects
                        </Link>

                        <Link href="/about" className="font-medium text-burgundy">
                            About
                        </Link>

                        <Link href="/#experience" className="transition hover:opacity-50">
                            Experience
                        </Link>

                        <Link href="/#contact" className="transition hover:opacity-50">
                            Contact
                        </Link>
                    </div>

                    <Link
                        href="/#contact"
                        className="rounded-full bg-ink px-5 py-2.5 text-xs font-medium text-white transition hover:bg-burgundy"
                    >
                        Let&apos;s connect
                    </Link>
                </div>
            </nav>

            {/* CONTENT */}
            <section className="mx-auto max-w-[1000px] px-6 pb-28 pt-16 md:px-10 md:pt-24">

                <Reveal onLoad>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-black/40 transition hover:text-burgundy"
                    >
                        ← Back to about
                    </Link>
                </Reveal>

                <Reveal onLoad delay={0.06}>
                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                            {exp.period}
                        </p>

                        {exp.current && (
                            <span className="rounded-full bg-burgundy/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-burgundy">
                                Current
                            </span>
                        )}
                    </div>

                    <h1 className="mt-4 font-serif text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
                        {exp.company}
                    </h1>

                    <p className="mt-4 text-lg font-medium text-black/60">
                        {exp.role}
                    </p>
                </Reveal>

                <Reveal onLoad delay={0.12}>
                    <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
                        {renderWithArtechBadge(exp.longDescription)}
                    </p>
                </Reveal>

                <Reveal onLoad delay={0.18}>
                    <div className="mt-14 pt-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                            What I did
                        </p>

                        <WhatIDidAccordion highlights={exp.highlights} />
                    </div>
                </Reveal>

                {exp.slug === "global-records" && <GlobalRecordsTools />}

            </section>

            {exp.slug === "global-records" && <GlobalRecordsScrapbook />}

            {exp.slug === "global-records" && <GlobalRecordsCaseStudy />}

            {/* PREV / NEXT */}
            <section className="mx-auto max-w-[1000px] px-6 pb-28 md:px-10">
                <Reveal>
                    <div className="grid gap-4 border-t border-black/10 pt-10 sm:grid-cols-2">

                        {prev ? (
                            <Link
                                href={`/about/${prev.slug}`}
                                className="group rounded-2xl border border-black/10 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                                    ← Previous
                                </p>
                                <p className="mt-2 font-serif text-2xl transition group-hover:text-burgundy">
                                    {prev.company}
                                </p>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {next ? (
                            <Link
                                href={`/about/${next.slug}`}
                                className="group rounded-2xl border border-black/10 p-6 text-right transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                                    Next →
                                </p>
                                <p className="mt-2 font-serif text-2xl transition group-hover:text-burgundy">
                                    {next.company}
                                </p>
                            </Link>
                        ) : (
                            <div />
                        )}

                    </div>
                </Reveal>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-black/10">
                <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-6 py-10 text-xs text-black/40 sm:flex-row md:px-10">

                    <p>Alexandra Crăciunescu</p>

                    <p>
                        Data · Financial Crime · Technology
                    </p>

                    <p>© 2026</p>

                </div>
            </footer>

        </main>
    );
}
