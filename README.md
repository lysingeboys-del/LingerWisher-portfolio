# Lingerwisher Portfolio

A responsive, dependency-free portfolio site for animation, 3D modelling, and GUI/UI art. It uses plain HTML, CSS, and JavaScript so it can be edited and opened without installing a toolchain.

## Run

Open `index.html` in a browser for the static page. For reliable local MP4 playback and seeking, run `powershell -ExecutionPolicy Bypass -File .\preview-server.ps1` from the project folder and open `http://127.0.0.1:4173/`. No build step, package install, or backend is required.

## Add a project

Edit `projects.js` and add an entry to `window.PORTFOLIO_PROJECTS`. Use one of these category values: `animation`, `3d-modelling`, or `gui-ui`. Set `featured: true` to include the project in Selected Work. Each project supports a description, role, software list, date, process note, media array, and links array.

Example media item:

```js
media: [
  { type: "image", src: "assets/images/my-render.jpg", alt: "Description of the render" },
  { type: "video", src: "assets/videos/my-turntable.mp4", poster: "assets/images/turntable-poster.jpg" }
]
```

The supplied media is organized into `assets/models/`, `assets/GUI/`, and `assets/videos/`. Add model renders to `assets/models/`, interface artwork to `assets/GUI/`, and animation files to `assets/videos/`. Animated GIFs can go in `assets/gifs/`. Use compressed, appropriately sized media and descriptive alt text.

## Personalize

Replace the bracketed prompts in About with your own details. Update the contact section with any additional methods you want to share. Discord is listed as `LingerWisher`; a Discord username alone does not provide a direct profile URL, so the button is not wired to a guessed account.

Project details open in an accessible dialog. The ambient particle layer is decorative, low-density, and static when reduced motion is requested. All media currently in the galleries was supplied for this portfolio; project descriptions, dates, roles, and titles should be edited to match your intended presentation.