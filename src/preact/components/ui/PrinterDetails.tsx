import type { Printer } from '@/types/PrinterTypes';
import Badge from '@preact/components/ui/Badge';

interface PrinterDetailsProps {
  printer: Printer;
}

export default function PrinterDetails({ printer }: PrinterDetailsProps) {
  return (
    <div className='px-4'>
      <div>
        <p className='text-center font-primary text-2xl font-bold bg-linear-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent'>
          {printer.model} | {printer.type}
        </p>
        <div>
          <p className='font-bold'>Descripción</p>
          <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
            {printer.description}
          </p>
        </div>
      </div>
      <hr className='border-neutral-500 dark:border-neutral-600 my-4' />
      <div className='font-secondary h-[70dvh]'>
        <div className='space-y-4 pb-2'>
          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Velocidad de impresión
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  PPM Negro
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.black}
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  PPM Color
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.color}
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  IPM Negro
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ipm.black}
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  IPM Color
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ipm.color}
                </p>
              </div>
            </div>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Conectividad
            </h3>
            <ul className='space-y-2'>
              {printer.connectivity.map((conn, index) => (
                <li
                  key={index}
                  className='text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2'
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-500'></span>
                  {conn}
                </li>
              ))}
            </ul>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Capacidad de papel
            </h3>
            <div className='space-y-2'>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Contenedor estándar:
                </span>{' '}
                {printer.max_paper_capacity.standard_container}
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Bypass:
                </span>{' '}
                {printer.max_paper_capacity.bypass}
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Salida máxima:
                </span>{' '}
                {printer.max_paper_out}
              </p>
            </div>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Tipos de papel soportados
            </h3>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              {printer.supported_paper_type}
            </p>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Volumen de trabajo
            </h3>
            <div className='space-y-2'>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Máximo mensual:
                </span>{' '}
                {printer.max_month_job}
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Recomendado mensual:
                </span>{' '}
                {printer.recommended_month_job}
              </p>
            </div>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2'>
              Consumibles
            </h3>
            {printer.consumables && (
              <section>
                <div className='grid grid-cols-2 gap-2 mt-2'>
                  {Object.entries(printer.consumables).map(([color, data]) => (
                    <div
                      key={color}
                      className='p-2 bg-neutral-50 dark:bg-neutral-800 rounded-md'
                    >
                      <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                        <span className='font-semibold'>{data.model}</span>
                        <span className='text-neutral-500 dark:text-neutral-400 ml-1'>
                          ({data.yield_pages.toLocaleString()} pág.)
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Compatibilidad de sistemas
            </h3>
            <div className='inline-flex gap-2'>
              {printer.system_compatibility.map((system, index) => (
                <Badge key={index}>{system}</Badge>
              ))}
            </div>
          </div>

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
              Tamaños de papel soportados
            </h3>
            <div className='space-y-3'>
              <div>
                <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                  Contenedor estándar:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {printer.supported_paper_size.map((size, index) => (
                    <Badge variant='primary' key={index}>
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
