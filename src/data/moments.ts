import type { Moment } from '../types'

const base = import.meta.env.BASE_URL

export const moments: Moment[] = [
  {
    id: 1,
    date: 'MOMENTO 01',
    title: 'El comienzo de todo',
    message:
      'Todo empezó con una sonrisa y una conversación que no quería que terminara. Así de simple y así de importante.',
    photo: `${base}fotos/photo-01.png`,
  },
  {
    id: 2,
    date: 'MOMENTO 02',
    title: 'Nuestro primer encuentro',
    message:
      'Ese día el mundo se sintió más amable contigo al lado. Guardé cada detalle de esa fecha para siempre.',
    photo: `${base}fotos/photo-02.jpg`,
  },
  {
    id: 3,
    date: 'MOMENTO 03',
    title: 'Días contigo',
    message:
      'Las horas más tranquilas y a la vez las más felices. Contigo hasta el día más simple se vuelve memorable.',
    photo: `${base}fotos/photo-03.png`,
  },
  {
    id: 4,
    date: 'MOMENTO 04',
    title: 'Las pequeñas aventuras',
    message:
      'Cada camino, cada parada y cada risa improvisada. Aventuras que no necesitan planes, solo tu compañía.',
    photo: `${base}fotos/photo-04.jpg`,
  },
  {
    id: 5,
    date: 'MOMENTO 05',
    title: 'Tu sonrisa',
    message:
      'De todas las cosas de este mundo, tu sonrisa sigue siendo mi favorita. No hay foto que le haga justicia.',
    photo: `${base}fotos/photo-05.png`,
  },
  {
    id: 6,
    date: 'MOMENTO 06',
    title: 'Los detalles que nadie ve',
    message:
      'Tu forma de preocuparte, de escuchar, de estar. Son los detalles que nadie más ve y los que más amo.',
    photo: `${base}fotos/photo-06.jpg`,
  },
  {
    id: 7,
    date: 'MOMENTO 07',
    title: 'A pesar de la distancia',
    message:
      'Aunque el camino a veces nos separe, siempre encontramos la forma de volver. Y eso lo vale todo.',
    photo: `${base}fotos/photo-07.jpg`,
  },
  {
    id: 8,
    date: 'MOMENTO 08',
    title: 'Contar los días',
    message:
      'Hay recuerdos que cuento como quien cuenta estrellas. Cada uno con nosotros dos y con su propia luz.',
    photo: `${base}fotos/photo-08.jpg`,
  },
  {
    id: 9,
    date: 'MOMENTO 09',
    title: 'Lo que aprendo de ti',
    message:
      'Me enseñas a mirar las cosas con calma y con cariño. Contigo aprendo a ser mejor, cada día un poco más.',
    photo: `${base}fotos/photo-09.jpg`,
  },
  {
    id: 10,
    date: 'MOMENTO 10',
    title: 'Y los que faltan por venir',
    message:
      'Esto es solo una página; faltan muchas más. Este espacio siempre será nuestro refugio de momentos.',
    photo: `${base}fotos/photo-10.jpg`,
  },
]