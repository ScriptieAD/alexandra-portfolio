import Link from "next/link";
import ProjectHero from "../../components/ProjectHero";
import CaseBrief from "../../components/CaseBrief";
import InvestigationFlow from "../../components/InvestigationFlow";
import DetectionRules from "../../components/DetectionRules";
import AlertDistribution from "../../components/AlertDistribution";
import CaseSpotlight from "../../components/CaseSpotlight";
import SeverityStory from "../../components/SeverityStory";
import ThresholdCalibration from "../../components/ThresholdCalibration";
import FinalCalibrationResult from "../../components/FinalCalibrationResult";
import InvestigationNotes from "../../components/InvestigationNotes";
import ProjectLimitations from "../../components/ProjectLimitations";
import CaseClosed from "../../components/CaseClosed";

export default function AmlTransactionMonitoringPage() {
  return (
    <main className="bg-paper min-h-screen text-ink">
      <Link
        href="/#projects"
        className="bg-ivory/90 fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-black/60 uppercase backdrop-blur-md transition hover:border-burgundy/30 hover:text-burgundy"
      >
        ← Back
      </Link>

      <ProjectHero />
      <CaseBrief />
      <InvestigationFlow />
      <DetectionRules />
      <AlertDistribution />
      <CaseSpotlight />
      <SeverityStory />
      <ThresholdCalibration />
      <FinalCalibrationResult />
      <InvestigationNotes />
      <ProjectLimitations />
      <CaseClosed />
    </main>
  );
}
