/**
 * Converts an ArcGIS geometry into a GeoJSON geometry.
 */
export function arcgisToGeoJSON<T extends ArcGis.Rest.Geometry>(arcgis: T): GeoJSON.GeometryObject;
/**
 * Converts a GeoJSON geometry into a ArcGIS geometry.
 */
export function geojsonToArcGIS(geojson: GeoJSON.GeometryObject): ArcGis.Rest.Geometry;