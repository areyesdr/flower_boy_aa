# 🌻 Flores para ti · flower_boy_aa

Un jardín digital de **flores amarillas** el 21 de septiembre, la tradición de regalar flores amarillas a esa persona especial. Una página hecha con cariño que nunca se marchita: aquí caben todos los momentos que nos unen.

## ✨ Qué tiene

- **Hero** — La bienvenida con el nombre del 21 de septiembre y su florecita.
- **Nuestros momentos** — 10 momentos guardados en un carrusel, cada uno con su foto y su texto.
- **Galería** — Las fotos en grande con visor (modo ampliado, navegación anterior/siguiente).
- **Música** — Reproductor con `see_you_again.mp3` (descarga la canción lo estándar) y letra sincronizada por tiempos. Si no hay música cargada, una melodía suave se sintetiza con **WebAudio**.
- **Una carta** — Carta de cierre con firma "Con todo mi cariño".
- **Extras** — Pétalos flotando y flores dispersas por la página (con generación aleatoria por semilla, `seededRandom`), animaciones de scroll, letras caligráficas.

## 🛠️ Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 8](https://vite.dev/).
- CSS **Modules** por componente.
- [Motion](https://motion.dev/) para animaciones.
- [Oxlint](https://oxc.rs) para lint.
- Desplegado en **GitHub Pages** vía GitHub Actions (`pnpm build` → `dist` → `actions/deploy-pages`).

## 🚀 Desarrollo local

```bash
pnpm install
pnpm dev        # servidor local de desarrollo
pnpm build      # build de producción en dist/
pnpm lint       # oxlint
pnpm preview    # previsualizar el build
```

El build usa `base: './'` para que los assets funcionen en GitHub Pages bajo cualquier subruta.

### 🎵 Canción de fondo

Por defecto el sitio sintetiza una melodía con WebAudio. Para poner la canción real, copia `.env.example` a `.env` y define la URL del audio:

```env
VITE_MUSIC_URL=https://…/see_you_again.mp3
```

## 🌐 Despliegue

Automático: al hacer push a `main`, el workflow `.github/workflows/deploy.yml` construye y publica en GitHub Pages (solo hace falta activar **Source: GitHub Actions** en Settings → Pages del repo).

---

Hecho con cariño para ti · 21 de Septiembre 🌻