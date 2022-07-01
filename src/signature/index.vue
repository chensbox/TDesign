<template>
  <div class="signature">
    <div class="signature-canvas">
      <canvas
        ref="canvasRef"
        :width="width"
        :height="height"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      ></canvas>
    </div>
    <div class="signature-control-bar">
      <t-button class="signature-button" type="wanner" round @click="reset"
        >重置</t-button
      >
      <t-button class="signature-button" round @click="saveImg">确定</t-button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import TButton from '../button/index.vue'
const name = 'signature'
const emits = ['save', 'reset']
const components = { TButton }
const props = {
  width: {
    type: [String, Number],
    default: document.body.clientWidth - 2
  },
  height: {
    type: [String, Number],
    default: 300
  },
  lineWidth: {
    type: [String, Number],
    default: 2
  },
  color: {
    type: String,
    default: 'black'
  },
  filename: {
    type: String,
    default: 'signatrue'
  },
  fullscreen: {
    type: Boolean
  }
}

function setup(props, { emit }) {
  let isMouseMove = false,
    canvasRef = ref(),
    canvas,
    ctx,
    lastX,
    lastY

  //画线
  const drawLine = (x, y, isT) => {
    if (isT) {
      ctx.beginPath()
      ctx.lineWidth = props.lineWidth //设置线宽状态
      ctx.strokeStyle = props.color //设置线的颜色状态
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.closePath()
    }
    // 每次移动都要更新坐标位置
    lastX = x
    lastY = y
  }

  const touchstart = e => {
    document.body.classList.add('dis-scroll')
    isMouseMove = true
    drawLine(
      e.touches[0].pageX - canvas.offsetLeft,
      e.touches[0].pageY - canvas.offsetTop,
      false
    )
  }
  const touchmove = e => {
    if (isMouseMove || 'ontouchstart' in document.body) {
      drawLine(
        e.touches[0].pageX - canvas.offsetLeft,
        e.touches[0].pageY - canvas.offsetTop,
        true
      )
    }
  }
  const touchend = e => {
    isMouseMove = false
    if (!props.fullscreen) {
      document.body.classList.remove('dis-scroll')
    }
  }
  //清空画图
  function reset() {
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.closePath() //可加入，可不加入
    emit('reset')
  }
  onMounted(() => {
    canvas = canvasRef.value
    ctx = canvasRef.value.getContext('2d')
  })

  //保存图片
  function saveImg() {
    const images = canvas.toDataURL('image/png')
    // imgs.innerHTML = `<img src='${images}'>`
    let arr = images.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    if (props.fullscreen) {
      document.body.classList.remove('dis-scroll')
    }
    emit('save', images, new File([u8arr], 'filename', { type: mime }))
  }
  return { touchstart, touchmove, touchend, reset, saveImg, canvasRef }
}
export default {
  name,
  emits,
  components,
  props,
  setup
}
</script>

<style lang="less">
.signature {
  // border: 1px dashed gray;
  // border: 1px solid gray;
  &-canvas {
    background: rgb(255, 255, 255);
    border: 1px dashed gray;
  }
  &-control-bar {
    display: flex;
    justify-content: end;
  }
  &-button {
    margin: 10px 5px;
  }
}
.dis-scroll {
  overflow: hidden !important;
}
</style>
