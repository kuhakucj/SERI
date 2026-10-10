# SERI

A sound-reactive 3D forest journey inspired by Malay architecture and solarpunk futures.

## Experience

An endless road, branching trees, feathered palms, woven lanterns, mossy arches, and interactive gardens. Includes a lyric-free synthesized soundscape, microphone input, local audio uploads, and day/dusk lighting.

## Run locally

Serve `dist` with a static web server, for example `python3 -m http.server 8000 --directory dist`, then open http://localhost:8000. Microphone access requires localhost or HTTPS.

## Publish

The GitHub Actions workflow publishes `dist` on pushes to `main`. In repository Settings → Pages, select GitHub Actions as the source if Pages is not enabled automatically.

Audio remains in the browser. The world and soundtrack are original speculative interpretations, not a reconstruction or a traditional gamelan recording.

Three.js is bundled under its MIT license (see THIRD_PARTY_LICENSES.txt). Google Fonts are loaded externally with system-font fallbacks.
