import { NextResponse } from 'next/server';
import { getCurrentSeason } from './app/lib/utils';

export function middleware(request: Request) {
  // Obtén la URL actual
  const url = new URL(request.url);

  // Revisa si estamos en la ruta /anime/seasonal
  if (url.pathname === '/anime/seasonal') {
     const { year, season } = getCurrentSeason();

    // Construye la nueva URL
    const newUrl = `${url.origin}/anime/seasonal/${year}/${season}`;

    // Redirige a la nueva URL
    return NextResponse.redirect(newUrl);
  }

  // Si no es /anime/seasonal, continúa con la solicitud normalmente
  return NextResponse.next();
}

export const config = {
    matcher: ['/anime/seasonal'],
};
