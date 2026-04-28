/**
 * GENERATED: Complete measurement data with all body circumferences
 * Generated 2026-04-25 for all clients with realistic proportions
 * 
 * Measurement types: waist, abdomen, hips, chest, arm, forearm, wrist,
 *                    thighProximal, thighMiddle, thighDistal, calf, shin, back
 */

import { MeasurementEntry } from '../types';

/**
 * Generate measurements based on weight and body profile
 * Scaling: measurements scale approximately with BMI
 * 
 * Baselines (average BMI=22):
 * Male (178cm):   waist=82, chest=95, hips=95, arm=31, thighs=52, calf=38
 * Female (165cm): waist=70, chest=92, hips=98, arm=26, thighs=50, calf=35
 */
function generateMeasurementsForWeight(
  weight: number,
  height: number,
  gender: 'M' | 'F',
  bodyFactor: number = 1.0
): Record<string, number> {
  const baselineBmi = 22;
  const bmi = weight / ((height / 100) ** 2);
  const bmiRatio = bmi / baselineBmi;

  const baseByGender = {
    M: {
      waist: 82,
      abdomen: 85,
      chest: 95,
      hips: 95,
      back: 90,
      arm: 31,
      forearm: 26,
      wrist: 18,
      thighProximal: 55,
      thighMiddle: 52,
      thighDistal: 48,
      calf: 38,
      shin: 33,
    },
    F: {
      waist: 70,
      abdomen: 75,
      chest: 92,
      hips: 98,
      back: 85,
      arm: 26,
      forearm: 23,
      wrist: 16,
      thighProximal: 54,
      thighMiddle: 50,
      thighDistal: 46,
      calf: 35,
      shin: 30,
    },
  };

  const base = baseByGender[gender];
  const result: Record<string, number> = {};

  for (const [key, value] of Object.entries(base)) {
    const scaled = value * bmiRatio * bodyFactor;
    result[key] = Math.round(scaled * 2) / 2; // Round to 0.5 cm
  }

  return result;
}

// Marco Rossi - All dates with complete measurements
export const MARCO_MEASUREMENTS_2024_2026 = [
  // 2024-02-15: 81kg, male, 178cm, athletic
  ...createMeasurementSet('marco', 'client-marco', '2024-02-15', generateMeasurementsForWeight(81.0, 178, 'M', 1.0), 1),
  // 2024-03-01: 80.5kg
  ...createMeasurementSet('marco', 'client-marco', '2024-03-01', generateMeasurementsForWeight(80.5, 178, 'M', 1.0), 14),
  // 2024-03-22: 80kg
  ...createMeasurementSet('marco', 'client-marco', '2024-03-22', generateMeasurementsForWeight(80.0, 178, 'M', 1.0), 27),
  // 2024-04-12: 79.5kg
  ...createMeasurementSet('marco', 'client-marco', '2024-04-12', generateMeasurementsForWeight(79.5, 178, 'M', 1.0), 40),
  // 2024-05-03: 79kg
  ...createMeasurementSet('marco', 'client-marco', '2024-05-03', generateMeasurementsForWeight(79.0, 178, 'M', 1.0), 53),
  // 2024-06-14: 78.5kg
  ...createMeasurementSet('marco', 'client-marco', '2024-06-14', generateMeasurementsForWeight(78.5, 178, 'M', 1.0), 66),
  // 2024-07-05: 78kg
  ...createMeasurementSet('marco', 'client-marco', '2024-07-05', generateMeasurementsForWeight(78.0, 178, 'M', 1.0), 79),
  // 2024-08-16: 77.5kg
  ...createMeasurementSet('marco', 'client-marco', '2024-08-16', generateMeasurementsForWeight(77.5, 178, 'M', 1.0), 92),
  // 2024-09-06: 77.2kg
  ...createMeasurementSet('marco', 'client-marco', '2024-09-06', generateMeasurementsForWeight(77.2, 178, 'M', 1.0), 105),
  // 2024-10-04: 77kg
  ...createMeasurementSet('marco', 'client-marco', '2024-10-04', generateMeasurementsForWeight(77.0, 178, 'M', 1.0), 118),
  // 2024-11-01: 77.2kg (plateau)
  ...createMeasurementSet('marco', 'client-marco', '2024-11-01', generateMeasurementsForWeight(77.2, 178, 'M', 1.0), 131),
  // 2024-12-20: 77kg
  ...createMeasurementSet('marco', 'client-marco', '2024-12-20', generateMeasurementsForWeight(77.0, 178, 'M', 1.0), 144),
  // 2025-01-24: 77.3kg
  ...createMeasurementSet('marco', 'client-marco', '2025-01-24', generateMeasurementsForWeight(77.3, 178, 'M', 1.0), 157),
  // 2025-02-21: 77.1kg
  ...createMeasurementSet('marco', 'client-marco', '2025-02-21', generateMeasurementsForWeight(77.1, 178, 'M', 1.0), 170),
  // 2025-03-21: 76.8kg
  ...createMeasurementSet('marco', 'client-marco', '2025-03-21', generateMeasurementsForWeight(76.8, 178, 'M', 1.0), 183),
  // 2025-05-16: 76.9kg
  ...createMeasurementSet('marco', 'client-marco', '2025-05-16', generateMeasurementsForWeight(76.9, 178, 'M', 1.0), 196),
  // 2025-07-11: 77kg
  ...createMeasurementSet('marco', 'client-marco', '2025-07-11', generateMeasurementsForWeight(77.0, 178, 'M', 1.0), 209),
  // 2026-02-01: 78kg (recent momentum phase)
  ...createMeasurementSet('marco', 'client-marco', '2026-02-01', generateMeasurementsForWeight(78.0, 178, 'M', 1.0), 222),
  // 2026-03-08: 77.2kg
  ...createMeasurementSet('marco', 'client-marco', '2026-03-08', generateMeasurementsForWeight(77.2, 178, 'M', 1.0), 235),
  // 2026-04-14: 76.3kg
  ...createMeasurementSet('marco', 'client-marco', '2026-04-14', generateMeasurementsForWeight(76.3, 178, 'M', 1.0), 248),
];

// Giulia Bianchi - Two check-in dates
export const GIULIA_MEASUREMENTS = [
  // 2026-01-15: 67kg, female, 165cm, lean
  ...createMeasurementSet('giulia', 'client-giulia', '2026-01-15', generateMeasurementsForWeight(67.0, 165, 'F', 0.9), 1),
  // 2026-04-13: 69.8kg (weight gain)
  ...createMeasurementSet('giulia', 'client-giulia', '2026-04-13', generateMeasurementsForWeight(69.8, 165, 'F', 0.9), 14),
];

// Alessandro Fermi - One check-in
export const ALESSANDRO_MEASUREMENTS = [
  // 2026-04-10: 86.2kg, male, 175cm, stocky
  ...createMeasurementSet('alessandro', 'client-alessandro', '2026-04-10', generateMeasurementsForWeight(86.2, 175, 'M', 1.2), 1),
];

// Francesca Conti - Two check-in dates, stable weight
export const FRANCESCA_MEASUREMENTS = [
  // 2026-02-15: 62.1kg, female, 160cm, lean
  ...createMeasurementSet('francesca', 'client-francesca', '2026-02-15', generateMeasurementsForWeight(62.1, 160, 'F', 0.85), 1),
  // 2026-04-14: 61.8kg (slight maintenance variation)
  ...createMeasurementSet('francesca', 'client-francesca', '2026-04-14', generateMeasurementsForWeight(61.8, 160, 'F', 0.85), 14),
];

// Davide Moretti - Two check-ins with improvement
export const DAVIDE_MEASUREMENTS = [
  // 2026-01-10: 82.3kg, male, 180cm, athletic
  ...createMeasurementSet('davide', 'client-davide', '2026-01-10', generateMeasurementsForWeight(82.3, 180, 'M', 1.1), 1),
  // 2026-04-12: 79.5kg (good progress)
  ...createMeasurementSet('davide', 'client-davide', '2026-04-12', generateMeasurementsForWeight(79.5, 180, 'M', 1.1), 14),
];

/**
 * Helper: Create measurement entries for all types on a given date
 */
function createMeasurementSet(
  clientShort: string,
  clientId: string,
  dateStr: string,
  measurements: Record<string, number>,
  idStart: number
): MeasurementEntry[] {
  const date = new Date(dateStr);
  const entries: MeasurementEntry[] = [];
  let id = idStart;

  const types = ['waist', 'abdomen', 'hips', 'chest', 'arm', 'forearm', 'wrist', 'thighProximal', 'thighMiddle', 'thighDistal', 'calf', 'shin', 'back'];

  for (const type of types) {
    entries.push({
      id: `me-${clientShort}-${String(id).padStart(3, '0')}`,
      clientId,
      type: type as any,
      value: measurements[type],
      unit: 'cm',
      recordedAt: date,
    });
    id++;
  }

  return entries;
}

export const MOCK_MEASUREMENT_ENTRIES_COMPLETE: MeasurementEntry[] = [
  ...MARCO_MEASUREMENTS_2024_2026,
  ...GIULIA_MEASUREMENTS,
  ...ALESSANDRO_MEASUREMENTS,
  ...FRANCESCA_MEASUREMENTS,
  ...DAVIDE_MEASUREMENTS,
];
