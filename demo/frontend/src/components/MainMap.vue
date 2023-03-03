<template>
  <div class="main-map" ref="map"></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { defaults } from 'ol/control.js';
import OlFeature from 'ol/Feature.js';
import OlPoint from 'ol/geom/Point';
import OlLayerTile from 'ol/layer/Tile.js';
import OlVectorLayer from 'ol/layer/Vector.js';
import OlMap from 'ol/Map.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import OlVectorSource from 'ol/source/Vector.js';
import OlIcon from 'ol/style/Icon.js';
import OlStyle from 'ol/style/Style.js';
import OlView from 'ol/View.js';
import { onMounted, ref } from 'vue';

// @ts-ignore
import Geocoder from '@kirtandesai/ol-geocoder';
import '@kirtandesai/ol-geocoder/dist/ol-geocoder.css';

import { useStore } from '../store';

const vectorSource = new OlVectorSource('EPSG:3857' as any);
const vectorLayer = new OlVectorLayer({
  source: vectorSource,
});

const store = useStore();
const map = ref<HTMLDivElement>();

async function getAddress(coords: number[]) {
  const [lon, lat] = toLonLat(coords);
  const data = (
    await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'json',
        'accept-language': 'kr',
        lon: lon,
        lat: lat,
      },
    })
  ).data;
  return data.display_name.split(', ').reverse().join(' ');
}

onMounted(() => {
  //@ts-ignore

  const olMap = new OlMap({
    target: map.value,
    controls: defaults({
      attribution: false,
      zoom: false,
      rotate: false,
    }),
    layers: [
      new OlLayerTile({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new OlView({
      center: fromLonLat([127.1388684, 37.4449168]), // 경기도 성남
      zoom: 10,
    }),
  });

  olMap.on('click', async (e) => {
    drawMapIcon();
    store.state.address = await getAddress(e.coordinate);

    function drawMapIcon() {
      vectorSource.clear();
      geocoder.getSource().clear();
      const feature = new OlFeature({
        geometry: new OlPoint(e.coordinate),
      });
      feature.setStyle(
        new OlStyle({
          image: new OlIcon({
            scale: 0.7,
            src: '//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png',
          }),
        })
      );
      vectorSource.addFeature(feature);
    }
  });

  const geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    lang: 'kr',
    placeholder: '주소 검색',
    limit: 5, // 자동 완성 결과 최대 개수
    autoComplete: true,
    keepOpen: true,
  });

  geocoder.on('addresschosen', () => {
    // setUiAddress(evt.address.details.name);
  });
  olMap.addControl(geocoder);
});
</script>

<style lang="scss">
.main-map {
  width: 100%;
  height: 100%;
  #gcd-container {
    width: 100vw;
    top: 10px;
    display: flex;
    flex-direction: row;

    .gcd-gl-result {
      left: initial;
      right: 0;
    }

    .ol-control {
      width: 270px;
      margin-left: auto;
      text-align: right;

      button {
        display: none;
      }

      input {
        width: 150px;
        opacity: 0.5;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        &::placeholder {
          color: white;
        }
        &:focus {
          width: 235px;
          opacity: 1;
          animation: input-focus 0.2s ease-out forwards;
          box-shadow: none;
        }
      }
      @keyframes input-focus {
        0% {
          width: 150px;
          opacity: 0.5;
        }
        100% {
          width: 235px;
          opactiy: 1;
        }
      }
      button,
      input {
        position: initial;
      }
    }
  }
}
</style>
