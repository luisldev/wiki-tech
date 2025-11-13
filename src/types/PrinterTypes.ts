export interface PrinterSpeed {
  ppm: {
    black: number;
    color: number;
  };
  ipm: {
    black: number;
    color: number;
  };
}

export interface PrinterListSummary {
  brand: string;
  series: string;
  model: string;
  type: string;
  printer_technology: string;
  description: string;
  printer_speed: {
    ppm: {
      black: number;
      color: number;
    };
  };
  connectivity: string[];
}

export interface Printer {
  brand: string;
  series: string;
  model: string;
  type: string;
  printer_technology: string;
  description: string;
  printer_speed: PrinterSpeed;
  duplex_functionality: {
    print_type: 'manual' | 'automatic';
    scan_copy: boolean;
  };
  has_adf: boolean;
  has_bypass_tray: boolean;
  supports_legal_paper: boolean;
  scanner_size: string;
  connectivity: string[];
  system_compatibility: string[];
  max_paper_capacity: {
    standard_container: number;
    bypass: number;
    adf: number;
  };
  max_paper_out: string;
  supported_paper_type: string;
  supported_paper_size: string[];
  max_month_job: string;
  recommended_month_job: string;
  consumables: {
    black: { model: string; yield_pages: number };
    cyan: { model: string; yield_pages: number };
    magenta: { model: string; yield_pages: number };
    yellow: { model: string; yield_pages: number };
  };

  // NUEVOS CAMPOS AÑADIDOS
  supported_paper_weight_g_m2: {
    standard_container: string;
    bypass: string;
  };
  technical_data_sheet_link: string;
}
