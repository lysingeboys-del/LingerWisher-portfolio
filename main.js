const projects = window.PORTFOLIO_PROJECTS || [];
const projectDialog = document.querySelector(".project-dialog");
const dialogBody = document.querySelector(".dialog-body");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function mediaMarkup(media, className = "project-media") {
  if (!media || !media.src) {
    return `<div class="${className} media-placeholder"><span class="placeholder-cross" aria-hidden="true">+</span><span>Artwork goes here</span><small>Add an image or video</small></div>`;
  }
  const src = escapeHtml(media.src);
  const alt = escapeHtml(media.alt || "Project artwork");
  if (media.type === "video") {
    return `<div class="${className}"><video controls preload="metadata" playsinline aria-label="${alt}"><source src="${src}"></video></div>`;
  }
  return `<div class="${className}"><img src="${src}" alt="${alt}" loading="lazy" /></div>`;
}

function projectCard(project, index) {
  const label = project.featured ? "Selected work" : "Project";
  return `<article class="project-card ${project.category === "gui-ui" ? "project-card-ui" : ""}">
    ${mediaMarkup(project.media && project.media[0], "project-media")}
    <button class="project-open" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="View details for ${escapeHtml(project.title)}">
      <span class="project-card-info"><span class="project-card-label">${label} / ${String(index + 1).padStart(2, "0")}</span><span class="project-card-title">${escapeHtml(project.title)}</span><span class="project-card-arrow" aria-hidden="true">↗</span></span>
    </button>
  </article>`;
}

function renderProjects() {
  const selected = document.querySelector("#selected-projects");
  selected.innerHTML = projects.filter((project) => project.featured).map(projectCard).join("");
  document.querySelectorAll("[data-project-list]").forEach((list) => {
    const matching = projects.filter((project) => project.category === list.dataset.projectList);
    list.innerHTML = matching.map(projectCard).join("");
  });
}

function detailMarkup(project) {
  const media = (project.media || []).map((item) => mediaMarkup(item, "dialog-media")).join("");
  const metadata = [
    ["Role", project.role],
    ["Software", (project.software || []).join(", ") || "[Add software]"],
    ["Date", project.date]
  ];
  return `<div class="dialog-heading"><span class="section-number">${escapeHtml(project.category.replaceAll("-", " ").toUpperCase())} / PROJECT</span><h2 id="dialog-title">${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p></div>
    <div class="dialog-gallery">${media || mediaMarkup(null, "dialog-media")}</div>
    <dl class="dialog-meta">${metadata.map(([term, detail]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail || "[Add details]")}</dd></div>`).join("")}</dl>
    <div class="dialog-process"><span class="section-number">PROCESS</span><p>${escapeHtml(project.process || "[Add a process note]")}</p></div>
    ${(project.links || []).length ? `<div class="dialog-links">${project.links.map((link) => `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} ↗</a>`).join("")}</div>` : ""}`;
}

renderProjects();

document.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-project-id]");
  if (openButton) {
    const project = projects.find((item) => item.id === openButton.dataset.projectId);
    if (project) {
      dialogBody.innerHTML = detailMarkup(project);
      projectDialog.showModal();
    }
  }
});

document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isExpanded);
});
siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const canvas = document.querySelector("#particles");
const context = canvas.getContext("2d", { alpha: true });
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let particles = [];
let frameId;
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(34, Math.floor(width / 38)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.4,
    drift: Math.random() * 0.16 + 0.025
  }));
}

function drawParticles() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(36, 48, 43, 0.2)";
  particles.forEach((particle) => {
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
    if (!reducedMotion.matches) {
      particle.y -= particle.drift;
      if (particle.y < -2) particle.y = height + 2;
    }
  });
  if (!reducedMotion.matches) frameId = requestAnimationFrame(drawParticles);
}

function restartParticles() {
  cancelAnimationFrame(frameId);
  drawParticles();
}

resizeCanvas();
restartParticles();
window.addEventListener("resize", () => { resizeCanvas(); restartParticles(); }, { passive: true });
reducedMotion.addEventListener("change", restartParticles);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(frameId);
  else restartParticles();
});