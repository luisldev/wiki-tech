import type { Printer, PrinterListSummary } from '@/types/PrinterTypes';
import Badge from '@preact/components/ui/Badge';
import EthernetIcon from '@preact/icons/EthernetIcon';
import InfoIcon from '@preact/icons/InfoIcon';
import PrinterIcon from '@preact/icons/PrinterIcon';
import SpeedIcon from '@preact/icons/SpeedIcon';
import UsbIcon from '@preact/icons/UsbIcon';
import WifiIcon from '@preact/icons/WifiIcon';
import { useState } from 'preact/compat';

interface PrinterCardProps {
  printer: PrinterListSummary;
  onOpenDetails: (details: Printer) => void;
  printerDetailsCache: Map<string, Printer>;
}

const getConnectivityIcons = (conn: string[]) => {
  const icons = [];
  const lower = conn.join(' ').toLowerCase();
  if (lower.includes('wifi') || lower.includes('inalámbrica'))
    icons.push(<WifiIcon className='size-5' />);
  if (lower.includes('usb')) icons.push(<UsbIcon className='size-5' />);
  if (lower.includes('ethernet') || lower.includes('red cableada'))
    icons.push(<EthernetIcon className='size-5' />);
  return icons;
};

export default function PrinterCard({
  printer,
  onOpenDetails,
  printerDetailsCache,
}: PrinterCardProps) {
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleLoadDetails = async () => {
    const model = printer.model;

    if (printerDetailsCache.has(model)) {
      onOpenDetails(printerDetailsCache.get(model)!);
      return;
    }

    setIsLoadingDetails(true);
    try {
      const res = await fetch(`/data/printer-details/${model}.json`);
      if (!res.ok) throw new Error(`Failed to fetch details for ${model}`);

      const details: Printer = await res.json();

      printerDetailsCache.set(model, details);
      onOpenDetails(details);
    } catch (error) {
      console.error('Error fetching printer details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div
      key={printer.model}
      className='relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 shadow-md transition-all duration-300'
    >
      <div className='relative p-4 flex flex-col h-full w-full justify-between'>
        <div className='flex items-start justify-between gap-2 mb-4'>
          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-lg bg-linear-to-br from-teal-500 to-indigo-500 text-white shadow-md'>
              <PrinterIcon className='size-6' />
            </div>
            <div className='font-primary'>
              <h3 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                {printer.model}
              </h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                {printer.type}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg shadow-sm'>
            {getConnectivityIcons(printer.connectivity).map((icon, i) => (
              <div key={i}>{icon}</div>
            ))}
          </div>
        </div>
        <p className='font-secondary text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 text-balance'>
          {printer.description}
        </p>
        <div className='grid grid-cols-2 gap-2'>
          <div className='rounded-lg p-4 dark:bg-neutral-800'>
            <div className='flex justify-between items-center mb-1'>
              <SpeedIcon className='size-5' />
              <span className='text-xs font-semibold uppercase'>Negro</span>
            </div>
            <p className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
              {printer.printer_speed.ppm.black}
            </p>
            <p className='text-xs text-neutral-500 dark:text-neutral-400'>
              páginas/minuto (Modo Eco)
            </p>
          </div>
          <div className='rounded-lg p-4 dark:bg-neutral-800'>
            <div className='flex justify-between items-center mb-1'>
              <SpeedIcon className='size-5' />
              <span className='text-xs font-semibold uppercase'>Color</span>
            </div>
            <p className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
              {printer.printer_speed.ppm.color}
            </p>
            <p className='text-xs text-neutral-500 dark:text-neutral-400'>
              páginas/minuto (Modo Eco)
            </p>
          </div>
          <div className='col-span-2 font-secondary shadow p-4 rounded-lg dark:bg-neutral-800'>
            <p className='text-xs text-neutral-500 dark:text-neutral-400 mb-1'>
              Tecnología de impresión
            </p>
            <p className='text-neutral-900 dark:text-neutral-100 text-sm'>
              {printer.printer_technology}
            </p>
          </div>
          <button
            onClick={handleLoadDetails}
            className='col-span-2 w-full font-secondary hover:saturate-150'
            disabled={isLoadingDetails}
          >
            <Badge variant='primary' className='w-full gap-x-2'>
              <InfoIcon className='size-4' />{' '}
              <span className='font-semibold'>
                {isLoadingDetails
                  ? 'Cargando detalles...'
                  : 'Ver todas las características'}
              </span>
            </Badge>
          </button>
        </div>
      </div>
    </div>
  );
}
