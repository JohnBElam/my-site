# John Brandon Elam — Personal Site

Jekyll site for GitHub Pages. Decision systems, *The Decision Factory*, Bit Bros, and writing (Decision Systems + Gaming Is Good).

## Test (build)

**CI:** Push to `main` or `master` — the [Jekyll build workflow](.github/workflows/jekyll-build.yml) runs `bundle exec jekyll build`. Check the **Actions** tab on GitHub.

**Local:** You need Ruby 3.2+ (system Ruby on macOS is often 2.6; use [rbenv](https://github.com/rbenv/rbenv) or [RubyInstaller](https://rubyinstaller.org/)).

```bash
bundle install
bundle exec jekyll build --safe
# Or serve with live reload:
bundle exec jekyll serve --livereload
```

Open http://localhost:4000 (if using `baseurl: "/my-site"`, use http://localhost:4000/my-site/).

## Deploy to GitHub Pages

1. Push this repo to GitHub (e.g. `johnbelam/my-site`).
2. **Settings → Pages** → Source = **Deploy from a branch** → Branch = `main` → Folder = **/ (root)** or **GitHub Actions** (if you add a deploy workflow).
3. Site URL: `https://johnbelam.github.io/my-site/` (project site). Set `baseurl: "/my-site"` in `_config.yml`.

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

## Optional pages

`philosophy.html` and `bitbros.html` are still in the repo but not linked in the nav. Keep, edit, or remove as you like.
