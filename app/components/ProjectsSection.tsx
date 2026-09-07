"use client";

import Reveal from "./Reveal";
import ProjectsIntro from "./ProjectsIntro";
import InvestigationDossier from "./InvestigationDossier";
import EvidenceLog from "./EvidenceLog";
import ProjectCaseCard from "./ProjectCaseCard";
import { caseFiles } from "../projects-data";

export default function ProjectsSection({
  onOpenCase,
}: {
  onOpenCase: () => void;
}) {
  return (
    <Reveal onLoad>
      {/* hero: asymmetric — text column keeps the site's rhythm, the
          dossier composition bleeds close to the viewport edge instead
          of sitting inside the standard centered container */}
      <div className="mx-auto grid max-w-[1920px] items-start gap-12 pl-6 pr-4 sm:pr-6 md:pl-10 lg:grid-cols-[0.37fr_0.63fr] lg:gap-8 lg:pr-8 xl:gap-14 xl:pr-12">
        <div className="min-w-0">
          <ProjectsIntro />
        </div>
        <div className="min-w-0">
          <InvestigationDossier onOpenCase={onOpenCase} />
        </div>
      </div>

      <div
        id="evidence-log"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-6 md:px-10"
      >
        <EvidenceLog count={caseFiles.length} />
      </div>

      <div className="mx-auto mt-10 grid max-w-[1400px] gap-6 px-6 md:px-10 lg:grid-cols-3">
        {caseFiles.map((item, index) => (
          <ProjectCaseCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </Reveal>
  );
}
