import type { Printer } from '@/types/PrinterTypes';
import Badge from '@preact/components/ui/Badge';

interface PrinterDetailsProps {
  printer: Printer;
}

export default function PrinterDetails({ printer }: PrinterDetailsProps) {
  return (
    <div className='px-4'>
      <div>
        <div className='font-primary mb-4 flex flex-row items-start justify-between'>
          <div>
            <p className='text-2xl font-bold bg-linear-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent'>
              {printer.model}
            </p>
            <p className='text-sm font-light dark:text-neutral-400'>
              {printer.type}
            </p>
          </div>
          <Badge className='font-semibold' variant='primary'>
            {printer.brand}
          </Badge>
        </div>
        <div>
          <p className='font-bold'>Descripción</p>
          <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
            {printer.description}
          </p>
        </div>
      </div>
      <hr className='border-neutral-500 dark:border-neutral-600 my-4' />
      <div className='font-secondary'>
        <div className='space-y-4 pb-2'>
          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Velocidad de impresión
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  PPM Negro (Modo ECO)
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.black}{' '}
                  <span className='text-xs'>máx.</span>
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  PPM Color (Modo Eco)
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ppm.color}{' '}
                  <span className='text-xs'>máx.</span>
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  IPM Negro (ISO/IEC 24734)
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ipm.black}{' '}
                  <span className='text-xs'>máx.</span>
                </p>
              </div>
              <div className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                  IPM Color (ISO/IEC 24734)
                </p>
                <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {printer.printer_speed.ipm.color}{' '}
                  <span className='text-xs'>máx.</span>
                </p>
              </div>
            </div>
            <div className='text-xs text-neutral-500 dark:text-neutral-400 mt-4 space-y-2'>
              <p>
                <strong>Modo Eco (PPM)</strong> se refiere a la velocidad máxima
                de impresión que la máquina puede alcanzar cuando está
                configurada en el modo más rápido y económico{' '}
                <strong>(Borrador)</strong>.
              </p>
              <p>
                <strong>IPM</strong> indica la velocidad de impresión siguiendo
                la norma internacional{' '}
                <strong>ISO/IEC 24734. Consideraciones:</strong> Este es el
                estándar de la industria para la medición de velocidades y es
                considerado el más exacto para comparar impresoras de diferentes
                marcas.
              </p>
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
                {printer.max_paper_capacity.standard_container} hojas
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Ranura Manual (Bypass):
                </span>{' '}
                {printer.max_paper_capacity.bypass} hoja
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
              Gramaje de papel soportado
            </h3>
            <div className='space-y-2'>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Contenedor estándar:
                </span>{' '}
                {printer.supported_paper_weight_g_m2.standard_container}
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Ranura Manual (Bypass):
                </span>{' '}
                {printer.supported_paper_weight_g_m2.bypass}
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
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
              Tamaños de papel soportados
            </h3>
            <div className='space-y-3'>
              <div>
                <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                  Contenedor estándar y Manual:
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

          <hr className='border-neutral-500 dark:border-neutral-600' />

          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2'>
              Volumen de trabajo
            </h3>
            <div className='space-y-2'>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Ciclo Mensual de Trabajo Máximo:
                </span>{' '}
                {printer.max_month_job}
              </p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                <span className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  Volumen Mensual Recomendado:
                </span>{' '}
                {printer.recommended_month_job}
              </p>
            </div>
            <div className='text-xs text-neutral-500 dark:text-neutral-400 my-2 space-y-2'>
              <p>
                <strong>Volumen Mensual Recomendado</strong> Es el volumen de
                impresión para el cual la impresora fue diseñada para trabajar
                de manera constante, logrando la mejor relación costo-beneficio
                y confiabilidad.
              </p>
              <p>
                <strong>Ciclo Mensual de Trabajo Máximo </strong>
                Este valor representa el límite superior de la capacidad de la
                impresora y se utiliza principalmente como una métrica de
                durabilidad y comparación.
              </p>
              <p>
                <strong>Implicación:</strong> El ciclo máximo es un pico de
                durabilidad y{' '}
                <strong>no debe ser sostenido a lo largo del tiempo</strong>.
                Imprimir constantemente cerca del ciclo máximo podría acortar la
                vida útil de la impresora y requerir un mantenimiento más
                frecuente.
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
                    <Badge key={color}>
                      <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                        <span className='font-semibold'>{data.model}</span>
                        <span className='text-neutral-500 dark:text-neutral-400 ml-1 text-xs'>
                          ({data.yield_pages.toLocaleString()} pág. máx.)
                        </span>
                      </p>
                    </Badge>
                  ))}
                </div>
              </section>
            )}
            <div className='text-xs text-neutral-500 dark:text-neutral-400 my-2 space-y-2'>
              <p>
                El rendimiendo del (los) consumible (s) se calcula al 5% de
                cobertura
              </p>
              <p>
                El 5% es simplemente el punto de referencia acordado para que
                todas las marcas puedan decir "esta botella rinde X páginas".
              </p>
              <p>
                Si tus impresiones usan más tinta que ese 5% (por ejemplo,
                imprimes muchas tablas o fotos), la botella te durará menos
                páginas que el rendimiento anunciado.
              </p>
              <p>
                Si imprimes menos tinta que ese 5% (pocas líneas de texto), te
                durará más.
              </p>
              <p>
                Es una herramienta de comparación, no una garantía de uso
                diario.
              </p>
            </div>
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

          {printer.technical_data_sheet_link && (
            <div>
              <h3 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                Toda la información se obtiene de{' '}
                <a
                  href={printer.technical_data_sheet_link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500'
                >
                  la ficha técnica oficial
                </a>
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
