import type { Printer, PrinterListSummary } from '@/types/PrinterTypes';
import PrinterDetailsSkeleton from '@preact/components/skeletons/PrinterDetailsSkeleton';
import Badge from '@preact/components/ui/Badge';
import Modal from '@preact/components/ui/Modal';
import EthernetIcon from '@preact/icons/EthernetIcon';
import InfoIcon from '@preact/icons/InfoIcon';
import PrinterIcon from '@preact/icons/PrinterIcon';
import SpeedIcon from '@preact/icons/SpeedIcon';
import UsbIcon from '@preact/icons/UsbIcon';
import WifiIcon from '@preact/icons/WifiIcon';
import { lazy, Suspense, useEffect, useState } from 'preact/compat';

const PrinterDetails = lazy(
  () => import('@preact/components/ui/PrinterDetails'),
);

const printerDetailsCache = new Map<string, Printer>();

export default function PrinterContainer() {
  const [printers, setPrinters] = useState<PrinterListSummary[]>([]);
  const [dataSelectedPrinter, setDataSelectedPrinter] =
    useState<Printer | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    fetch('/data/printers-list.json')
      .then((res) => res.json())
      .then((data: PrinterListSummary[]) => setPrinters(data))
      .catch(console.error);
  }, []);

  const getConnectivityIcons = (conn: string[]) => {
    const icons = [];
    const lower = conn.join(' ').toLowerCase();
    if (lower.includes('wifi') || lower.includes('inalámbrica'))
      icons.push(<WifiIcon className='size-5' />);
    if (lower.includes('usb')) icons.push(<UsbIcon className='size-5' />);
    if (lower.includes('ethernet'))
      icons.push(<EthernetIcon className='size-5' />);
    return icons;
  };

  async function handleOpenDetails(summary: PrinterListSummary) {
    const model = summary.model;
    if (printerDetailsCache.has(model)) {
      setDataSelectedPrinter(printerDetailsCache.get(model)!);
      return;
    }
    setIsLoadingDetails(true);
    try {
      const res = await fetch(`/data/printer-details/${model}.json`);
      if (!res.ok) throw new Error('Error al hacer el fetching de datos');

      const details: Printer = await res.json();

      printerDetailsCache.set(model, details);

      setDataSelectedPrinter(details);
    } catch (error) {
      // Pendiente implementar errores personalizados
      console.error('El fetching de datos fallo: ', error);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  function handleCloseDetails() {
    setDataSelectedPrinter(null);
  }

  return (
    <article className='w-full max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 px-4 mt-24'>
      {printers.map((printer) => (
        <div
          key={printer.model}
          className='relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 shadow-md transition-all duration-300'
        >
          <div className='relative p-4 flex flex-col h-full w-full justify-between'>
            {/* Encabezado */}
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

              {/* Íconos de conectividad */}
              <div className='flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg shadow-sm'>
                {getConnectivityIcons(printer.connectivity).map((icon, i) => (
                  <div key={i}>{icon}</div>
                ))}
              </div>
            </div>
            {/* Descripción */}
            <p className='font-secondary text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 text-balance'>
              {printer.description}
            </p>
            <div className='grid grid-cols-2 gap-2'>
              {/* Velocidad Negro */}
              <div className='rounded-lg p-4 dark:bg-neutral-800'>
                <div className='flex justify-between items-center mb-1'>
                  <SpeedIcon className='size-5' />
                  <span className='text-xs font-semibold uppercase'>Negro</span>
                </div>
                <p className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.black}
                </p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  páginas/minuto
                </p>
              </div>

              {/* Velocidad Color */}
              <div className='rounded-lg p-4 dark:bg-neutral-800'>
                <div className='flex justify-between items-center mb-1'>
                  <SpeedIcon className='size-5' />
                  <span className='text-xs font-semibold uppercase'>Color</span>
                </div>
                <p className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.color}
                </p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  páginas/minuto
                </p>
              </div>

              {/* Tecnología */}
              <div className='col-span-2 font-secondary shadow p-4 rounded-lg dark:bg-neutral-800'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400 mb-1'>
                  Tecnología de impresión
                </p>
                <p className='text-neutral-900 dark:text-neutral-100 text-sm'>
                  {printer.printer_technology}
                </p>
              </div>
              {/* Mostrar todas las características */}
              <button
                onClick={() => handleOpenDetails(printer)}
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
      ))}
      <Modal
        isOpen={!!dataSelectedPrinter}
        onClose={handleCloseDetails}
        size='xl'
      >
        <Suspense fallback={<PrinterDetailsSkeleton />}>
          {dataSelectedPrinter && (
            <PrinterDetails printer={dataSelectedPrinter} />
          )}
        </Suspense>
      </Modal>
    </article>
  );
}
