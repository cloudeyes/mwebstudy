<template>
  <div class="main-map" ref="map"></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { defaults } from 'ol/control.js';
import OlLayerTile from 'ol/layer/Tile.js';
import OlMap from 'ol/Map.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import OlView from 'ol/View.js';
import { onMounted, ref } from 'vue';

// @ts-ignore
import Geocoder from '@kirtandesai/ol-geocoder';
import '@kirtandesai/ol-geocoder/dist/ol-geocoder.css';

import { useStore } from '../store';

const store = useStore();
const map = ref<HTMLDivElement>();

const getAddress = (pos: number[]) => {
  const [lon, lat] = pos;
  return axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      format: 'json',
      'accept-language': 'kr',
      lon: lon,
      lat: lat,
    },
  });
};

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
    ],
    view: new OlView({
      center: fromLonLat([127.1388684, 37.4449168]), // 경기도 성남
      zoom: 10,
    }),
  });

  olMap.on('click', async (e) => {
    const addr = (await getAddress(toLonLat(e.coordinate))).data;
    store.state.address = addr.display_name.split(', ').reverse().join(' ');
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
        background-color: rgba(0 ,0, 0, 0.5);
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
