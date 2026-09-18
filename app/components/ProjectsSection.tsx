"use client";

import Reveal from "./Reveal";
import ProjectsIntro from "./ProjectsIntro";
import InvestigationDossier from "./InvestigationDossier";
import StackedCaseFiles from "./StackedCaseFiles";
import EvidenceLog from "./EvidenceLog";
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
          of sitting inside the standard centered container. The intro
          sits at the top of the row, level with the dossier, so there's
          no dead space above it on tall viewports. */}
      <div className="mx-auto grid max-w-[1920px] items-start gap-12 pl-6 pr-4 sm:pr-6 md:pl-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-6 lg:pr-6 xl:gap-10 xl:pr-8">
        <div className="min-w-0">
          <ProjectsIntro />
        </div>
        <div className="min-w-0">
          <InvestigationDossier onOpenCase={onOpenCase} />
        </div>
      </div>

      {/* full case index — every project, including the featured one
          above, as a compact evidence card. Read as the archive behind
          the spotlighted case. */}
      <div id="case-index" className="mx-auto mt-24 max-w-[1400px] px-6 sm:mt-28 md:px-10 lg:mt-32">
        <StackedCaseFiles items={caseFiles} />

        <EvidenceLog count={caseFiles.length} />
      </div>
    </Reveal>
  );
}
