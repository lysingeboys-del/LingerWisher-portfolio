/* Project media paths are relative to the project root. */
function createProject(id, title, category, type, src, alt, featured = false) {
  return {
    id,
    title,
    category,
    featured,
    description: "[Add a short description]",
    role: "[Add your role]",
    software: category === "animation" ? ["Blender"] : [],
    date: "[Add date]",
    process: "[Add a process note]",
    media: [{ type, src, alt }],
    links: []
  };
}

window.PORTFOLIO_PROJECTS = [
  createProject("animation-01", "Animation 01", "animation", "video", "assets/videos/animation-01.mp4", "Animation 01 video", true),
  createProject("animation-02", "Animation 02", "animation", "video", "assets/videos/animation-02.mp4", "Animation 02 video"),
  createProject("animation-03", "Animation 03", "animation", "video", "assets/videos/animation-03.mp4", "Animation 03 video"),
  createProject("animation-04", "Animation 04", "animation", "video", "assets/videos/animation-04.mp4", "Animation 04 video"),

  createProject("model-wheels", "Wheel designs", "3d-modelling", "image", "assets/models/model-wheels.webp", "Three rendered wheel designs", true),
  createProject("model-costume", "Costume model", "3d-modelling", "image", "assets/models/model-costume.webp", "A detailed blue and red costume model"),
  createProject("model-armored-character", "Armored character", "3d-modelling", "image", "assets/models/model-armored-character.webp", "A green and black armored character model"),
  createProject("model-character-study", "Character study", "3d-modelling", "image", "assets/models/model-character-study.webp", "A red block-style character render"),
  createProject("model-sports-cars", "Sports car models", "3d-modelling", "image", "assets/models/model-sports-cars.webp", "A pair of sports car models on a tiled 3D floor"),
  createProject("model-tank", "Tank model", "3d-modelling", "image", "assets/models/model-tank.webp", "A detailed tank model on a platform"),
  createProject("model-racing-lineup", "Racing car lineup", "3d-modelling", "image", "assets/models/model-racing-lineup.webp", "A lineup of colorful racing car models"),
  createProject("model-character-lineup", "Character lineup", "3d-modelling", "image", "assets/models/model-character-lineup.webp", "A lineup of block-style character models"),
  createProject("model-fantasy-blade", "Fantasy blade", "3d-modelling", "image", "assets/models/model-fantasy-blade.webp", "A dark fantasy blade with glowing details"),
  createProject("model-environment", "Room environment", "3d-modelling", "image", "assets/models/model-environment.webp", "A furnished room environment with props"),
  createProject("model-character-collection", "Character collection", "3d-modelling", "image", "assets/models/model-character-collection.webp", "A large collection of colorful characters in a water scene"),

  createProject("gui-hud", "GUI 01 / HUD", "gui-ui", "image", "assets/GUI/gui-hud.webp", "A game HUD with status indicators and toolbar", true),
  createProject("gui-skin-crates", "GUI 02 / Skin crates", "gui-ui", "image", "assets/GUI/gui-skin-crates.webp", "A game interface showing four colorful skin crates"),
  createProject("gui-color-swatches", "GUI 03 / Color swatches", "gui-ui", "image", "assets/GUI/gui-color-swatches.webp", "Six brightly colored rectangular interface buttons"),
  createProject("gui-main-menu", "GUI 04 / Main menu", "gui-ui", "image", "assets/GUI/gui-main-menu.webp", "A colorful game main menu with navigation buttons"),
  createProject("gui-rewards", "GUI 05 / Rewards", "gui-ui", "image", "assets/GUI/gui-rewards.webp", "A game rewards interface with daily reward panels"),
  createProject("gui-shop-panel", "GUI 06 / Shop panel", "gui-ui", "image", "assets/GUI/gui-shop-panel.webp", "A game shop interface with item cards and purchase buttons")
];