import type { Printer } from "@/types/PrinterTypes";
import { EthernetIcon } from "@preact/icons/EthernetIcon";
import { PrinterIcon } from "@preact/icons/PrinterIcon";
import { SpeedIcon } from "@preact/icons/SpeedIcon";
import { UsbIcon } from "@preact/icons/UsbIcon";
import { WifiIcon } from "@preact/icons/WifiIcon";
import { useEffect, useState } from "preact/hooks";

export default function PrinterContainer() {
  const [printers, setPrinters] = useState<Printer[]>([]);

  useEffect(() => {
    fetch("/data/printers.json")
      .then((res) => res.json())
      .then((data: Printer[]) => setPrinters(data))
      .catch(console.error);
  }, []);

  const getConnectivityIcons = (conn: string[]) => {
    const icons = [];
    const lower = conn.join(" ").toLowerCase();
    if (lower.includes("wifi") || lower.includes("inalámbrica"))
      icons.push(<WifiIcon className="w-5 h-5" />);
    if (lower.includes("usb")) icons.push(<UsbIcon className="w-5 h-5" />);
    if (lower.includes("ethernet"))
      icons.push(<EthernetIcon className="w-5 h-5" />);
    return icons;
  };

  return (
    <article className="w-full max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 px-4 mt-24 items-start">
      {printers.map((printer) => (
        <div
          key={printer.model}
          className="relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900 shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 hover:shadow-[0 10px 30px hsl(214 85% 55% / 0.2)]"
        >
          <div className="relative p-4">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-linear-to-br from-teal-500 to-indigo-500 text-white shadow-md">
                  <PrinterIcon className="size-6" />
                </div>
                <div className="font-primary">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {printer.model}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {printer.type}
                  </p>
                </div>
              </div>

              {/* Íconos de conectividad */}
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-900/50 px-3 py-2 rounded-lg shadow-sm">
                {getConnectivityIcons(printer.conectivity).map((icon, i) => (
                  <div key={i}>{icon}</div>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <p className="font-secondary text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 -l-4 -blue-400 pl-4">
              {printer.description}
            </p>

            {/* Velocidades */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-lg p-4 shadow">
                <div className="flex justify-between items-center mb-1">
                  <SpeedIcon className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase">Negro</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {printer.printer_speed.ppm.black}
                </p>
                <p className="text-xs text-gray-500">páginas/minuto</p>
              </div>

              <div className="rounded-lg p-4 shadow">
                <div className="flex justify-between items-center mb-1">
                  <SpeedIcon className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase">Color</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {printer.printer_speed.ppm.color}
                </p>
                <p className="text-xs text-gray-500">páginas/minuto</p>
              </div>
            </div>

            {/* Tecnología */}
            <div className="shadow p-4 rounded-2xl dark:bg-neutral-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Tecnología de impresión
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {printer.printer_techology}
              </p>
            </div>
          </div>
        </div>
      ))}
    </article>
  );
}
