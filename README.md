# Mario Kart World Interactive Street Map

Discover unseen areas and shortcuts with this feature-rich Mario Kart World Web Map, with 99% of roads recorded, multiple Point of Interests filled with details, and a fully-functional routing function!

## Project Aim

Besides simulating what "Google Maps" looks like in the Mario Kart World environment, this map also intends to make routing around the game world and shortcuts easier.

## Features
* Full map of Mario Kart World, including road types and routes, structures, biomes, land, sea and rivers.
* Searchable Structures with detailed descriptions.
* All Yoshi's Drive Through locations.
* Routing function for navigating through the world on solid roads.

## Planned Features
* Contour Line / Heightmap - Hard to digitalise due to limited resources.
* Information on all routes (intermissions) and rallies.
* Description to existing Place of Interests without a description. (Note that some places will intentionally lack image / description for in-game lore reason)

## Running the dev server
* The following NPM packages are required: (They can be installed by running `npm install` most of the time.)
  * Vite
  * OpenLayers - `npm install ol`
  * GeoJSON Path Finder - `npm install --save geojson-path-finder`
* Once installed, run the command `npm run dev` (or `npm run devhost` to expose it to other devices in the LAN).
* Access the website at the URL indicated in the console.

## Credits
See [CREDITS.md](CREDITS.md).