import type { Printer, PrinterListSummary } from '@/types/PrinterTypes';
import PrinterDetailsSkeleton from '@preact/components/skeletons/PrinterDetailsSkeleton';
import Modal from '@preact/components/ui/Modal';
import PrinterCard from '@preact/components/ui/PrinterCard';
import { lazy, Suspense, useEffect, useState } from 'preact/compat';

const PrinterDetails = lazy(
  () => import('@preact/components/ui/PrinterDetails'),
);

const printerDetailsCache = new Map<string, Printer>();

export default function PrinterContainer() {
  const [printers, setPrinters] = useState<PrinterListSummary[]>([]);
  const [dataSelectedPrinter, setDataSelectedPrinter] =
    useState<Printer | null>(null);

  useEffect(() => {
    fetch('/data/printers-list.json')
      .then((res) => res.json())
      .then((data: PrinterListSummary[]) => setPrinters(data))
      .catch(console.error);
  }, []);

  function handleOpenDetails(details: Printer) {
    setDataSelectedPrinter(details);
  }

  function handleCloseDetails() {
    setDataSelectedPrinter(null);
  }

  return (
    <article className='w-full max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 px-4 mt-24'>
      {printers.map((printer) => (
        <PrinterCard
          key={printer.model}
          printer={printer}
          onOpenDetails={handleOpenDetails}
          printerDetailsCache={printerDetailsCache}
        />
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
