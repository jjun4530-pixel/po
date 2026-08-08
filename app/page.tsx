"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "ALTAL",
    credit: "Branding · 2025",
    description: "술을 잘 못하는 사람들이 사회적 교류를 하기 위한 목테일 브랜드",
    image: "/projects/altal/cover.jpg",
    alt: "ALTAL 목테일 브랜드의 다채로운 잔을 함께 들고 있는 사람들",
    kind: "altal",
  },
  {
    title: "이로도리",
    image: "/projects/irodori/cover.jpg",
    alt: "초록색 자연 모티프와 일본어, Irodori 영문 로고로 구성된 그래픽",
    kind: "irodori",
  },
  {
    title: "BŌRN",
    image: "/projects/born/cover.jpg",
    alt: "붉은 오브제와 인물 사진이 반복되는 BŌRN 옥외 브랜드 이미지",
    kind: "born",
  },
  {
    title: "사와야",
    image: "/projects/sawaya/cover.jpg",
    alt: "색상 단계별 캐릭터와 튜브 패키지로 구성된 SAWAYA 브랜드 이미지",
    kind: "sawaya",
  },
  {
    title: "아르브뤼",
    image: "/projects/art-brut/cover.jpg",
    alt: "파랑, 분홍, 빨강, 초록, 주황색으로 변주된 아르브뤼 심볼",
    kind: "art-brut",
  },
  {
    title: "꽃편지체",
    image: "/projects/flower-lettering/cover.jpg",
    alt: "세로쓰기 한글과 수상 정보가 담긴 꽃편지체 타이포그래피 포스터",
    kind: "flower-lettering",
  },
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
          const phase = progress - index;
          const scale = Math.max(
            0.07,
            Math.min(9.75, 0.23 * 1.3 * 1.5 * Math.pow(1.55, phase)),
          );
          const pastOpacity =
            phase > 1.1 ? Math.max(0, 1 - (phase - 1.1) / 0.85) : 1;
          const futureOpacity =
            distance > 0 ? Math.max(0, 0.68 - distance * 0.15) : 1;
          const opacity = pastOpacity * futureOpacity;
          const stackDepth = Math.max(0, Math.min(4, distance));
          const stackX = (index % 2 === 0 ? -1 : 1) * stackDepth * 6;
          const stackY = stackDepth * 8;
          const blur = distance > 2 ? Math.min(1.5, (distance - 2) * 0.45) : 0;

          return (
            <article
              className={`project-card project-${project.kind}`}
              id={`project-${index + 1}`}
              key={project.title}
              style={{
                filter: `blur(${blur}px)`,
                opacity,
                transform: `translate(calc(-50% + ${stackX}px), calc(-50% + ${stackY}px)) scale(${scale})`,
                zIndex: projects.length - index,
              }}
            >
              <div className="project-content">
                <span className="project-title">{project.title}</span>
                <span className="project-preview">
                  {project.image ? (
                    <Image
                      alt={project.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 90vw, 860px"
                      src={project.image}
                    />
                  ) : (
                    <span>{project.title}</span>
                  )}
                </span>
                {project.credit && (
                  <span className="project-credit">{project.credit}</span>
                )}
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
