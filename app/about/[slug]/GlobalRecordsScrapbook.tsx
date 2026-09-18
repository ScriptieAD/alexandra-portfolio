import Image from "next/image";
import Reveal from "../../components/Reveal";

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

export default function GlobalRecordsScrapbook() {
    return (
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
    );
}
