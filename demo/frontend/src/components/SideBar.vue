<template>
  <div class="side-bar-wrapper">
    <VueResizable
      class="resizable-side-bar"
      :width="300"
      :min-width="300"
      :max-width="Infinity"
      :active="['r']"
      v-if="isVisibleSideBar"
    >
      <div class="side-bar">
        <div class="input-field title-area">
          <v-text-field
            variant="underlined"
            label="맛집 이름을 입력해주세요."
          />
        </div>
        <div class="image-area">
          <div class="iw-file-input">사진을 업로드 해주세요</div>
        </div>
        <div class="input-field location-area">
          <v-text-field
            variant="underlined"
            label="위치 정보 직접 입력하기"
            :model-value="store.state.address"
          />
        </div>
        <div class="rate-area">
          <v-rating color="yellow" />
        </div>
        <v-textarea
          class="review-area"
          ref="textarea"
          label="후기를 입력해주세요."
          variant="underlined"
          hide-details
        />
      </div>
    </VueResizable>
    <v-btn variant="text" class="side-bar-active-btn" @click="showSideBar">
      {{ isVisibleSideBar ? '닫힘' : '열림' }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import VueResizable from 'vue-resizable';
import { useStore } from '../store';

const store = useStore();

const isVisibleSideBar = ref(true);

const showSideBar = () => {
  isVisibleSideBar.value = !isVisibleSideBar.value;
};
</script>

<style lang="scss">
.side-bar-wrapper {
  display: flex;
  color: #fff;

  * {
    font-family: 'Nanum-Square', serif;
  }

  label {
    opacity: 0.9;
  }

  > .resizable-side-bar {
    > .side-bar {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      > .input-field {
        display: felx;
        flex-direction: row;
        padding-left: 6px;
        padding-right: 6px;
        align-items: center;
        .v-icon {
          margin-top: -12px;
          margin-right: 5px;
        }
      }

      > .image-area {
        padding: 0 10px;
        margin-bottom: 10px;

        > .iw-file-input {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
          border: 5px dashed rgb(255, 255, 255, 0.5);
          border-radius: 10px;
          height: 250px;
          background-color: rgb(255, 255, 255, 0.5);
        }
      }

      > .rate-area {
        padding: 0 20px;
        text-align: center;

        output {
          font-size: 2rem;
          color: #ffdd00;
          background: none;
          border: none;
          box-shadow: none;
        }
      }

      > .review-area {
        padding-left: 6px;
        padding-right: 6px;
        & > div {
          height: calc(100vh - 480px);
        }

        textarea {
          height: calc(100% - 10px);
          cursor: auto;
        }
        textarea::placeholder {
          color: white;
          opacity: 0.9;
        }
      }
    }
  }

  > .side-bar-active-btn {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    padding: 0;
    border: none;
    border-radius: unset;
    color: #fff;
    opacity: 0.5;
    width: 40px;
    height: 40px;
  }
}
</style>
