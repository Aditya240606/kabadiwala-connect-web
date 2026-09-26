import { Smartphone, Cpu, Cable, Monitor, Battery, HardDrive, Wifi, Printer, CircuitBoard, Lightbulb, Thermometer, Watch, Fan, Package } from 'lucide-react';

export interface EWasteCategory {
  code: string;
  displayName: string;
  displayNameHi: string;
  displayNameMr: string;
  description: string;
  icon: typeof Smartphone;
  pricePerKgLow: number;
  pricePerKgHigh: number;
}

/**
 * 14 worker-facing e-waste classification categories
 * matching the backend WasteCategory taxonomy.
 * Price ranges are indicative demo values (₹/kg).
 */
export const EWASTE_CATEGORIES: EWasteCategory[] = [
  { code: 'SMARTPHONE', displayName: 'Smartphone Scrap', displayNameHi: 'स्मार्टफोन स्क्रैप', displayNameMr: 'स्मार्टफोन भंगार', description: 'Mobile phones & tablets', icon: Smartphone, pricePerKgLow: 120, pricePerKgHigh: 180 },
  { code: 'PCB_MOTHERBOARD', displayName: 'Motherboard PCB', displayNameHi: 'मदरबोर्ड पीसीबी', displayNameMr: 'मदरबोर्ड पीसीबी', description: 'High-grade circuit boards', icon: Cpu, pricePerKgLow: 250, pricePerKgHigh: 350 },
  { code: 'COPPER_WIRE', displayName: 'Copper Wire & Motors', displayNameHi: 'तांबे की तार', displayNameMr: 'तांब्याची तार', description: 'Wiring, coils & small motors', icon: Cable, pricePerKgLow: 200, pricePerKgHigh: 300 },
  { code: 'CRT_MONITOR', displayName: 'CRT Monitor/TV', displayNameHi: 'CRT मॉनिटर', displayNameMr: 'CRT मॉनिटर', description: 'Cathode ray tube displays', icon: Monitor, pricePerKgLow: 15, pricePerKgHigh: 40 },
  { code: 'BATTERY_PACK', displayName: 'Battery Pack', displayNameHi: 'बैटरी पैक', displayNameMr: 'बॅटरी पॅक', description: 'Li-ion, NiMH, lead-acid', icon: Battery, pricePerKgLow: 50, pricePerKgHigh: 120 },
  { code: 'HDD_STORAGE', displayName: 'HDD / Storage', displayNameHi: 'हार्ड डिस्क', displayNameMr: 'हार्ड डिस्क', description: 'Hard drives & SSDs', icon: HardDrive, pricePerKgLow: 80, pricePerKgHigh: 150 },
  { code: 'TELECOM_CARDS', displayName: 'Telecom Cards', displayNameHi: 'टेलीकॉम कार्ड', displayNameMr: 'टेलिकॉम कार्ड्स', description: 'Telecom line & switching cards', icon: Wifi, pricePerKgLow: 180, pricePerKgHigh: 280 },
  { code: 'PRINTER_COPIER', displayName: 'Printer / Copier', displayNameHi: 'प्रिंटर/कॉपियर', displayNameMr: 'प्रिंटर/कॉपीअर', description: 'Printers & copier machines', icon: Printer, pricePerKgLow: 20, pricePerKgHigh: 60 },
  { code: 'LOW_GRADE_PCB', displayName: 'Low Grade PCB', displayNameHi: 'सामान्य पीसीबी', displayNameMr: 'सामान्य पीसीबी', description: 'Consumer electronics boards', icon: CircuitBoard, pricePerKgLow: 60, pricePerKgHigh: 120 },
  { code: 'LED_LAMP', displayName: 'LED / CFL Lamps', displayNameHi: 'LED/CFL लैंप', displayNameMr: 'LED/CFL दिवे', description: 'LED tubes, CFLs, fixtures', icon: Lightbulb, pricePerKgLow: 10, pricePerKgHigh: 30 },
  { code: 'COMPRESSOR', displayName: 'AC Compressor', displayNameHi: 'AC कम्प्रेसर', displayNameMr: 'AC कम्प्रेसर', description: 'HVAC compressors & coils', icon: Thermometer, pricePerKgLow: 40, pricePerKgHigh: 90 },
  { code: 'WEARABLE', displayName: 'Wearable Device', displayNameHi: 'स्मार्ट वॉच', displayNameMr: 'स्मार्ट वॉच', description: 'Smartwatches, fitness bands', icon: Watch, pricePerKgLow: 100, pricePerKgHigh: 200 },
  { code: 'FAN_MOTOR', displayName: 'Fan / Motor', displayNameHi: 'पंखा/मोटर', displayNameMr: 'पंखा/मोटर', description: 'Ceiling/table fans, motors', icon: Fan, pricePerKgLow: 30, pricePerKgHigh: 70 },
  { code: 'MIXED_EWASTE', displayName: 'Mixed E-Waste', displayNameHi: 'मिश्रित ई-कचरा', displayNameMr: 'मिश्र ई-कचरा', description: 'Unsorted mixed electronics', icon: Package, pricePerKgLow: 15, pricePerKgHigh: 40 },
];

export function getCategoryByCode(code: string): EWasteCategory | undefined {
  return EWASTE_CATEGORIES.find(c => c.code === code);
}

export function getCategoryDisplayName(code: string, lang: 'en' | 'hi' | 'mr'): string {
  const cat = getCategoryByCode(code);
  if (!cat) return code;
  if (lang === 'hi') return cat.displayNameHi;
  if (lang === 'mr') return cat.displayNameMr;
  return cat.displayName;
}

export function toBackendCategory(code?: string): string {
  if (!code) return 'PCB';
  const map: Record<string, string> = {
    SMARTPHONE: 'PHONE_SMALL_ELECTRONICS',
    PCB_MOTHERBOARD: 'PCB',
    LOW_GRADE_PCB: 'PCB',
    TELECOM_CARDS: 'PCB',
    COPPER_WIRE: 'CABLE_WIRE',
    BATTERY_PACK: 'BATTERY',
    HDD_STORAGE: 'STORAGE_DEVICE',
    CRT_MONITOR: 'DISPLAY_SCREEN',
    PRINTER_COPIER: 'PLASTIC_EWASTE',
    LED_LAMP: 'OTHER_EWASTE',
    COMPRESSOR: 'MOTOR_MECHANICAL',
    WEARABLE: 'PHONE_SMALL_ELECTRONICS',
    FAN_MOTOR: 'MOTOR_MECHANICAL',
    MIXED_EWASTE: 'MIXED_EWASTE',
  };
  return map[code] || code;
}

