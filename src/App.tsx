import 'maplibre-gl/dist/maplibre-gl.css';
import { Tile3DLayer } from '@deck.gl/geo-layers/typed';
import { default as DeckGL } from '@deck.gl/react/typed';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { default as maplibregl } from 'maplibre-gl';
import type { FC } from 'react';
import { default as Map } from 'react-map-gl';

const INITIAL_VIEW_STATE = {
  longitude: 129.87361,
  latitude: 32.74472,
  zoom: 11,
  pitch: 30,
  bearing: 0,
};

const App: FC = () => {
  const layers = [
    new Tile3DLayer({
      id: 'tile-3d-layer',
      pointSize: 2,
      data: 'https://nagasaki-3dtiles.nekoyasan.dev/tileset.json',
      loaders: [Tiles3DLoader],
    }),
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <Map
        mapLib={maplibregl}
        mapStyle={{
          version: 8,
          sources: {
            photo: {
              type: 'raster',
              tiles: ['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'],
              tileSize: 256,
              attribution:
                '<a href="http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>',
            },
          },
          layers: [
            {
              id: 'photo',
              type: 'raster',
              source: 'photo',
              minzoom: 2,
              maxzoom: 18,
            },
          ],
        }}
      />
    </DeckGL>
  );
};

export default App;
