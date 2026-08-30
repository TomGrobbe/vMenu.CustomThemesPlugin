fx_version 'cerulean'
games { 'gta5' }

name 'vMenu Custom Themes'
description 'Adds extra vMenu themes from a JSON file and your own stylesheets, no code needed.'
author 'Tom Grobbe'
url 'https://github.com/TomGrobbe/vMenu.CustomThemesPlugin'
version '1.0.0'

client_script 'client.js'

-- vMenu's menu page loads these stylesheets straight out of this resource, so every file a theme
-- uses has to be listed here. Add your own lines when you add a theme that lives somewhere else.
files {
    'themes.json',
    'themes/*.css',
    'banners/*.png',
    'fonts/*.woff2',
}
