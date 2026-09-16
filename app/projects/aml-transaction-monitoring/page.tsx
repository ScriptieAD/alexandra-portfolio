import Link from "next/link";
import ProjectHero from "../../components/ProjectHero";
import CaseBrief from "../../components/CaseBrief";
import InvestigationAtAGlance from "../../components/InvestigationAtAGlance";
import InvestigationFlow from "../../components/InvestigationFlow";
import DetectionRules from "../../components/DetectionRules";
import ThresholdCalibration from "../../components/ThresholdCalibration";
import AlertDistribution from "../../components/AlertDistribution";
import CasePrioritisation from "../../components/CasePrioritisation";
import CaseSpotlight from "../../components/CaseSpotlight";
import SeverityStory from "../../components/SeverityStory";
import InvestigationWorkflow from "../../components/InvestigationWorkflow";
import InvestigationNotes from "../../components/InvestigationNotes";
import PostAnalysisValidation from "../../components/PostAnalysisValidation";
import FinalCalibrationResult from "../../components/FinalCalibrationResult";
import ProjectLimitations from "../../components/ProjectLimitations";
import ProjectCapabilities from "../../components/ProjectCapabilities";
import CaseClosed from "../../components/CaseClosed";

export default function AmlTransactionMonitoringPage() {
  return (
    <main className="bg-paper min-h-screen overflow-x-hidden text-ink">
      <Link
        href="/#projects"
        className="bg-ivory/90 fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-black/60 uppercase backdrop-blur-md transition hover:border-burgundy/30 hover:text-burgundy"
      >
        ← Back
      </Link>

      <ProjectHero />
      <CaseBrief />
      <InvestigationAtAGlance />
      <InvestigationWorkflow
        eyebrow="Detection Pipeline"
        title="From raw behaviour to a prioritised case"
        steps={[
          "Customer Behaviour Profiling",
          "Feature Engineering",
          "Threshold Calibration",
          "Detection Rules",
          "Alert Generation",
          "Case Consolidation",
          "Severity Assessment",
          "Case Prioritisation",
          "Post-analysis Validation",
        ]}
        description="Every stage below is covered in detail further down this page, from how customer behaviour is profiled through to how the rule-based prioritisation was checked against the dataset's ground truth."
        annotation="nine stages, one investigation"
      />
      <InvestigationFlow />
      <DetectionRules />
      <ThresholdCalibration />
      <AlertDistribution />
      <CasePrioritisation />
      <CaseSpotlight />
      <SeverityStory />
      <InvestigationWorkflow />
      <InvestigationNotes />
      <PostAnalysisValidation />
      <FinalCalibrationResult />
      <ProjectLimitations />
      <ProjectCapabilities />
      <CaseClosed
        nextCase={{
          title: "AML Network & Flow Analysis",
          href: "/projects/aml-network-analysis",
        }}
      />
    </main>
  );
}
