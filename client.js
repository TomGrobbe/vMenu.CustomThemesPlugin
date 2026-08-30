const RESOURCE = GetCurrentResourceName();

const PREFIX = "vMenu.Enhanced:Plugins";

const EVENT_PROBE = `${PREFIX}:Probe`;
const EVENT_REGISTER = `${PREFIX}:RegisterThemes`;
const EVENT_READY = `${PREFIX}:Ready`;
const EVENT_READY_FOR = `${PREFIX}:${RESOURCE}:Ready`;
const EVENT_RESULT = `${PREFIX}:${RESOURCE}:ThemesRegistered`;

function log(message) {
    console.log(`[${RESOURCE}] ${message}`);
}

function text(value) {
    return typeof value === "string" ? value.trim() : "";
}

function readThemes() {
    const raw = LoadResourceFile(RESOURCE, "themes.json");

    if (!raw) {
        log("themes.json could not be read. Is it still in the resource folder, and listed in fxmanifest.lua?");

        return [];
    }

    let parsed;

    try {
        parsed = JSON.parse(raw);
    } catch (error) {
        log(`themes.json is not valid JSON, so no themes were loaded: ${error.message}`);
        log("A comma too many or a missing quote is usually the culprit. Paste it into a JSON checker.");

        return [];
    }

    const listed = Array.isArray(parsed) ? parsed : parsed?.themes;

    if (!Array.isArray(listed)) {
        log('themes.json needs a "themes" list in it. See the README for what it should look like.');

        return [];
    }

    const themes = [];

    for (const entry of listed) {
        const id = text(entry?.id);
        const css = text(entry?.css);

        if (!id || !css) {
            log(`Skipped a theme in themes.json: every theme needs an "id" and a "css" path. ${JSON.stringify(entry)}`);

            continue;
        }

        themes.push({ id, name: text(entry?.name) || id, css, banner: text(entry?.banner) });
    }

    return themes;
}

function register() {
    const themes = readThemes();

    if (themes.length === 0) {
        log("There are no themes to hand to vMenu.");

        return;
    }

    emit(EVENT_REGISTER, JSON.stringify({ themes }));
}

on(EVENT_RESULT, (json) => {
    let result;

    try {
        result = JSON.parse(json);
    } catch {
        return;
    }

    for (const warning of result?.warnings ?? []) {
        log(`vMenu skipped a theme: ${warning}`);
    }

    for (const error of result?.errors ?? []) {
        log(`vMenu refused the themes: ${error}`);
    }

    if (result?.accepted) {
        log("Themes handed to vMenu. Pick one in the menu, or with the vMenu.Enhanced.MenuAppearance.Skin setting.");
    }
});

// vMenu says this to everybody when it starts, so the themes come back after a vMenu restart too.
on(EVENT_READY, register);
on(EVENT_READY_FOR, register);

on("onClientResourceStart", (started) => {
    if (started !== RESOURCE) {
        return;
    }

    // Both, because vMenu may have started first, in which case no Ready is coming any more.
    emit(EVENT_PROBE);
    register();
});
