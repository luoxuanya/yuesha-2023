<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../store';


const props = defineProps<{
  context: string
  name: string
  img: string
}>()
const card = ref()
const store = useStore()


onMounted(() => {
  store.height.push(card.value.clientHeight)

  console.log(store.height);

}

)
//props.img
</script>

<template>
  <div ref="card" class="card">
    <div>
      <img class="portrait" :src="'/img/'+props.name+'.jpg'" alt="头像">
      <p v-text="props.name" class="name"></p>
    </div>
    <p class="text" v-html="props.context"></p>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card {

  width: 80%;
  min-height: 50px;
  margin-left:auto; margin-right:auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 30px;
  /* 设置阴影 */
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  /* 设置card的背景色 */
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;

  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);

}

.name {
  margin-top: 3px;
  font-size:medium;
}

img {
  width: 50px;
  height: 50px;
  justify-content: left;
  border-radius: 15px;
}

.text {
  white-space: pre-wrap;
  margin-left: 25px;
  font-size:medium;
}
</style>
