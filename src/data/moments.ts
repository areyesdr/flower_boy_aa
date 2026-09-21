import type { Moment } from '../types'

const base = import.meta.env.BASE_URL

export const moments: Moment[] = [
  {
    id: 1,
    date: 'MOMENTO 01',
    title: 'El inicio de nuestra historia',
    message:
      'Esa primera conversación, esa primera sonrisa y el momento exacto en que supe que no quería alejarme de ti. Ahí empezó todo.',
    photo: `${base}fotos/photo-01.png`,
  },
  {
    id: 2,
    date: 'MOMENTO 02',
    title: 'El "Sí" más importante de mi vida',
    message:
      'El momento en que el tiempo se detuvo. Un anillo que simboliza nuestra promesa y el inicio de un futuro increíble juntos.',
    photo: `${base}fotos/photo-02.jpg`,
  },
  {
    id: 3,
    date: 'MOMENTO 03',
    title: 'Donde quiero estar siempre',
    message:
      'El tiempo a tu lado no se mide en horas, sino en felicidad. Contigo, los días más simples se convierten en mis mejores recuerdos.',
    photo: `${base}fotos/photo-03.png`,
  },
  {
    id: 4,
    date: 'MOMENTO 04',
    title: 'Nuestras pequeñas grandes aventuras',
    message:
      'Cada salida, cada risa improvisada y cada momento que compartimos se convierte en una aventura inolvidable. Solo necesito tu compañía.',
    photo: `${base}fotos/photo-04.jpg`,
  },
  {
    id: 5,
    date: 'MOMENTO 05',
    title: 'Tu mirada me lo dice todo',
    message:
      'No existe una foto que logre capturar la paz que me transmite tu sonrisa, pero esta es una de mis favoritas.',
    photo: `${base}fotos/photo-05.png`,
  },
  {
    id: 6,
    date: 'MOMENTO 06',
    title: 'Mi paz eres tú',
    message:
      'Hay momentos de paz que solo encuentro a tu lado. Gracias por ser mi refugio y mi alegría más grande.',
    photo: `${base}fotos/photo-06.jpg`,
  },
  {
    id: 7,
    date: 'MOMENTO 07',
    title: 'Cerca, sin importar la distancia',
    message:
      'Aunque no siempre estemos en el mismo lugar, cada mensaje y cada llamada me recuerdan que mi corazón está contigo. La distancia solo hace más fuerte lo que sentimos.',
    photo: `${base}fotos/photo-07.jpg`,
  },
  {
    id: 8,
    date: 'MOMENTO 08',
    title: 'La complicidad de nuestras selfies',
    message:
      'No importa el lugar ni la hora, una selfie juntos siempre captura nuestra conexión y la suerte que tengo de tenerte.',
    photo: `${base}fotos/photo-08.jpg`,
  },
  {
    id: 9,
    date: 'MOMENTO 09',
    title: 'Todo lo que aprendo de ti',
    message:
      'Me enseñas a ver el mundo con más calma y a valorar cada instante. Contigo aprendo a ser mi mejor versión cada día.',
    photo: `${base}fotos/photo-09.jpg`,
  },
  {
    id: 10,
    date: 'MOMENTO 10',
    title: 'Nuestro camino juntos apenas comienza',
    message:
      'Esta es solo una página de nuestra historia. Estoy emocionado por todo lo que nos espera y por cada momento que seguiremos creando.',
    photo: `${base}fotos/photo-10.jpg`,
  },
]