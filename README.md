# Personal Website

Jekyll site for GitHub Pages. Inspired by [Adam DeJans](https://www.adamdejans.com/): multi-faceted personal site with Bit Bros, books, blog (on-site + elsewhere), and Decision Systems Philosophy.

## Try it on GitHub Pages (no local setup)

No Ruby, no Docker. Push the site and let GitHub build and host it.

1. **Create a new repo** on GitHub (e.g. `yourusername.github.io` for a user site, or any name like `my-site` for a project site).
2. **Push this folder** into that repo — all contents of `personal-website/`, with those files at the **root** of the repo.
3. **Turn on Pages**: repo **Settings → Pages** → Source = **Deploy from a branch** → Branch = `main` → Folder = **/ (root)** → Save.
4. Wait 1–2 minutes. Your site will be at:
   - **User/org site:** `https://yourusername.github.io`
   - **Project site:** `https://yourusername.github.io/repo-name/`

If you use a project repo (e.g. `my-site`), set `baseurl: "/repo-name"` in `_config.yml` so assets and links work. For `yourusername.github.io` leave `baseurl: ""`.

---

*Optional — run locally:* Docker: `.\run-local.ps1`. Or Ruby: [RubyInstaller](https://rubyinstaller.org/) then `bundle install` and `bundle exec jekyll serve`. Open http://localhost:4000.

## Custom domain (Squarespace)

1. Buy your domain on Squarespace.
2. In this repo, edit `CNAME` and set it to your domain (e.g. `www.yourname.com`).
3. In Squarespace DNS:
   - Add **CNAME** for `www` → `yourusername.github.io`
   - For apex (root domain), add **A records** to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. In GitHub repo **Settings → Pages**, ensure "Enforce HTTPS" is checked after DNS propagates.

## Content

- **Site title/description**: Edit `_config.yml` (`title`, `description`, `url`).
- **Books**: Edit `_data/books.yml` (title, one_liner, cover path, url, year). Add cover images under `assets/images/books/`.
- **External blog links**: Edit `_data/external_links.yml`.
- **On-site posts**: Add files in `_posts/` with name `YYYY-MM-DD-slug.md` and front matter (`layout: post`, `title`, `date`, `excerpt`, optional `philosophy: true`).
- **Philosophy**: Edit `philosophy.html` and add posts with `philosophy: true` to list them there.

## License

Private/personal use. Replace placeholder copy and links with your own.
