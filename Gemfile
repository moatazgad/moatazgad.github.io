source "https://rubygems.org"

# GitHub Pages' native gem — locks Jekyll + plugin versions to whatever
# GitHub Pages currently runs in production, so no custom CI/build step
# is required to deploy this site.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows/JRuby support (harmless on other platforms)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb for old Jekyll versions on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
