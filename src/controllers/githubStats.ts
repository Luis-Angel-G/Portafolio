// src/controllers/githubStats.ts
// Fetches public GitHub stats for Luis-Angel-G + all owned orgs and injects
// them into the career screen. No token required — public API (60 req/hr per IP).

const USERNAME = 'Luis-Angel-G';

const ORGS = [
  'Base-de-Datos-1-2026',
  'Ingenieria-de-Software-1-2026',
  'Labstrong',
  'Linux-LAGA',
  'Programacion-de-Plataformas-Mobiles',
  'Sistemas-y-Tecnologias-Web-1-2026',
  'Teoria-de-Probabilidades',
];

interface GHUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GHRepo {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

// Language colors matching GitHub's linguist palette
const LANG_COLORS: Record<string, string> = {
  Java:             '#b07219',
  TypeScript:       '#3178c6',
  Kotlin:           '#7f52ff',
  JavaScript:       '#f1e05a',
  Python:           '#3572a5',
  Go:               '#00add8',
  HTML:             '#e34c26',
  CSS:              '#563d7c',
  Dart:             '#00b4ab',
  Swift:            '#f05138',
  Shell:            '#89e051',
  'C++':            '#f34b7d',
  C:                '#555555',
  Ruby:             '#701516',
};

function animateCount(el: HTMLElement, target: number, duration = 900) {
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * ease).toString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

async function fetchRepos(url: string): Promise<GHRepo[]> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json() as Promise<GHRepo[]>;
}

export async function initGithubStats(): Promise<void> {
  const container = document.querySelector<HTMLElement>('[data-github-stats]');
  if (!container) return;

  try {
    // ── Fetch user + all sources in parallel ─────────────────────────────────
    const [userRes, ...repoSources] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { cache: 'no-store' }),
      fetchRepos(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
      ...ORGS.map((org) =>
        fetchRepos(`https://api.github.com/orgs/${org}/repos?per_page=100`)
      ),
    ]);

    if (!userRes.ok) throw new Error('GitHub user API error');
    const user: GHUser = await userRes.json() as GHUser;

    // ── Merge all repos ───────────────────────────────────────────────────────
    const allRepos: GHRepo[] = (repoSources as GHRepo[][]).flat();
    const ownRepos = allRepos.filter((r) => !r.fork);

    const totalStars = ownRepos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalRepos = user.public_repos + ORGS.reduce((sum, _) => sum, 0);
    // Use actual count of fetched repos for the display (more accurate across orgs)
    const displayRepos = allRepos.length;

    // ── Language breakdown ────────────────────────────────────────────────────
    const langCount: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
    }
    const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    const totalWithLang = sortedLangs.reduce((s, [, c]) => s + c, 0);

    // ── Animate counters ──────────────────────────────────────────────────────
    const repoEl      = container.querySelector<HTMLElement>('[data-gh-repos]');
    const starsEl     = container.querySelector<HTMLElement>('[data-gh-stars]');
    const followersEl = container.querySelector<HTMLElement>('[data-gh-followers]');

    if (repoEl)      animateCount(repoEl,      displayRepos);
    if (starsEl)     animateCount(starsEl,     totalStars);
    if (followersEl) animateCount(followersEl, user.followers);

    // ── Language bars ─────────────────────────────────────────────────────────
    const barList = container.querySelector<HTMLElement>('[data-gh-langs]');
    if (barList && sortedLangs.length) {
      barList.innerHTML = sortedLangs
        .slice(0, 7)
        .map(([lang, count]) => {
          const pct   = Math.round((count / totalWithLang) * 100);
          const color = LANG_COLORS[lang] ?? '#aeb8c7';
          return `
            <div class="gh-lang-row">
              <span class="gh-lang-name">${lang}</span>
              <div class="gh-lang-bar">
                <i style="width:${pct}%;background:${color}"></i>
              </div>
              <span class="gh-lang-pct">${pct}%</span>
            </div>`;
        })
        .join('');
    }

    // ── Org count badge ───────────────────────────────────────────────────────
    const orgEl = container.querySelector<HTMLElement>('[data-gh-orgs]');
    if (orgEl) animateCount(orgEl, ORGS.length);

    container.classList.add('gh-loaded');

  } catch {
    container.classList.add('gh-error');
    const loadingEl = container.querySelector<HTMLElement>('.gh-loading');
    if (loadingEl) loadingEl.textContent = 'No se pudo cargar';
  }
}