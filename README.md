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

## Optional pages

`philosophy.html` and `bitbros.html` are still in the repo but not linked in the nav. Keep, edit, or remove as you like.
