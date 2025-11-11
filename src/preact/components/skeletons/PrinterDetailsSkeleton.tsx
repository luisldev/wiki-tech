export default function PrinterDetailsSkeleton() {
  return (
    <div className='p-6 space-y-6 animate-pulse'>
      {/* Título */}
      <div className='h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-lg' />

      {/* Sección descripción */}
      <div className='space-y-2'>
        <div className='h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded' />
        <div className='h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded' />
        <div className='h-3 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded' />
      </div>

      {/* Sección velocidad */}
      <div className='space-y-3'>
        <div className='h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded' />
        <div className='grid grid-cols-2 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg'
            />
          ))}
        </div>
      </div>

      {/* Sección conectividad */}
      <div className='space-y-3'>
        <div className='h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded' />
        <div className='space-y-2'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded'
            />
          ))}
        </div>
      </div>

      {/* Sección consumibles */}
      <div className='space-y-3'>
        <div className='h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded' />
        <div className='grid grid-cols-2 gap-3'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='h-10 bg-neutral-200 dark:bg-neutral-800 rounded-md'
            />
          ))}
        </div>
      </div>

      {/* Sección compatibilidad */}
      <div className='space-y-2'>
        <div className='h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded' />
        <div className='flex flex-wrap gap-2'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
