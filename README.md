# Tauri + htmx Test

Very basic attempt at intercepting htmx network requests and instead invoking tauri commands.

Saw people suggesting spinning up a whole http server on the rust side to offer an endpoint for htmx to interact with, but that seemed like a cludgy solution.

See the `src/main.ts` file for the whopping 25 lines needed to get this to work (4 of them for a useless type definition).

Using the [@mswjs/interceptors](https://github.com/mswjs/interceptors) library and entirely relying on javascript's single threaded operation.
