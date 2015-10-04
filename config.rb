##
## This file is only needed for Compass/Sass integration. If you are not using
## Compass, you may safely ignore or delete this file.
##
## If you'd like to learn more about Sass and Compass, see the sass/README.txt
## file for more information.
##

# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Location of the theme's resources.
css_dir = "app/css"
sass_dir = "app/sass"
images_dir = "app/assets/images"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "app/js"

# Require any additional compass plugins installed on your system.
require 'rgbapng'
require 'toolkit'
require 'susy'
require 'sass-globbing'
require 'breakpoint'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :production) ? :compressed : :compact

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

# Conditionally enable line comments when in development mode.
line_comments = (environment == :production) ? 0 : 1

# Default to false if grid_debug is not set.
grid_debug = (environment == :production) ? false : true

# Output debugging info in development mode.
sass_options = (environment == :production) ? {} : {}

# Add the 'sass' directory itself as an import path to ease imports.
add_import_path 'app/sass'
add_import_path 'app/vendor'

# Enable source maps on non-production sites
sourcemap = (environment == :production) ? false : true
