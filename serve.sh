#!/usr/bin/env bash
# Use Homebrew Ruby and run Jekyll (avoids system Ruby 2.6 / bundler mismatch)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
cd "$(dirname "$0")"
bundle exec jekyll serve --livereload
