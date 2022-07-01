<template>
  <demo-block title="基础用法">
    <signature @save="save" @reset="reset"></signature>
    <div class="img-wrap">
      <img id="img" />
    </div>
  </demo-block>

  <demo-block title="配合popup使用">
    <cell-group>
      <cell title="弹出signatrue" @click="signatruePopupShow"></cell>
    </cell-group>
    <popup v-model="signShow" position="left">
      <signature :height="height" @save="signatruePopupShow"
    /></popup>
  </demo-block>

  <demo-block title="自定义">
    <cell-group>
      <cell title="自定义笔迹" @click="show = true"></cell>
    </cell-group>
    <signature
      :line-width="width"
      :color="color"
      @save="save"
      @reset="reset"
    ></signature>

    <popup v-model="show" position="bottom">
      <picker
        :colums="colum"
        title="设置线宽和颜色"
        @change="onChange"
        @cancel="show = false"
        @confirm="show = false"
      ></picker
    ></popup>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import cellGroup from '../../cell-group/index.vue'
import cell from '../../cell/index.vue'
import popup from '../../popup/index.vue'
import signature from '../index.vue'
import picker from '../../picker/index.vue'
import { onMounted } from '@vue/runtime-core'
import Demo from '../../toast/demo/index.vue'
import { doc } from 'prettier'
const width = ref(5)
const color = ref('black')
const show = ref(false)
const signShow = ref(false)
const height = ref(document.body.clientHeight - 62)
const colum = [
  // 第一列
  {
    values: ['2', '4', '6', '8', '10'],
    defaultIndex: 2
  },
  // 第二列
  {
    values: ['red', 'blue', 'black'],
    defaultIndex: 1
  }
]

const onChange = e => {
  width.value = e[0]
  color.value = e[1]
}
function save(url, file) {
  console.log(file)
  const imgWrap = document.querySelector('.img-wrap')
  const img = document.createElement('img')
  img.setAttribute('src', url)
  imgWrap.appendChild(img)
}

function reset() {
  const imgWrap = document.querySelector('.img-wrap')
  imgWrap.innerHTML = ''
}

function signatruePopupShow() {
  signShow.value = !signShow.value
  if (signShow.value) {
    document.body.classList.add('dis-scroll')
  } else {
    document.body.classList.remove('dis-scroll')
  }
}
</script>

<style>
.dis-scroll {
  overflow: hidden !important;
}
</style>
