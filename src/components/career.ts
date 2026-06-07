import { skills } from '../data';
import { state } from '../state';
import { screenClass } from '../utils';

export const CareerScreen = () => `
  <section id="carrera" data-section="carrera" class="${screenClass('carrera', state.activeSection, 'career-screen')}">
    <div class="career-layout">

      <div class="career-main">

        <div class="career-header">
          <p class="eyebrow">Carrera</p>
          <h2>Mi Camino a Unreal</h2>
          <p>Formación académica, decisiones técnicas y el objetivo de crecer hacia experiencias interactivas, videojuegos y narrativa jugable.</p>
        </div>

        <!-- Timeline educativo -->
        <div class="career-timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">2022 – 2023</span>
              <h3>Bachillerato en Ciencias y Letras</h3>
              <p class="timeline-school">Colegio Nuevo Amanecer · Orientación en Computación</p>
              <p>Primera exposición formal a la programación y a los sistemas. Fue la chispa que confirmó que esto era lo mío.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot active"></div>
            <div class="timeline-content">
              <span class="timeline-year">2024 – Actualidad</span>
              <h3>Ingeniería en Ciencias de la Computación y TI</h3>
              <p class="timeline-school">Universidad del Valle de Guatemala</p>
              <p>Tercer año en curso. Sistemas Web, Bases de Datos, Algoritmos, Programación Móvil y más de 10 proyectos entregados.</p>
            </div>
          </div>

          <div class="timeline-item future">
            <div class="timeline-dot future"></div>
            <div class="timeline-content">
              <span class="timeline-year">Futuro</span>
              <h3>Unreal Engine y Narrativa Jugable</h3>
              <p class="timeline-school">Epic Games — Meta profesional</p>
              <p>Prototipos con mecánicas, historia y dirección visual propia. Largo plazo: videojuegos en Europa o Corea del Sur.</p>
            </div>
          </div>
        </div>

        <!-- Season progress -->
        <div class="season-track">
          <div class="meter"><i style="width: 65%"></i></div>
          <span>Progreso académico</span>
          <strong>3er Año — 65% completado</strong>
        </div>

        <!-- Tech stack tags -->
        <div class="lang-breakdown">
          <h3>Tech Stack</h3>
          <div class="career-tech-tags">
            <span style="border-color:rgba(179,114,25,0.5);background:rgba(179,114,25,0.12);color:#e8a84a">Java</span>
            <span style="border-color:rgba(49,120,198,0.5);background:rgba(49,120,198,0.12);color:#7eb8f7">TypeScript</span>
            <span style="border-color:rgba(127,82,255,0.5);background:rgba(127,82,255,0.12);color:#b49dff">Kotlin</span>
            <span style="border-color:rgba(241,224,90,0.5);background:rgba(241,224,90,0.12);color:#e8d84a">JavaScript</span>
            <span style="border-color:rgba(53,114,165,0.5);background:rgba(53,114,165,0.12);color:#7eb0e8">Python</span>
            <span style="border-color:rgba(0,173,216,0.5);background:rgba(0,173,216,0.12);color:#5fd8ff">Go</span>
            <span style="border-color:rgba(0,173,216,0.5);background:rgba(0,173,216,0.12);color:#5fd8ff">Neo4j</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Spring Boot</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Next.js</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Three.js</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">MySQL</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">SQL</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Jetpack Compose</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Vite</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">Bun</span>
            <span style="border-color:rgba(255,207,87,0.4);background:rgba(255,207,87,0.08);color:#ffcf57">GitHub</span>
          </div>
        </div>

        <!-- GitHub live stats -->
        <div class="gh-stats-panel" data-github-stats aria-label="Estadísticas de GitHub">
          <div class="gh-stats-header">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="18" height="18">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.82 2.78 1.3 3.46 1 .1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.62-5.48 5.9.43.38.82 1.12.82 2.26v3.35c0 .32.22.68.83.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            <span>GitHub Stats — Luis-Angel-G</span>
            <span class="gh-live-badge">LIVE</span>
          </div>

          <!-- Counters -->
          <div class="gh-counters">
            <div class="gh-counter">
              <strong data-gh-repos>—</strong>
              <small>Repos</small>
            </div>
            <div class="gh-counter">
              <strong data-gh-orgs>7</strong>
              <small>Orgs</small>
            </div>
            <div class="gh-counter">
              <strong data-gh-stars>—</strong>
              <small>Stars</small>
            </div>
            <div class="gh-counter">
              <strong data-gh-followers>—</strong>
              <small>Followers</small>
            </div>
          </div>

          <!-- Language breakdown (populated by JS) -->
          <div class="gh-langs-wrap">
            <p class="eyebrow" style="margin-bottom:0.6rem">Repos por lenguaje</p>
            <div class="gh-langs" data-gh-langs>
              <div class="gh-loading">Cargando stats…</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar resumen -->
      <aside class="career-summary">
        <div class="rank-badge" aria-label="Avatar principal">
          <img src="./assets/avatars/boltrex.png" alt="Boltrex" class="rank-avatar">
        </div>
        <p class="eyebrow">Rango actual</p>
        <h3>Boltrex</h3>
        <strong>Developer in Progress</strong>
        <div class="career-stats">
          <span><small>Universidad</small><b>UVG</b></span>
          <span><small>Año</small><b>3ro</b></span>
          <span><small>XP</small><b>15.2K</b></span>
        </div>
        <div class="career-meta">
          <div><small>Colegio</small><span>Nuevo Amanecer</span></div>
          <div><small>Bachillerato</small><span>Ciencias y Letras + Computación</span></div>
          <div><small>Meta</small><span>Epic Games / Europa / Corea</span></div>
        </div>
      </aside>

    </div>
  </section>
`;