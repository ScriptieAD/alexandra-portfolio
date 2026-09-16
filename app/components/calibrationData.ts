import type { CalibrationPoint } from "./CalibrationChart";

/**
 * Single source of truth for every precision/recall/threshold figure used
 * across the Post-Analysis Validation, Final Calibrated Result and
 * Calibration Comparison sections. Nothing downstream should hardcode
 * these numbers independently — derive them from here instead.
 */
export const CALIBRATION_POINTS: CalibrationPoint[] = [
  { threshold: 2.0, precision: 58.7, recall: 74.0 },
  { threshold: 2.5, precision: 62.5, recall: 62.3 },
  { threshold: 3.0, precision: 72.1, recall: 51.5, annotation: "selected" },
  { threshold: 3.5, precision: 77.0, recall: 47.1 },
  { threshold: 4.0, precision: 77.8, recall: 38.0 },
  { threshold: 5.0, precision: 81.1, recall: 28.9 },
];

export const SELECTED_THRESHOLD = 3.0;
export const STRICT_THRESHOLD = 5.0;

function findCalibrationPoint(threshold: number): CalibrationPoint {
  const point = CALIBRATION_POINTS.find((p) => p.threshold === threshold);
  if (!point) {
    throw new Error(`No calibration point found for threshold ${threshold}`);
  }
  return point;
}

export const SELECTED_CALIBRATION_POINT = findCalibrationPoint(SELECTED_THRESHOLD);
export const STRICT_CALIBRATION_POINT = findCalibrationPoint(STRICT_THRESHOLD);

export const CONFUSION_MATRIX = {
  tp: 176,
  fp: 68,
  fn: 166,
  tn: 956,
};
