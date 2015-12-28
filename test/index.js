import test from 'tape';
import {geojsonToArcGIS, arcgisToGeoJSON} from '../index.js';

test('should exist', function (t) {
  t.plan(2);
  t.ok(geojsonToArcGIS);
  t.ok(arcgisToGeoJSON);
});

test('should convert a GeoJSON Point to an ArcGIS Point', function (t) {
  t.plan(1);

  var input = {
    'type': 'Point',
    'coordinates': [-58.7109375, 47.4609375]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'x': -58.7109375,
    'y': 47.4609375,
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON Null Island to an ArcGIS Point', function (t) {
  t.plan(1);

  var input = {
    'type': 'Point',
    'coordinates': [0, 0]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'x': 0,
    'y': 0,
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON LineString to an ArcGIS Polyline', function (t) {
  t.plan(1);

  var input = {
    'type': 'LineString',
    'coordinates': [
      [21.4453125, -14.0625],
      [33.3984375, -20.7421875],
      [38.3203125, -24.609375]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'paths': [
      [
        [21.4453125, -14.0625],
        [33.3984375, -20.7421875],
        [38.3203125, -24.609375]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON Polygon to an ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'Polygon',
    'coordinates': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'rings': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON Polygon w/ a hole to an ArcGIS Polygon w/ 2 rings', function (t) {
  t.plan(1);

  var input = {
    'type': 'Polygon',
    'coordinates': [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0]
      ],
      [
        [100.2, 0.2],
        [100.8, 0.2],
        [100.8, 0.8],
        [100.2, 0.8],
        [100.2, 0.2]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'rings': [
      [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should strip invalid rings when converting a GeoJSON Polygon to and ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'Polygon',
    'coordinates': [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0]
      ],
      [
        [100.2, 0.2],
        [100.8, 0.2],
        [100.2, 0.2]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'rings': [
      [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should close ring when converting a GeoJSON Polygon w/ a hole to an ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'Polygon',
    'coordinates': [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0]
      ],
      [
        [100.2, 0.2],
        [100.8, 0.2],
        [100.8, 0.8],
        [100.2, 0.8]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'rings': [
      [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON MultiPoint to an ArcGIS Multipoint', function (t) {
  t.plan(1);

  var input = {
    'type': 'MultiPoint',
    'coordinates': [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'points': [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON MultiLineString to an ArcGIS Polyline', function (t) {
  t.plan(1);

  var input = {
    'type': 'MultiLineString',
    'coordinates': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75]
      ],
      [
        [21.796875, 36.5625],
        [47.8359375, 71.015625]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'paths': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75]
      ],
      [
        [21.796875, 36.5625],
        [47.8359375, 71.015625]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON MultiPolygon to an ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'MultiPolygon',
    'coordinates': [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'rings': [
      [ [102, 2], [102, 3], [103, 3], [103, 2], [102, 2] ],
      [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  });
});

test('should convert a GeoJSON MultiPolygon w/ holes to an ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'MultiPolygon',
    'coordinates': [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);
  t.deepEqual(output, {
    'spatialReference': {
      'wkid': 4326
    },
    'rings': [
      [
        [102, 2],
        [102, 3],
        [103, 3],
        [103, 2],
        [102, 2]
      ],
      [
        [100.2, 0.2],
      [100.8, 0.2],
      [100.8, 0.8],
      [100.2, 0.8],
      [100.2, 0.2] ],
      [ [100, 0],
      [100, 1],
      [101, 1],
      [101, 0],
      [100, 0] ]
    ]
  });
});

test('should close rings when converting a GeoJSON MultiPolygon w/ holes to an ArcGIS Polygon', function (t) {
  t.plan(1);

  var input = {
    'type': 'MultiPolygon',
    'coordinates': [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8] ]
      ]
    ]
  };

  var output = geojsonToArcGIS(input);
  t.deepEqual(output, {
    'spatialReference': {
      'wkid': 4326
    },
    'rings': [
      [
        [102, 2],
        [102, 3],
        [103, 3],
        [103, 2],
        [102, 2]
      ],
      [
        [100.2, 0.2],
        [100.8, 0.2],
        [100.8, 0.8],
        [100.2, 0.8],
        [100.2, 0.2]
      ],
      [
        [100, 0],
        [100, 1],
        [101, 1],
        [101, 0],
        [100, 0]
      ]
    ]
  });
});

test('should convert a GeoJSON Feature into an ArcGIS Feature', function (t) {
  t.plan(1);

  var input = {
    'type': 'Feature',
    'id': 'foo',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [41.8359375, 71.015625],
          [56.953125, 33.75],
          [21.796875, 36.5625],
          [41.8359375, 71.015625]
        ]
      ]
    },
    'properties': {
      'foo': 'bar'
    }
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'foo': 'bar',
      'OBJECTID': 'foo'
    }
  });
});

test('should convert a GeoJSON Feature into an ArcGIS Feature w/ a custom id', function (t) {
  t.plan(1);

  var input = {
    'type': 'Feature',
    'id': 'foo',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ]
    },
    'properties': {
      'foo': 'bar'
    }
  };

  var output = geojsonToArcGIS(input, 'myId');

  t.deepEqual(output, {
    'geometry': {
      'rings': [
        [
          [41.8359375, 71.015625],
          [56.953125, 33.75],
          [21.796875, 36.5625],
          [41.8359375, 71.015625]
        ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'foo': 'bar',
      'myId': 'foo'
    }
  });
});

test('should allow converting a GeoJSON Feature to an ArcGIS Feature with no properties or geometry', function (t) {
  t.plan(1);

  var input = {
    'type': 'Feature',
    'id': 'foo',
    'geometry': null,
    'properties': null
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, {
    'attributes': {
      'OBJECTID': 'foo'
    }
  });
});

test('should convert a GeoJSON FeatureCollection into an array of ArcGIS Feature JSON', function (t) {
  t.plan(1);

  var input = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [102.0, 0.5]
      },
      'properties': {
        'prop0': 'value0'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0]
        ]
      },
      'properties': {
        'prop0': 'value0'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [ [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0] ]
        ]
      },
      'properties': {
        'prop0': 'value0'
      }
    }]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, [{
    'geometry': {
      'x': 102,
      'y': 0.5,
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'prop0': 'value0'
    }
  }, {
    'geometry': {
      'paths': [
        [[102, 0],
        [103, 1],
        [104, 0],
        [105, 1]]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'prop0': 'value0'
    }
  }, {
    'geometry': {
      'rings': [
        [ [100, 0],
        [100, 1],
        [101, 1],
        [101, 0],
        [100, 0] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'prop0': 'value0'
    }
  }]);
});

test('should convert a GeoJSON GeometryCollection into an array of ArcGIS Geometries', function (t) {
  t.plan(1);

  var input = {
    'type': 'GeometryCollection',
    'geometries': [{
      'type': 'Polygon',
      'coordinates': [[[-95, 43], [-95, 50], [-90, 50], [-91, 42], [-95, 43]]]
    }, {
      'type': 'LineString',
      'coordinates': [[-89, 42], [-89, 50], [-80, 50], [-80, 42]]
    }, {
      'type': 'Point',
      'coordinates': [-94, 46]
    }]
  };

  var output = geojsonToArcGIS(input);

  t.deepEqual(output, [{
    'rings': [
      [[-95, 43],
      [-95, 50],
      [-90, 50],
      [-91, 42],
      [-95, 43]]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  }, {
    'paths': [
      [[-89, 42],
      [-89, 50],
      [-80, 50],
      [-80, 42]]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  }, {
    'x': -94,
    'y': 46,
    'spatialReference': {
      'wkid': 4326
    }
  }]);
});

test('should not modify the original GeoJSON object', function (t) {
  t.plan(1);

  var primitive = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [102.0, 0.5]
      },
      'properties': {
        'prop0': 'value0'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0]
        ]
      },
      'properties': {
        'prop0': 'value0'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [ [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0] ]
        ]
      },
      'properties': {
        'prop0': 'value0'
      }
    }]
  };

  var original = JSON.stringify(primitive);

  geojsonToArcGIS(primitive);

  t.deepEqual(original, JSON.stringify(primitive));
});

test('should parse an ArcGIS Point in a GeoJSON Point', function (t) {
  t.plan(1);

  var input = {
    'x': -66.796875,
    'y': 20.0390625,
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [-66.796875, 20.0390625]);
});

test('should parse an ArcGIS Null Island in a GeoJSON Point', function (t) {
  t.plan(1);

  var input = {
    'x': 0,
    'y': 0,
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [0, 0]);
});

test('should parse an ArcGIS Polyline in a GeoJSON LineString', function (t) {
  t.plan(1);

  var input = {
    'paths': [
      [ [6.6796875, 47.8125],
      [-65.390625, 52.3828125],
      [-52.3828125, 42.5390625] ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [6.6796875, 47.8125],
    [-65.390625, 52.3828125],
    [-52.3828125, 42.5390625]
  ]);
});

test('should parse an ArcGIS Polygon in a GeoJSON Polygon', function (t) {
  t.plan(2);

  var input = {
    'rings': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625],
      [41.8359375, 71.015625]
    ]
  ]);

  t.equal(output.type, 'Polygon');
});

test('should close rings when parsing an ArcGIS Polygon in a GeoJSON Polygon', function (t) {
  t.plan(2);

  var input = {
    'rings': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625],
      [41.8359375, 71.015625]
    ]
  ]);

  t.equal(output.type, 'Polygon');
});

test('should parse an ArcGIS Multipoint in a GeoJSON MultiPoint', function (t) {
  t.plan(1);

  var input = {
    'points': [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [41.8359375, 71.015625],
    [56.953125, 33.75],
    [21.796875, 36.5625]
  ]);
});

test('should parse an ArcGIS Polyline in a GeoJSON MultiLineString', function (t) {
  t.plan(1);

  var input = {
    'paths': [
      [
        [41.8359375, 71.015625],
        [56.953125, 33.75]
      ],
      [
        [21.796875, 36.5625],
        [41.8359375, 71.015625]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [
      [41.8359375, 71.015625],
      [56.953125, 33.75]
    ],
    [
      [21.796875, 36.5625],
      [41.8359375, 71.015625]
    ]
  ]);
});

test('should parse an ArcGIS Polygon in a GeoJSON MultiPolygon', function (t) {
  t.plan(2);

  var input = {
    'rings': [
      [
        [-122.63, 45.52],
        [-122.57, 45.53],
        [-122.52, 45.50],
        [-122.49, 45.48],
        [-122.64, 45.49],
        [-122.63, 45.52],
        [-122.63, 45.52]
      ],
      [
        [-83, 35],
        [-74, 35],
        [-74, 41],
        [-83, 41],
        [-83, 35]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);
  var expected = [
    [
      [
        [-122.63, 45.52],
        [-122.57, 45.53],
        [-122.52, 45.5],
        [-122.49, 45.48],
        [-122.64, 45.49],
        [-122.63, 45.52],
        [-122.63, 45.52]
      ]
    ],
    [
      [
        [-83, 35],
        [-83, 41],
        [-74, 41],
        [-74, 35],
        [-83, 35]
      ]
    ]
  ];

  t.deepEqual(output.coordinates, expected);
  t.equal(output.type, 'MultiPolygon');
});

test('should strip invalid rings when converting ArcGIS Polygons to GeoJSON', function (t) {
  t.plan(2);

  var input = {
    'rings': [
      [
        [-122.63, 45.52],
        [-122.57, 45.53],
        [-122.52, 45.50],
        [-122.49, 45.48],
        [-122.64, 45.49],
        [-122.63, 45.52],
        [-122.63, 45.52]
      ],
      [
        [-83, 35],
        [-74, 35],
        [-83, 35]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.coordinates, [
    [
      [-122.63, 45.52],
      [-122.57, 45.53],
      [-122.52, 45.5],
      [-122.49, 45.48],
      [-122.64, 45.49],
      [-122.63, 45.52],
      [-122.63, 45.52]
    ]
  ]);
  t.equal(output.type, 'Polygon');
});

test('should properly close rings when converting an ArcGIS Polygon in a GeoJSON MultiPolygon', function (t) {
  t.plan(2);

  var input = {
    'rings': [
      [
        [-122.63, 45.52],
        [-122.57, 45.53],
        [-122.52, 45.50],
        [-122.49, 45.48],
        [-122.64, 45.49]
      ],
      [
        [-83, 35],
        [-74, 35],
        [-74, 41],
        [-83, 41]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEquals(output.coordinates, [
    [
      [
        [-122.63, 45.52],
        [-122.57, 45.53],
        [-122.52, 45.5],
        [-122.49, 45.48],
        [-122.64, 45.49],
        [-122.63, 45.52]
      ]
    ],
    [
      [
        [-83, 35],
        [-83, 41],
        [-74, 41],
        [-74, 35],
        [-83, 35]
      ]
    ]
  ]);

  t.equal(output.type, 'MultiPolygon');
});

test('should parse an ArcGIS MultiPolygon with holes to a GeoJSON MultiPolygon', function (t) {
  t.plan(2);

  var input = {
    'type': 'Polygon',
    'rings': [
      [
        [-100.74462180954974, 39.95017165502381],
        [-94.50439384003792, 39.91647453608879],
        [-94.41650267263967, 34.89313438177965],
        [-100.78856739324887, 34.85708140996771],
        [-100.74462180954974, 39.95017165502381] ],
        [ [-99.68993678392353, 39.341088433448896],
        [-99.68993678392353, 38.24507658785885],
        [-98.67919734199646, 37.86444431771113],
        [-98.06395917020868, 38.210554846669694],
        [-98.06395917020868, 39.341088433448896],
        [-99.68993678392353, 39.341088433448896]
      ],
      [
        [-96.83349180978595, 37.23732027507514],
        [-97.31689323047635, 35.967330282988534],
        [-96.5698183075912, 35.57512048069255],
        [-95.42724211456674, 36.357601429255965],
        [-96.83349180978595, 37.23732027507514] ],
        [ [-101.4916967324349, 38.24507658785885],
        [-101.44775114873578, 36.073960493943744],
        [-103.95263145328033, 36.03843312329154],
        [-103.68895795108557, 38.03770050767439],
        [-101.4916967324349, 38.24507658785885]
      ]
    ],
    'spatialReference': {
      'wkid': 4326
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEquals(output.coordinates, [
    [
      [ [-100.74462180954974, 39.95017165502381], [-94.50439384003792, 39.91647453608879], [-94.41650267263967, 34.89313438177965], [-100.78856739324887, 34.85708140996771], [-100.74462180954974, 39.95017165502381] ],
      [ [-96.83349180978595, 37.23732027507514], [-97.31689323047635, 35.967330282988534], [-96.5698183075912, 35.57512048069255], [-95.42724211456674, 36.357601429255965], [-96.83349180978595, 37.23732027507514] ],
      [ [-99.68993678392353, 39.341088433448896], [-99.68993678392353, 38.24507658785885], [-98.67919734199646, 37.86444431771113], [-98.06395917020868, 38.210554846669694], [-98.06395917020868, 39.341088433448896], [-99.68993678392353, 39.341088433448896] ]
    ],
    [
      [ [-101.4916967324349, 38.24507658785885], [-101.44775114873578, 36.073960493943744], [-103.95263145328033, 36.03843312329154], [-103.68895795108557, 38.03770050767439], [-101.4916967324349, 38.24507658785885] ]
    ]
  ]);

  t.equal(output.type, 'MultiPolygon');
});

test('should still parse holes outside the outer rings', function (t) {
  t.plan(1);

  var input = {
    'rings': [
      [ [-122.45, 45.63], [-122.45, 45.68], [-122.39, 45.68], [-122.39, 45.63], [-122.45, 45.63] ],
      [ [-122.46, 45.64], [-122.4, 45.64], [-122.4, 45.66], [-122.46, 45.66], [-122.46, 45.64] ]
    ]
  };

  var output = arcgisToGeoJSON(input);

  var expected = [
    [ [-122.45, 45.63], [-122.45, 45.68], [-122.39, 45.68], [-122.39, 45.63], [-122.45, 45.63] ],
    [ [-122.46, 45.64], [-122.4, 45.64], [-122.4, 45.66], [-122.46, 45.66], [-122.46, 45.64] ]
  ];

  t.deepEquals(output.coordinates, expected);
});

test('should parse an ArcGIS Feature into a GeoJSON Feature', function (t) {
  t.plan(2);

  var input = {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'foo': 'bar'
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.geometry.coordinates, [
    [ [41.8359375, 71.015625],
    [56.953125, 33.75],
    [21.796875, 36.5625],
    [41.8359375, 71.015625] ]
  ]);

  t.equal(output.geometry.type, 'Polygon');
});

test('should parse an ArcGIS Feature w/ OBJECTID into a GeoJSON Feature', function (t) {
  t.plan(1);

  var input = {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'OBJECTID': 123
    }
  };

  var output = arcgisToGeoJSON(input);

  t.equal(output.id, 123);
});

test('should parse an ArcGIS Feature w/ FID into a GeoJSON Feature', function (t) {
  t.plan(1);

  var input = {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'FID': 123
    }
  };

  var output = arcgisToGeoJSON(input);

  t.equal(output.id, 123);
});

test('should parse an ArcGIS Feature w/ a custom id into a GeoJSON Feature', function (t) {
  t.plan(1);

  var input = {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'FooId': 123
    }
  };

  var output = arcgisToGeoJSON(input, 'FooId');

  t.equal(output.id, 123);
});

test('should parse an ArcGIS Feature w/ empty attributes into a GeoJSON Feature', function (t) {
  t.plan(2);

  var input = {
    'geometry': {
      'rings': [
        [ [41.8359375, 71.015625],
        [56.953125, 33.75],
        [21.796875, 36.5625],
        [41.8359375, 71.015625] ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {}
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.geometry.coordinates, [
    [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625],
      [41.8359375, 71.015625]
    ]
  ]);

  t.equal(output.geometry.type, 'Polygon');
});

test('should parse an ArcGIS Feature w/ no attributes into a GeoJSON Feature', function (t) {
  t.plan(3);

  var input = {
    'geometry': {
      'rings': [
        [
          [41.8359375, 71.015625],
          [56.953125, 33.75],
          [21.796875, 36.5625],
          [41.8359375, 71.015625]
        ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    }
  };

  var output = arcgisToGeoJSON(input);

  t.equal(output.geometry.type, 'Polygon');
  t.equal(output.properties, null);
  t.deepEqual(output.geometry.coordinates, [
    [
      [41.8359375, 71.015625],
      [56.953125, 33.75],
      [21.796875, 36.5625],
      [41.8359375, 71.015625]
    ]
  ]);
});

test('should parse an ArcGIS Feature w/ no geometry into a GeoJSON Feature', function (t) {
  t.plan(2);

  var input = {
    'attributes': {
      'foo': 'bar'
    }
  };

  var output = arcgisToGeoJSON(input);

  t.deepEqual(output.geometry, null);
  t.deepEqual(output.properties.foo, 'bar');
});

test('should not modify the original ArcGIS Geometry', function (t) {
  t.plan(1);

  var input = {
    'geometry': {
      'rings': [
        [
          [41.8359375, 71.015625],
          [56.953125, 33.75],
          [21.796875, 36.5625],
          [41.8359375, 71.015625]
        ]
      ],
      'spatialReference': {
        'wkid': 4326
      }
    },
    'attributes': {
      'foo': 'bar'
    }
  };

  var original = JSON.stringify(input);

  arcgisToGeoJSON(input);

  t.equal(original, JSON.stringify(input));
});
