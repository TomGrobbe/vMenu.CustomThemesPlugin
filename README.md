# vMenu Custom Themes

Adds your own themes to [vMenu Enhanced](https://github.com/TomGrobbe/vMenu) without touching vMenu itself. Nothing to build, no code to write.

## Installing

1. Copy this folder into your server's `resources`.
2. Add `ensure vMenu.CustomThemesPlugin` to your server config.
3. Restart the server. The Red Dead theme it comes with shows up in vMenu.

Players pick a theme with the [Theme Picker plugin](https://github.com/TomGrobbe/vMenu.ThemePicker), or you can set one for everybody:

```ini
setr vMenu.Enhanced.MenuAppearance.Skin "reddead"
```

## Adding a theme

1. Copy `themes/red-dead.css` to `themes/my-theme.css` and change the colours. Leave the `@font-face` block at the top alone, that is what keeps the little arrows on list rows looking like the game's own.
2. Add it to `themes.json`:

```json
{
  "themes": [
    { "id": "reddead", "name": "Red Dead", "css": "themes/red-dead.css", "banner": "banners/red-dead.png" },
    { "id": "mytheme", "name": "My Theme", "css": "themes/my-theme.css", "banner": "dark" }
  ]
}
```

- **id** is the short name the theme is known by, the one the `Skin` setting takes. It cannot be one of vMenu's own names: `default`, `gold`, `green`, `red`, `dark`, `cartoon` or `gta`. Their other spellings are taken too, like `vmenu`, `vmenu-gold`, `none` and `vanilla`.
- **name** is what players read. Leave it out and the id is used.
- **css** is the path to your stylesheet in this resource. Anything outside the `themes` folder needs its own line under `files` in `fxmanifest.lua`.
- **banner** is the picture on top of the menu: `default`, `gold`, `green`, `red`, `dark`, `cartoon`, `none` for the plain GTA one, or your own image, `banners/my-banner.png` for instance. Roughly 1000x220 keeps it sharp, and it needs its own line under `files` in `fxmanifest.lua`.

3. Run `restart vMenu.CustomThemesPlugin` in the server console.

Every colour you can set is listed in the [MenuAPI theming docs](https://docs.vespura.com/menuapi/fivem/reference/theming/), which is the menu library vMenu draws with.

A theme can also style the button hints in the bottom right of the screen, the bar that tells players which key does what. Those settings go in a `#menuapi-buttons` block instead of `#menuapi`, the bottom of `themes/red-dead.css` has an example. Leave the block out and the hints keep the look of the game itself. Unlike the menu, the hints can also be resized and spaced out differently, see the [instructional buttons section](https://docs.vespura.com/menuapi/fivem/reference/theming/#instructional-buttons) of the MenuAPI docs.

Two things worth knowing. Your game caches stylesheets it has already downloaded, so restart your game client if a colour you changed does not show up. And anything that went wrong is written to your client console, which you open with F8.

## License

GPL-3.0-or-later, the same license vMenu Enhanced uses.
