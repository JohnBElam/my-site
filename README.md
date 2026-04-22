# John Brandon Elam — Personal Site

Jekyll site for GitHub Pages. Decision systems, *The Decision Factory*, Bit Bros, and writing (Decision Systems + Gaming Is Good).

## Test (build)

**CI:** Push to `main` or `master` — the [Jekyll build workflow](.github/workflows/jekyll-build.yml) runs `bundle exec jekyll build` (same command as below without `--safe`).

**Local:** You need Ruby 3.2+ (system Ruby on macOS is often 2.6; use [rbenv](https://github.com/rbenv/rbenv) or [RubyInstaller](https://rubyinstaller.org/)).

```bash
bundle install
bundle exec jekyll build
# Stricter local check (disables custom plugins):
bundle exec jekyll build --safe
# Or serve with live reload:
bundle exec jekyll serve --livereload
```

Open http://localhost:4000. This repo uses a **user or custom domain** setup: `baseurl: ""` in `_config.yml` (see [Deploy](#deploy-to-github-pages)). If you instead host as a **GitHub project site** with `baseurl: "/my-repo-name"`, use http://localhost:4000/my-repo-name/ when serving locally.

## Deploy to GitHub Pages

**Current setup (this repo):** `_config.yml` sets `url: "https://johnbelam.com"` and `baseurl: ""` for the custom domain [johnbelam.com](https://johnbelam.com). In GitHub: **Settings → Pages** → deploy from branch `main` (root) or your chosen workflow; add the custom domain there if you use one.

**Project site alternative:** If the site lives at `https://<user>.github.io/<repo>/`, set `baseurl: "/<repo>"` in `_config.yml` and use that same path when opening the local server URL.

## Contact form (no exposed email)

The contact section uses [Formspree](https://formspree.io): visitors submit the form, Formspree emails you. Your email never appears on the site.

1. Sign up at [formspree.io](https://formspree.io) and create a form (they’ll email you the submissions).
2. Copy your form ID from the form’s endpoint (e.g. `https://formspree.io/f/xyzabc` → ID is `xyzabc`).
3. In `_config.yml`, set `formspree_id: "xyzabc"` (replace with your ID).

Until you set `formspree_id`, the site shows a short note telling you to add it.

## Content

- **Site title / tagline:** `_config.yml` → `title`, `description`.
- **Books:** `_data/books.yml`. *The Decision Factory* is the main spotlight; add other Bit Bros books there or on `books.html`.
- **Writing elsewhere (Medium):** `_data/external_links.yml` — add your Decision Systems and Gaming Is Good article titles and URLs.
- **On-site blog:** Add markdown files in `_posts/` with front matter (`layout: post`, `title`, `date`, `excerpt`).
- **Decision Gospel (mini-site):** HTML under `decision-gospel/`; permalinks are set in `_config.yml` defaults. Old `/scripture/...` URLs are no longer published here; restore host-level redirects if you still need them.
- **Gaming Is Good (mini-site):** HTML under `gaming-is-good/`; same permalink pattern as Decision Gospel via `_config.yml`.
- **Life Objective Function (mini-site):** Standalone HTML under `life-objective-function/` (`index.html` is "The Formula", `life-decays.html` is "The Decay Curves"); permalink set in `_config.yml` defaults; linked from the main header as **The Formula**.

## Optional pages

`philosophy.html` and `bitbros.html` are still in the repo but not linked in the nav. Keep, edit, or remove as you like.

`gaming_is_good_site_mockup.html` at the repo root is a **legacy redirect stub** that points old bookmarks to `/gaming-is-good/`. Nothing in the repo links to it; it exists as a safety net for previously shared URLs.

## Project structure

Most of the site is Jekyll-managed and uses shared layouts/includes. The two mini-sites are standalone HTML subtrees that only share Google Analytics.

```
_config.yml                 # Jekyll config + per-mini-site permalinks + excludes
_layouts/
  default.html              # Header + footer shell used by main-site pages
  post.html                 # Wraps posts, extends default.html
  decision-gospel.html      # Shell for decision-gospel/*.html (shared head + nav)
_includes/
  header.html               # Main-site top nav (hamburger → X on mobile)
  footer.html               # Main-site footer
  google-analytics.html     # gtag snippet (included from every page's <head>)
  decision-gospel/
    nav.html                # Sticky 15-link Decision Gospel nav
  ...                       # book_card, contact_form, appearances_marquee, etc.
_data/                      # YAML content (books, testimonials, appearances, external_links)
_posts/                     # Blog posts (layout: post → default)
assets/
  css/style.css             # Main-site stylesheet (used via default.html)
  css/decision-gospel.css   # Shared styles for all decision-gospel/*.html pages
  js/main.js                # Site-wide JS (mobile nav, marquee, carousel, typing, reveal)
decision-gospel/            # Mini-site: uses layout: decision-gospel
gaming-is-good/             # Mini-site: standalone HTML + gg-shared.css + gg-data.js
life-objective-function/    # Mini-site: standalone HTML, self-contained styles + sub-nav
index.html, bitbros.html,   # Main-site pages (layout: default)
  blog.html, books.html,
  philosophy.html
```

**Layout chain:** `_posts/*.md` → `_layouts/post.html` → `_layouts/default.html`; main-site HTML pages use `layout: default` directly; `decision-gospel/*.html` uses `layout: decision-gospel`.

**Mini-site conventions:** `decision-gospel/` shares a Jekyll layout and stylesheet; per-page `<style>` blocks only hold rules unique to that page (e.g. the pyramid diagram in `practitioner.html`, the horsemen palette in `four-horsemen.html`). `gaming-is-good/` has not been migrated to a shared layout and still uses per-page inline styles plus `gg-shared.css` and `gg-data.js`.

## Serving locally

| Command | When to use it |
| --- | --- |
| `bundle exec jekyll serve --livereload` | Canonical. Works anywhere Ruby + Bundler are installed. |
| `./serve.sh` | macOS convenience wrapper that puts Homebrew Ruby on `PATH` before calling `jekyll serve --baseurl ''`. |
| `./run-local.ps1` | Windows/Docker path; runs `jekyll/jekyll:4.2.2` in a container with live reload. |

Both wrapper scripts are excluded from the built site via `_config.yml`.

