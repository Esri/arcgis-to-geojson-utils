# arcgis-to-geojson-utils

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/arcgis-to-geojson-utils.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/arcgis-to-geojson-utils
[travis-image]: https://img.shields.io/travis/Esri/arcgis-to-geojson-utils/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/Esri/arcgis-to-geojson-utils
[standard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/semistandard

Tools to convert ArcGIS JSON geometries to GeoJSON geometries and vice versa.

## Install

```
npm install @esri/arcgis-to-geojson-utils
```

## Usage

```js
var arcgisToGeoJSON = require('@esri/arcgis-to-geojson-utils').arcgisToGeoJSON;
var geojsonToArcGIS = require('@esri/arcgis-to-geojson-utils').geojsonToArcGIS;

// parse ArcGIS JSON, convert it to GeoJSON
var geojson = arcgisToGeoJSON({
    "x":-122.6764,
    "y":45.5165,
    "spatialReference": {
      "wkid": 4326
    }
  });

// take GeoJSON and convert it to ArcGIS JSON
var arcgis = geojsonToArcGIS({
  "type": "Point",
  "coordinates": [45.5165, -122.6764]
});
```

```js
// this way works too
var esriUtils = require('@esri/arcgis-to-geojson-utils');

esriUtils.geojsonToArcGIS(/* ... */);
esriUtils.arcgisToGeoJSON(/* ... */);
```

This package is distributed as a [UMD]() module and can also be used in AMD based systems or as a global under the `ArcgisToGeojsonUtils` namespace.


Thanks to [@JeffJacobson](https://github.com/JeffJacobson), TypeScript typings and tests can be found on [npm](https://www.npmjs.com/package/@types/arcgis-to-geojson-utils).

We recommend using `--moduleResolution Node` to ensure the compiler recognizes the types.

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
