document.getElementById("year").textContent = new Date().getFullYear();

// Use `liveUrl` for hosted websites or systems.
// Use `screenshotUrl` and `repoUrl` for systems that are still in progress.
const projectGroups = [
  {
    id: "websites",
    title: "Websites",
    description: "Live brand, company, and marketing sites that can be previewed directly.",
    projects: [
      {
        title: "Temaco",
        category: "Website",
        type: "Business Website",
        description:
          "This project was developed to deliver a clean, user-focused experience with responsive design and practical functionality. Built to represent a brand professionally and convert visitors into clients.",
        tags: ["React.js", "Tailwind", "JavaScript"],
        thumbnailUrl: "img/temaco.png",
        previewUrl: "https://temaco.rw",
        liveUrl: "https://temaco.rw",
        theme: "violet",
        eyebrow: "Landing Page",
        headline: "Professional brand presence that feels sharp and trustworthy.",
        supportCopy: "Responsive layout, clear calls to action, and a polished first impression.",
      },
      {
        title: "Vivenda GC",
        category: "Website",
        type: "Company Website",
        description:
          "A polished business-facing website focused on presenting services clearly, building trust quickly, and giving potential clients a strong first impression across devices.",
        tags: ["HTML", "CSS", "JavaScript"],
        thumbnailUrl: "img/vivenda.png",

        previewUrl: "https://vivendagc.rw",
        liveUrl: "https://vivendagc.rw",
        theme: "amber",
        eyebrow: "Corporate Site",
        headline: "Professional project presentation built for clarity and credibility.",
        supportCopy: "Clear service communication, strong visual hierarchy, and responsive delivery.",
      },
      {
        title: "MEW Consulta",
        category: "Website",
        type: "Business Website",
        description:
          "A professional company website built to present services clearly, strengthen trust, and guide visitors toward contacting the business with confidence.",
        tags: ["HTML", "CSS", "JavaScript"],
        thumbnailUrl: "img/mew.png",
        previewUrl: "https://mewconsulta.com/",
        liveUrl: "https://mewconsulta.com/",
        theme: "violet",
        eyebrow: "Consulting Site",
        headline: "A clear, polished web presence designed for credibility and client trust.",
        supportCopy: "Service-led structure, responsive presentation, and a strong professional first impression.",
      },
      {
        title: "United For Change",
        category: "Website",
        type: "Organization Website",
        description:
          "An organization-focused website built to communicate mission, programs, and community impact in a clear and accessible way across devices.",
        tags: ["HTML", "CSS", "JavaScript"],
        thumbnailUrl: "img/ufc.png",
        previewUrl: "https://unitedforchange.rw/",
        liveUrl: "https://unitedforchange.rw/",
        theme: "amber",
        eyebrow: "Impact Platform",
        headline: "Mission-driven storytelling with a structure built for outreach and visibility.",
        supportCopy: "Clear communication, accessible layout, and a presentation that supports community engagement.",
      },
      {
        title: "Fido Business Group",
        category: "Website",
        type: "Business Website",
        description:
          "A business website created to present company information clearly, build credibility, and give visitors a professional path to learn about services and get in touch.",
        tags: ["React.js", "Tailwind", "JavaScript"],
        thumbnailUrl: "img/fido.png",
        previewUrl: "https://fidobusinessgroup.com",
        liveUrl: "https://fidobusinessgroup.com",
        theme: "emerald",
        eyebrow: "Business Platform",
        headline: "A professional company site designed to strengthen trust and present services clearly.",
        supportCopy: "Business-focused presentation, clean structure, and a polished experience across devices.",
      },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    description: "Web applications, dashboards, and internal tools, whether already live or still in progress.",
    projects: [
      {
        title: "Behub",
        category: "System",
        type: "Web Application",
        description:
          "A full-featured web application built around real user workflows. Emphasis on intuitive navigation, fast load times, and a structured back end that supports data integrity at scale.",
        tags: ["React.js", "Node.js", "JavaScript", "Tailwind", "Docker"],
        thumbnailUrl: "img/behub.png",
        previewUrl: "https://behub.space",
        liveUrl: "https://behub.space",
        theme: "emerald",
        eyebrow: "Workflow Tool",
        headline: "Task-driven interface designed for day-to-day product use.",
        supportCopy: "Clear information flow, speed-focused screens, and practical system architecture.",
      },
      {
        title: "In Progress System",
        category: "System",
        type: "Dashboard / Internal Tool",
        description:
          "Use this card for systems that are still under development. Add a screenshot and GitHub repository to show progress professionally even before the project is hosted.",
        tags: ["Screenshot", "GitHub", "In Progress"],
        screenshotUrl: "",
        repoUrl: "",
        theme: "slate",
        eyebrow: "Work In Progress",
        headline: "Add a product screenshot here to show the system before deployment.",
        supportCopy: "A screenshot plus a repository link is enough to present unfinished work clearly.",
      },
    ],
  },
];

const projectsGrid = document.getElementById("projects-grid");
const previewModal = document.getElementById("preview-modal");
const previewTitle = document.getElementById("preview-title");
const previewMeta = document.getElementById("preview-meta");
const previewFrame = document.getElementById("preview-frame");
const previewImage = document.getElementById("preview-image");
const previewLaunch = document.getElementById("preview-launch");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getProjectUrl(project) {
  return project.previewUrl || project.liveUrl || "";
}

function getProjectPreviewMode(project) {
  if (getProjectUrl(project)) {
    return "live";
  }

  if (project.screenshotUrl) {
    return "image";
  }

  return "none";
}

function getProjectStatus(project) {
  if (getProjectUrl(project)) {
    return "Live";
  }

  if (project.screenshotUrl) {
    return "Preview";
  }

  return "In Progress";
}

function getProjectUrlLabel(project) {
  const rawUrl = getProjectUrl(project) || project.repoUrl || project.screenshotUrl || "";

  if (!rawUrl) {
    return "add-project-link.com";
  }

  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "");
  } catch (error) {
    return rawUrl;
  }
}

function getPrimaryButtonLabel(project) {
  const previewMode = getProjectPreviewMode(project);

  if (previewMode === "live") {
    return "Live Preview";
  }

  if (previewMode === "image") {
    return "Screenshot";
  }

  return "Coming Soon";
}

function createProjectCover(project) {
  // Thumbnail takes priority over live iframe or screenshot
  if (project.thumbnailUrl) {
    return `
      <div class="card-browser__viewport card-browser__viewport--image">
        <img
          class="card-browser__image"
          src="${escapeHtml(project.thumbnailUrl)}"
          alt="${escapeHtml(project.title)} thumbnail"
          loading="lazy"
        />
      </div>
    `;
  }

  const previewMode = getProjectPreviewMode(project);
  const projectUrl = getProjectUrl(project);

  if (previewMode === "image") {
    return `
      <div class="card-browser__viewport card-browser__viewport--image">
        <img
          class="card-browser__image"
          src="${escapeHtml(project.screenshotUrl)}"
          alt="${escapeHtml(project.title)} screenshot"
          loading="lazy"
        />
      </div>
    `;
  }

  if (previewMode === "live") {
    return `
      <div class="card-browser__viewport">
        <iframe
          class="card-browser__frame"
          src="${escapeHtml(projectUrl)}"
          title=""
          loading="lazy"
          referrerpolicy="no-referrer"
          tabindex="-1"
          aria-hidden="true"
        ></iframe>
        <div class="card-browser__shade"></div>
      </div>
    `;
  }

  return `
    <div class="card-browser__fallback card-browser__fallback--${escapeHtml(project.theme)}">
      <div class="card-browser__fallback-pill">${escapeHtml(project.eyebrow)}</div>
      <h3 class="card-browser__fallback-title">${escapeHtml(project.headline)}</h3>
      <p class="card-browser__fallback-copy">${escapeHtml(project.supportCopy)}</p>
    </div>
  `;
}

function createSecondaryAction(project) {
  if (!project.repoUrl) {
    return "";
  }

  return `
    <a
      class="btn btn-ghost btn-sm"
      href="${escapeHtml(project.repoUrl)}"
      target="_blank"
      rel="noreferrer"
    >
      GitHub
    </a>
  `;
}

function renderGroup(group, groupIndex) {
  const cardsMarkup = group.projects
    .map((project, projectIndex) => {
      const tagsMarkup = project.tags
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");
      const previewMode = getProjectPreviewMode(project);
      const isPreviewable = previewMode !== "none";

      return `
        <article class="card fade-in">
          <div class="card-image">
            <div class="card-browser card-browser--${escapeHtml(project.theme)}">
              <div class="card-browser__bar">
                <div class="card-browser__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="card-browser__url">${escapeHtml(getProjectUrlLabel(project))}</div>
              </div>
              ${createProjectCover(project)}
            </div>
            <div class="card-tags">${tagsMarkup}</div>
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${escapeHtml(project.title)}</h3>
              <span class="card-status">${escapeHtml(getProjectStatus(project))}</span>
            </div>
            <p class="card-type">${escapeHtml(project.type)}</p>
            <p class="card-desc">${escapeHtml(project.description)}</p>
            <div class="card-actions">
              <button
                type="button"
                class="btn btn-outline btn-sm project-preview-btn${isPreviewable ? "" : " btn-disabled"}"
                data-group-index="${groupIndex}"
                data-project-index="${projectIndex}"
                ${isPreviewable ? "" : 'aria-disabled="true"'}
              >
                ${getPrimaryButtonLabel(project)}
              </button>
              ${createSecondaryAction(project)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="project-group fade-in">
      <div class="project-group__header">
        <p class="project-group__eyebrow">${escapeHtml(group.title)}</p>
        <h3 class="project-group__title">${escapeHtml(group.title)}</h3>
        <p class="project-group__description">${escapeHtml(group.description)}</p>
      </div>
      <div class="projects-grid">
        ${cardsMarkup}
      </div>
    </section>
  `;
}

function renderProjects() {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = projectGroups.map(renderGroup).join("");
}

function openPreview(groupIndex, projectIndex) {
  const group = projectGroups[groupIndex];
  const project = group?.projects?.[projectIndex];

  if (
    !project ||
    !previewModal ||
    !previewTitle ||
    !previewMeta ||
    !previewFrame ||
    !previewImage ||
    !previewLaunch
  ) {
    return;
  }

  const previewMode = getProjectPreviewMode(project);
  const previewSource = getProjectUrl(project);

  if (previewMode === "none") {
    return;
  }

  previewTitle.textContent = project.title;
  previewMeta.textContent = `${project.type} | ${project.tags.join(" | ")}`;

  if (previewMode === "live") {
    previewFrame.hidden = false;
    previewImage.hidden = true;
    previewFrame.src = previewSource;
    previewImage.removeAttribute("src");
  } else {
    previewFrame.hidden = true;
    previewFrame.removeAttribute("src");
    previewImage.hidden = false;
    previewImage.src = project.screenshotUrl;
    previewImage.alt = `${project.title} screenshot preview`;
  }

  if (project.liveUrl) {
    previewLaunch.textContent = "Open Site";
    previewLaunch.href = project.liveUrl;
    previewLaunch.classList.remove("btn-disabled");
    previewLaunch.hidden = false;
    previewLaunch.setAttribute("aria-disabled", "false");
  } else if (project.repoUrl) {
    previewLaunch.textContent = "Open GitHub";
    previewLaunch.href = project.repoUrl;
    previewLaunch.classList.remove("btn-disabled");
    previewLaunch.hidden = false;
    previewLaunch.setAttribute("aria-disabled", "false");
  } else {
    previewLaunch.removeAttribute("href");
    previewLaunch.classList.add("btn-disabled");
    previewLaunch.hidden = true;
    previewLaunch.setAttribute("aria-disabled", "true");
  }

  previewModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closePreview() {
  if (!previewModal || !previewFrame || !previewImage) {
    return;
  }

  previewModal.hidden = true;
  document.body.classList.remove("modal-open");
  previewFrame.removeAttribute("src");
  previewImage.removeAttribute("src");
}

renderProjects();

const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(navLinks.classList.contains("open")));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

fadeEls.forEach((element) => observer.observe(element));

const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const header = document.querySelector(".nav-header");

window.addEventListener(
  "scroll",
  () => {
    if (!header) {
      return;
    }

    if (window.scrollY > 60) {
      header.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  },
  { passive: true }
);

if (projectsGrid) {
  projectsGrid.addEventListener("click", (event) => {
    const previewButton = event.target.closest(".project-preview-btn");

    if (!previewButton) {
      return;
    }

    openPreview(Number(previewButton.dataset.groupIndex), Number(previewButton.dataset.projectIndex));
  });
}

document.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-preview")) {
    closePreview();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && previewModal && !previewModal.hidden) {
    closePreview();
  }
});
