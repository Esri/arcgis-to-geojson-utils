# Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.5]

### Changed

* Maintain z value when translating from ArcGIS to GeoJSON

## [1.0.4]

### Changed

* published package in [`@esri`](https://www.npmjs.com/org/esri) namespace on npm.

### Fixed

* ensure built version of lib can be minified using `uglify-js`. #17 thanks @chidg!

## [1.0.3]

### Fixed

* ensured `/test`, the bundled `.zip` and other unnecessary files are omitted from npm release

## [1.0.2]

### Added

* `default` export

### Fixed

* pass through a `null` geometry when invalid input is encountered

## [1.0.1]

### Fixed

* first npm release

## 1.0.0
* First Release

[Unreleased]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.5...HEAD
[1.0.5]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Esri/arcgis-to-geojson-utils/compare/v1.0.0...v1.0.1
