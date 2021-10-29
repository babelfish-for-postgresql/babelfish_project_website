##
# From _plugins/link-checker.rb
#
# `JEKYLL_CHECK_EXTERNAL_LINKS`, set on the environment, will cause verification of external links, irrespective of its
# value. Usage: `JEKYLL_CHECK_EXTERNAL_LINKS= bundle exec jekyll build --trace`
#
# `JEKYLL_FATAL_LINK_CHECKER`, set on the environment, will cause the build to fail if an internal dead link is found.
# If set as `JEKYLL_FATAL_LINK_CHECKER=2`, the build will fail for internal and external dead links; in this case, there
# is no need to set `JEKYLL_CHECK_EXTERNAL_LINKS`.

JEKYLL_FATAL_LINK_CHECKER= bundle exec jekyll build --trace