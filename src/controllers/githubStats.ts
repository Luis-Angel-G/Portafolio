// src/controllers/githubStats.ts
// Fetches public GitHub stats for Luis-Angel-G and injects them into the
// career screen. No token required — uses the unauthenticated public API
// (60 req/hour per IP, plenty for a portfolio).

const USERNAME = 'Luis-Angel-G';

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
  Java:       '#b07219',
  TypeScript: '#3178c6',
  Kotlin:     '#7f52ff',
  JavaScript: '#f1e05a',
  Python:     '#3572a5',
  Go:         '#00add8',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
};

function setEl(selector: string, text: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (el) el.textContent = text;
}

function animateCount(el: HTMLElement, target: number, duration = 900) {
  const start = performance.now();
  const from = 0;
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(from + (target - from) * ease).toString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export async function initGithubStats(): Promise<void> {
  // Only run when the career section is in the DOM
  const container = document.querySelector<HTMLElement>('[data-github-stats]');
  if (!container) return;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { cache: 'no-store' }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, { cache: 'no-store' }),
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

    const user: GHUser = await userRes.json() as GHUser;
    const repos: GHRepo[] = await reposRes.json() as GHRepo[];

    // Compute stats
    const ownRepos   = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    // Language breakdown from own repos
    const langCount: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
    }
    const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    const totalWithLang = sortedLangs.reduce((s, [, c]) => s + c, 0);

    // ── Animate counters ─────────────────────────────────────────────────────
    const repoEl      = container.querySelector<HTMLElement>('[data-gh-repos]');
    const starsEl     = container.querySelector<HTMLElement>('[data-gh-stars]');
    const followersEl = container.querySelector<HTMLElement>('[data-gh-followers]');

    if (repoEl)      animateCount(repoEl,      user.public_repos);
    if (starsEl)     animateCount(starsEl,     totalStars);
    if (followersEl) animateCount(followersEl, user.followers);

    // ── Language bar chart ────────────────────────────────────────────────────
    const barList = container.querySelector<HTMLElement>('[data-gh-langs]');
    if (barList && sortedLangs.length) {
      barList.innerHTML = sortedLangs
        .slice(0, 6)
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

    // Mark as loaded
    container.classList.add('gh-loaded');

  } catch {
    // Silently fail — show placeholder dashes
    container.classList.add('gh-error');
  }
}