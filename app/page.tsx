"use client";

import Image from "next/image";
import { useEffect } from "react";

const projects = [
  {
    title: "ALTAL",
    meta: "BRANDING · 2025",
    description: "술을 잘 못하는 사람들이 사회적 교류를 하기 위한 목테일 브랜드",
    image: "/projects/altal/cover.jpg",
    alt: "ALTAL 목테일 브랜드의 다채로운 잔을 함께 들고 있는 사람들",
    className: "altal",
  },
  {
    title: "이로도리",
    meta: "DETAILS TO COME",
    description: null,
    image: "/projects/irodori/cover.jpg",
    alt: "초록색 자연 모티프와 일본어, Irodori 영문 로고로 구성된 그래픽",
    className: "irodori",
  },
  {
    title: "BŌRN",
    meta: "DETAILS TO COME",
    description: null,
    image: "/projects/born/cover.jpg",
    alt: "붉은 오브제와 인물 사진이 반복되는 BŌRN 옥외 브랜드 이미지",
    className: "born",
  },
  {
    title: "사와야",
    meta: "DETAILS TO COME",
    description: null,
    image: "/projects/sawaya/cover.jpg",
    alt: "색상 단계별 캐릭터와 튜브 패키지로 구성된 SAWAYA 브랜드 이미지",
    className: "sawaya",
  },
  {
    title: "아르브뤼",
    meta: "DETAILS TO COME",
    description: null,
    image: "/projects/art-brut/cover.jpg",
    alt: "파랑, 분홍, 빨강, 초록, 주황색으로 변주된 아르브뤼 심볼",
    className: "art-brut",
  },
  {
    title: "꽃편지체",
    meta: "DETAILS TO COME",
    description: null,
    image: "/projects/flower-lettering/cover.jpg",
    alt: "세로쓰기 한글과 수상 정보가 담긴 꽃편지체 타이포그래피 포스터",
    className: "flower-lettering",
  },
] as const;

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = Math.floor(window.scrollY);
      root.style.setProperty("--scroll", `${scrollY}px`);
      root.style.setProperty(
        "--footer-opacity",
        `${Math.max(0, Math.min(1, (scrollY - 7900) / 100))}`,
      );
      root.style.setProperty(
        "--mobile-project-height",
        `${Math.min(640, Math.floor(window.innerHeight * 0.85))}px`,
      );

      document.querySelectorAll<HTMLElement>(".project").forEach((project, index) => {
        const fadeStart = 2800 + index * 1000;
        project.style.setProperty(
          "--project-opacity",
          `${Math.max(0, Math.min(1, (fadeStart - scrollY) / 100))}`,
        );
      });
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div id="portfolio-top" className="portfolio-shell">
      <header className="site-header">
        <h2>Portfolio of</h2>
        <h1>Minjoon Choi</h1>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="projects" aria-label="Selected portfolio projects">
        {projects.map((project, index) => (
          <article
            className={`project ${project.className}`}
            key={project.title}
            style={{
              "--project-index": index,
              "--project-depth": `${2500 + index * 1000}px`,
            } as React.CSSProperties}
          >
            <span className="project-title">{project.title}</span>
            <span className="project-author">Minjoon Choi</span>

            <div className="project-description">
              <figure>
                <Image
                  alt={project.alt}
                  height={1200}
                  priority={index === 0}
                  sizes="(max-width: 800px) 76vw, 640px"
                  src={project.image}
                  width={1200}
                />
                <figcaption>
                  <span>{project.meta}</span>
                  {project.description && <span>{project.description}</span>}
                </figcaption>
              </figure>
            </div>
          </article>
        ))}
      </main>

      <footer id="about" className="site-footer">
        <h2>Portfolio of</h2>
        <h1>Minjoon Choi</h1>
        <nav aria-label="Footer navigation">
          <a href="#projects">Projects</a>
          <a href="#portfolio-top">Top</a>
        </nav>
      </footer>
    </div>
  );
}
