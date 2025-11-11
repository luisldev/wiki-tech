// Tipado para la velocidad de la impresora
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

// Tipado para la lista de impresoras (printers-list.json)
// Contiene solo los campos necesarios para renderizar la tarjeta.
export interface PrinterListSummary {
  brand: string;
  series: string;
  model: string;
  type: string;
  printer_technology: string;
  description: string;
  // La velocidad en el listado solo necesita los valores PPM
  printer_speed: {
    ppm: {
      black: number;
      color: number;
    };
  };
  connectivity: string[];
}

// Tipado para los detalles completos de la impresora (printer-details/{model}.json)
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
}
