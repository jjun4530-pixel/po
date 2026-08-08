"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "ALTAL",
    credit: "Branding · 2025",
    description: "술을 잘 못하는 사람들이 사회적 교류를 하기 위한 목테일 브랜드",
    image: "/projects/altal/cover.jpg",
    kind: "altal",
  },
  { title: "Project One", credit: "Identity / Direction", kind: "grid" },
  { title: "Project Two", credit: "Digital / Experience", kind: "type" },
  { title: "Project Three", credit: "Editorial / Archive", kind: "lines" },
  { title: "Project Four", credit: "Object / Research", kind: "circle" },
  { title: "Project Five", credit: "Campaign / Image", kind: "frame" },
];

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const step = Math.max(window.innerHeight * 0.9, 560);
      setProgress(window.scrollY / step);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const endStart = projects.length - 0.15;
  const footerOpacity = Math.max(0, Math.min(1, progress - endStart));

  return (
    <div className="portfolio" style={{ height: `${(projects.length + 1.25) * 90}vh` }}>
      <header className="site-header" aria-label="Portfolio header">
        <p className="eyebrow">portfolio, selected works</p>
        <h1>Minjoon Choi</h1>
        <nav aria-label="Primary navigation">
          <a href="#work">work</a>
          <a href="#about">about</a>
        </nav>
      </header>

      <main id="work" className="stage" aria-label="Selected portfolio projects">
        <p className="scroll-note" aria-hidden="true">scroll to explore ↓</p>
        {projects.map((project, index) => {
          const distance = index - progress;
          const scale = Math.max(0.115, Math.min(5, 0.23 * Math.pow(1.55, -distance)));
          const passed = distance < -2.15;
          const opacity = passed ? 0 : Math.max(0.16, Math.min(1, 1.25 - distance * 0.12));

          return (
            <article
              className={`project-card project-${project.kind}`}
              id={`project-${index + 1}`}
              key={project.title}
              style={{
                opacity,
                transform: `translate(-50%, -50%) scale(${scale})`,
                zIndex: projects.length - index,
              }}
            >
              <div className="project-content">
                <span className="project-title">{project.title}</span>
                <span className="project-preview" aria-hidden="true">
                  {project.image ? (
                    <Image
                      alt="ALTAL 목테일 브랜드의 다채로운 잔을 함께 들고 있는 사람들"
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 78vw, 520px"
                      src={project.image}
                    />
                  ) : (
                    <span>{project.title}</span>
                  )}
                </span>
                <span className="project-credit">{project.credit}</span>
                {project.description && (
                  <span className="project-description">{project.description}</span>
                )}
              </div>
            </article>
          );
        })}
      </main>

      <footer id="about" className="site-footer" style={{ opacity: footerOpacity }}>
        <p className="eyebrow">portfolio, selected works</p>
        <h2>Minjoon Choi</h2>
        <nav aria-label="Footer navigation">
          <a href="mailto:hello@example.com">contact</a>
          <a href="#work">top</a>
        </nav>
      </footer>
    </div>
  );
}
