import { career, skills } from '../data';
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

        <!-- Tech stack como tags -->
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