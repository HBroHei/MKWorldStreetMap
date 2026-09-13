# Mario Kart World Interactive Street Map

Discover unseen areas and shortcuts with this feature-rich Mario Kart World Web Map, with 99% of roads recorded, multiple Point of Interests filled with details, and a fully-functional routing function!

Map is at https://hbrohei.github.io/MKWorldStreetMap/

## The Launch!

The Project was started in October 2025 to add some missing roads on the [original map by MrL314](https://github.com/MrL314/MKW-RoadMap) (Big thank you for serving as the base for this map!). After almost a year, it has become a full web map application and is ready to be released to the public!

## Project Aim

Besides simulating what "Google Maps" may looks like in the Mario Kart World environment, this map also intends to make routing around the game world and shortcuts easier.

## Features
* Full map of Mario Kart World, including road types and routes, structures, biomes, land, sea and rivers.
* Searchable Structures with detailed descriptions.
* All Yoshi's Drive Through locations.
* Routing function for navigating through the world on solid roads.

## Planned Features
* Contour Line / Heightmap - Hard to digitalise due to limited available resources.
* Information on all routes (intermissions) and rallies. (The path it takes, item boxes, etc.)
* Description to existing Place of Interests without a description. (Note that some places will intentionally lack image / description for in-game lore reason)
* Street View (and eventually web-based GeoGuessr-like game - but this is in low priority) (Will be limited for online version for copyright reason; but have customisable offline / self-hosted version)

## Running the dev server
* The following NPM packages are required: (They can be installed by running `npm install` most of the time.)
  * Vite
  * OpenLayers - `npm install ol`
  * GeoJSON Path Finder - `npm install --save geojson-path-finder`
* Once installed, run the command `npm run dev` (or `npm run devhost` to expose it to other devices in the LAN).
* Access the website at the URL indicated in the console.

## Credits
See [CREDITS.md](CREDITS.md).
