export interface Printer {
  model: string;
  type: string;
  printer_techology: string;
  description: string;
  printer_speed: {
    ppm: { black: number; color: number };
    ipm: { black: number; color: number };
  };
  scanner_size: string;
  conectivity: string[];
  system_compatibility: string[];
  max_month_job: string;
  consumables: {
    black: string;
    cyan: string;
    magenta: string;
    yellow: string;
  };
}
