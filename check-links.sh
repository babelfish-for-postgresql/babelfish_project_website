# Checks for broken link in the documentation.
# Run `bundle exec jekyll serve` first.
# Uses https://github.com/stevenvachon/broken-link-checker
# I have no idea why we have to exclude the ISM section, but that's the only way I can get this to run. - ae
blc http://localhost:4000 -ro --exclude "*babelfishpg.org/*" --exclude "*github.com/babelfish-for-postgresql/babelfish_project_website/*" --exclude "*apache.org*" --exclude "https://localhost:5601/"
