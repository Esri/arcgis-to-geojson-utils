#!/bin/bash

# config
VERSION=$(node --eval "console.log(require('./package.json').version);")

# our .zip asset filename shouldnt include the npm namespace
NAME=$(node --eval "console.log(require('./package.json').name);" | sed -e "s/@esri\///")

# build and test
npm test || exit 1

# checkout temp branch for release
git checkout -b gh-release

# run prepublish to build files
npm run prepare

# force add files
git add dist -f

# commit changes with a versioned commit message
git commit -m "build $VERSION"

# push commit so it exists on GitHub when we run gh-release
git push https://github.com/Esri/arcgis-to-geojson-utils gh-release

# create a ZIP archive of the dist files
zip -r $NAME-v$VERSION.zip dist

# run gh-release to create the tag and push release to github
gh-release --assets $NAME-v$VERSION.zip

# checkout master and delete release branch locally and on GitHub
git checkout master
git branch -D gh-release
git push https://github.com/Esri/arcgis-to-geojson-utils :gh-release

# publish release on NPM
npm publish
