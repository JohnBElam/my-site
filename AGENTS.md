# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Static Jekyll personal site (GitHub Pages). One dev server serves the main site plus mini-sites under `decision-gospel/`, `gaming-is-good/`, and `life-objective-function/`. No Node, database, or backend API.

### System prerequisites

Ruby **3.2+** must be available on the VM (`ruby3.2` on Ubuntu). CI uses Ruby 3.3; local `ruby3.2` works. Required apt packages (one-time VM setup): `ruby3.2`, `ruby3.2-dev`, `bundler`, `build-essential`, `zlib1g-dev`, `libssl-dev`, `libyaml-dev`, `libffi-dev`.

Gems install to `vendor/bundle` (gitignored). The startup update script sets `BUNDLE_PATH` via `bundle config set --local path 'vendor/bundle'` before `bundle install`.

### Running the site

See `README.md` for canonical commands:

| Task | Command |
|------|---------|
| Install gems | `bundle install` (after local path config above) |
| Build (CI parity) | `bundle exec jekyll build` |
| Dev server | `bundle exec jekyll serve --livereload --host 0.0.0.0` |
| Open locally | http://localhost:4000/ |

**URL gotcha:** Blog is at `/blog/`, not `/blog.html` (permalink from `_config.yml`).

### Lint / test

No dedicated linter or test suite. Validation is `bundle exec jekyll build` (same as `.github/workflows/jekyll-build.yml`). `bundle exec jekyll build --safe` intentionally fails here because it disables Jekyll plugins (`jekyll-seo-tag`, etc.); do not use `--safe` as a CI gate.

### Optional external deps

Formspree (contact form), Google Analytics, Google Fonts, and KaTeX/Chart.js CDNs are optional for browsing; Life Objective Function pages need network for CDN assets.
