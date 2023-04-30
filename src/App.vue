<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import data from "./assets/data.json";
import srt from "./assets/shangshangang.txt?raw"

import { useStore } from './store/index'
import { onMounted, ref } from 'vue';
import VueScrollTo from 'vue-scrollto'

import { createSubtitlePlayer, srtToJson } from "./store/instr";

let json = data.values




let srts = srt

let tojson = ref()

const store = useStore()

function play() {

  const lengt = data.values.length - 1
  const div = document.querySelector(".list:last-child")
  VueScrollTo.scrollTo(div, 230000)
  const audios = document.querySelector("audio") as HTMLAudioElement
  audios.play()


}

onMounted(() => {
  /*
    nextTick(() => {
      const lengt = data.values.length - 1
      const div = document.querySelector(".lastfood")
      VueScrollTo.scrollTo(div, 232000)
    })*/

  srtToJson(srts, (error, result) => {
    tojson.value = result;
    const sub = document.querySelector(".sub") as HTMLElement
    const audios = document.querySelector("audio") as HTMLAudioElement
    const SubtitlePlayer = createSubtitlePlayer(sub, audios, result)
    SubtitlePlayer()


  })
})
//:class="index === data.values.length - 1 ? 'lastfood' : ''" 
</script>

<template>
  <div class="container">
    <div class="left_container">
      <HelloWorld class="list"
        v-for="(item, index) in json" img="https://www.w3schools.com/w3images/forest.jpg" :context="item.context"
        :name="item.name" />
    </div>
    <div class="right_container">
      <div class="sub"></div>
      <button @click="play()" class="play">
        <div class="playdiv">‣</div>
      </button>
      <audio id=“my-audio” src="./洛天依-上山岗.mp3"></audio>
    </div>

  </div>
</template>

<style scoped>
.list:first-child{
  margin-top: 100vh;
}


.container {
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;

}

.left_container {
  width: 60vw;
  height: 100vh;
  padding-left: 0;
  
  overflow-y: scroll

}

/* 此处的 div 可以依照情况替换成对应的元素名称 */
.left_container::-webkit-scrollbar{
         display:none
    }


.right_container {
  width: 40vw
  
}

.play {
  width: 70px;
  height: 70px;

  position: absolute;
  bottom: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* 设置阴影 */
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  /* 设置card的背景色 */
  background: rgba(255, 255, 255, 0.1);
}

.playdiv {
  font-size: 30px;
}

.sub {
  white-space: pre-wrap;
  margin-top: 30px;
  margin-right: 30px;

  font-size: 20px;
}



@media screen and (max-width:600px){
  .left_container{width: 100vw;}
  .right_container{display:none; }
  }

</style>