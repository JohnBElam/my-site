# Run the Jekyll site locally using Docker (no Ruby needed).
# Requires: Docker Desktop installed and running.
# Then open http://localhost:4000

$ErrorActionPreference = "Stop"
$siteDir = $PSScriptRoot

# Check Docker
try {
    $null = docker info 2>&1
} catch {
    Write-Host "Docker is not running or not installed." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run this site locally you can:" -ForegroundColor Cyan
    Write-Host "  1. Install Docker Desktop from https://www.docker.com/products/docker-desktop and run this script again."
    Write-Host "  2. Or install Ruby from https://rubyinstaller.org/ (use the default options), then in this folder run:"
    Write-Host "     bundle install"
    Write-Host "     bundle exec jekyll serve"
    Write-Host ""
    exit 1
}

Write-Host "Starting Jekyll with Docker (this may take a moment on first run)..." -ForegroundColor Cyan
Write-Host "Site will be at: http://localhost:4000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""

docker run --rm -t `
  -v "${siteDir}:/srv/jekyll" `
  -p 4000:4000 `
  -e JEKYLL_ENV=development `
  jekyll/jekyll:4.2.2 `
  jekyll serve --livereload --force_polling --host 0.0.0.0
