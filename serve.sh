#!/usr/bin/env bash
# Use Homebrew Ruby and run Jekyll (avoids system Ruby 2.6 / bundler mismatch)
# --baseurl '' for local dev so blog links work. Open http://localhost:4000/
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
cd "$(dirname "$0")"
echo "→ Open http://localhost:4000/ in your browser"
bundle exec jekyll serve --baseurl ''
