# Earth texture provenance

The local textures are optimized derivatives of official NASA satellite imagery. They are loaded from this repository only; the hero makes no runtime request to NASA or another remote source.

## `earth-day.webp`

- Source: [Blue Marble: Next Generation](https://svs.gsfc.nasa.gov/3615/)
- Original image: [March global composite, 8192 × 4096](https://svs.gsfc.nasa.gov/vis/a000000/a003600/a003615/flat_earth_Largest_still.0330.jpg)
- Credit: NASA/Goddard Space Flight Center Scientific Visualization Studio. Blue Marble Next Generation data courtesy Reto Stöckli, NASA/GSFC, and NASA Earth Observatory.
- Local processing: resized to 4096 × 2048, stripped of metadata, and WebP-compressed. Scene lighting and the existing site palette provide the blue treatment at render time.

## `earth-night-lights.webp`

- Source: [Earth at Night](https://svs.gsfc.nasa.gov/30003/)
- Original image: [DMSP 4096 × 2048 global composite](https://svs.gsfc.nasa.gov/vis/a030000/a030000/a030003/dmsp_4096.png)
- Credit: NASA/Goddard Space Flight Center.
- Local processing: converted to a high-contrast grayscale light mask, stripped of metadata, and WebP-compressed at 4096 × 2048. The Three.js shader colors the emitted lights with the site’s sky-blue and cool-white palette.

## `earth-night.webp`

- Source: [Earth at Night: Flat Maps](https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/)
- Original image: [2016 Black Marble color composite, 13,500 × 6,750](https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/144000/144898/BlackMarble_2016_3km.jpg)
- Credit: NASA Earth Observatory images by Joshua Stevens, using Suomi NPP VIIRS data from Miguel Román, NASA Goddard Space Flight Center.
- Local processing: resized to 4096 × 2048 without changing the 2:1 equirectangular projection, converted to the site's navy and ice-blue palette, lightly sharpened, stripped of metadata, and WebP-compressed.
- Purpose: compatibility texture for the rotating globe on devices whose GPUs do not support an 8192-pixel texture.

## `earth-night-8k.webp`

- Source and credit: the same 2016 Black Marble composite documented for `earth-night.webp`.
- Local processing: resized to 8192 × 4096 without changing the 2:1 equirectangular projection, converted to the site's navy and ice-blue palette, lightly sharpened, stripped of metadata, and WebP-compressed.
- Purpose: high-detail surface used by the rotating globe when the browser reports support for 8192-pixel textures.

## `earth-night-fallback.webp`

- Source: [City Lights of Africa, Europe, and the Middle East](https://science.nasa.gov/earth/earth-observatory/city-lights-of-africa-europe-and-the-middle-east-79793/)
- Original image: [8192 × 8192 global view](https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79793/city_lights_africa_8k.jpg)
- Credit: NASA Earth Observatory image by Robert Simmon, using Suomi NPP VIIRS data provided by Chris Elvidge (NOAA National Geophysical Data Center).
- Local processing: tightly cropped around the photographed globe, resized to 4096 × 4096, converted to the site's navy and ice-blue palette, lightly sharpened, stripped of metadata, and WebP-compressed.
- Purpose: undistorted spherical fallback for reduced-motion, texture-load, and WebGL failures.

Use follows the [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/). Nothing in this project implies NASA endorsement.

The user-supplied screenshots were visual references only. No pixels, branding, copy, or markup from them are included in these assets.
