import { AnimeGenre, AnimeNode } from '@/app/lib/definitions';
import { replaceLineBreak } from '@/app/lib/utils';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaTv } from 'react-icons/fa6';

interface TooltipProps {
  children: React.ReactNode;
  content: AnimeNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('right'); // Cambiar aquí la posición inicial
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    main_picture,
    synopsis,
    media_type,
    start_date,
    num_episodes,
    title,
    genres,
    mean,
    } = content;
    // const image_large = main_picture?.large || '/logos/logo-primary.svg';
    const image_medium = main_picture?.medium || '/logos/logo-primary.svg';

  useEffect(() => {
    if (!visible || !tooltipRef.current || !containerRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const fitsTop = containerRect.top >= tooltipRect.height;
    const fitsBottom = window.innerHeight - containerRect.bottom >= tooltipRect.height;
    const fitsLeft = containerRect.left >= tooltipRect.width;
    const fitsRight = window.innerWidth - containerRect.right >= tooltipRect.width;

    // Cambiar lógica para favorecer la posición predeterminada
    if (position === 'right' && fitsRight) {
      setPosition('right');
    } else if (fitsLeft) {
      setPosition('left');
    } else if (fitsTop) {
      setPosition('top');
    } else if (fitsBottom) {
      setPosition('bottom');
    } else {
      setPosition('right'); // Mantener la posición predeterminada como fallback
    }
  }, [visible, position]); // Incluir posición como dependencia para que respete el estado inicial

  return (
    <div
      className="relative w-full"
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div className={`absolute z-50 duration-500 opacity-0 ${visible ? 'opacity-100' : null}
        ${position === 'top'
          ? 'bottom-full left-1/2 transform -translate-x-1/2'
          : position === 'bottom'
            ? 'top-full left-1/2 transform -translate-x-1/2'
            : position === 'left'
              ? 'right-[105%] top-1/2 transform -translate-y-1/2'
              : 'left-[105%] top-1/2 transform -translate-y-1/2'
        }`}>
        {visible &&
          <div
            ref={tooltipRef}
            onMouseEnter={() => setVisible(false)}
            className={`p-2 text-sm bg-white rounded-2xl shadow-md border-primary-color border-2 w-[450px] lg:w-[650px]`}>
            <h4 className='text-xl font-bold'>{title}</h4>
            <div className="z-10 w-fit overflow-hidden text-sm leading-6 flex items-center mt-2 mb-4">
              <span className='uppercase flex items-center mr-2'>
                <FaTv className='mr-1' /> {media_type}
                ({num_episodes == 0 ? "N/A" : num_episodes} <span className='ml-1 lowercase'>episodes</span>)
              </span>  |
              <span className='mx-2'>{start_date}</span>|
              <span className='uppercase flex items-center ml-2'>
                <FaStar className="mr-1" />
                {mean == null ? "N/A" : mean}
              </span>
            </div>
            <div className='flex'>
              <Image unoptimized={true} src={image_medium} alt={title} className="h-fit mr-4 rounded-2xl" height={300} width={200} />
              <div>
                {
                  synopsis ? <p className='text-sm whitespace-normal relative' dangerouslySetInnerHTML={{ __html: replaceLineBreak(synopsis) }} /> : '(No synopsis information has been added to this title.)'
                }
                {
                  genres ?
                    <span className='flex flex-wrap font-bold items-center mt-2'>
                      <span className='mr-2'>
                        Genres:
                      </span>
                      <Genres genres={genres} />
                    </span>
                    : null
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export function Genres({ genres }: { genres: AnimeGenre[] }) {
  return (
    <>
      {genres.map((genre) => (
        <span key={genre.id} className="z-10 w-fit gap-y-1 font-normal pr-2 overflow-hidden text-sm leading-6">{genre.name}</span>
      ))}
    </>
  )
}

export default Tooltip;
