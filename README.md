# vMenu Custom Themes

Adds your own themes to [vMenu Enhanced](https://github.com/TomGrobbe/vMenu) without touching vMenu itself. You write a stylesheet, name it in a JSON file, and vMenu offers it alongside its own themes.

There is no code to write and nothing to build. It is a plain JavaScript resource, so you edit the files and restart the resource.

## Installing it

1. Copy this folder into your server's `resources`.
2. Add `ensure vMenu.CustomThemesPlugin` to your server config, anywhere near where you start vMenu. The order does not matter, the two find each other.
3. Start the server. The Red Dead theme this ships with shows up in vMenu.

Players pick a theme with the [Theme Picker plugin](https://github.com/TomGrobbe/vMenu.ThemePicker), or you can make one the default for everybody with the vMenu setting:

```ini
setr vMenu.Enhanced.MenuAppearance.Skin "reddead"
```

## Adding a theme

**Step one, write the stylesheet.** Copy `themes/red-dead.css` to `themes/my-theme.css` and change the colours. A theme is a list of CSS variables, nothing more, and the file is grouped with a short comment above each part of the menu. Leave the `@font-face` block at the top alone unless you know what you are doing, that is what keeps the little arrows on list rows looking like the game's own.

**Step two, name it in `themes.json`:**

```json
{
  "themes": [
    {
      "id": "reddead",
      "name": "Red Dead",
      "css": "themes/red-dead.css",
      "banner": "default"
    },
    {
      "id": "mytheme",
      "name": "My Theme",
      "css": "themes/my-theme.css",
      "banner": "dark"
    }
  ]
}
```

- **id** is the short name the theme is known by, the one you would put in the `Skin` setting. Letters, digits, dashes, underscores and dots, and it cannot be one of vMenu's own names (`default`, `dark`, `cartoon`, `gta`).
- **name** is what players read in the menu. Leave it out and the id is used.
- **css** is the path to your stylesheet inside this resource.
- **banner** is the picture across the top of the menu. Pick `default`, `dark`, `cartoon`, or `none` for the plain Grand Theft Auto one. Leave it out and you get `default`.

**Step three, restart the resource**, with `restart vMenu.CustomThemesPlugin` in the server console. Your theme is there.

One catch while you are working on a stylesheet: the game caches CSS files it has already downloaded, so a colour you just changed may not show up on a restart. Fully restarting your game client is the reliable way to see the newest version of a stylesheet.

## Where the files have to live

Every file a theme uses has to be listed in `fxmanifest.lua`, under `files`. Stylesheets in the `themes` folder are already covered by the `themes/*.css` line, so you only need to add lines for things somewhere else, an image or a font of your own for example.

Fonts and pictures are loaded relative to the stylesheet that asks for them, so a file next to your CSS is simply `url("my-font.woff2")`. To reach something in another resource, spell it out in full as `https://cfx-nui-<resource name>/<path>`, which is exactly what the `@font-face` block at the top of the example does to borrow a font from vMenu.

## What can go wrong

Everything this resource does is written to your client console, which you open with F8. If a theme does not turn up, look there first. It says when `themes.json` cannot be read, when it is not valid JSON, and it repeats whatever vMenu said about a theme it refused, an id that is already taken for instance.

## How it works, in one paragraph

vMenu lets any resource register themes over an event. This resource reads `themes.json` on start, tells vMenu about every theme in it, and hands over the address of each stylesheet inside this resource. vMenu's menu page then loads it straight from here, the way the old GTA Online chat theme used to work for the chat resource. Nothing is copied into vMenu, and when this resource stops its themes disappear with it.

## License

GPL-3.0-or-later, the same license vMenu Enhanced uses.
