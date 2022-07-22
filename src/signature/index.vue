<template>
  <div :class="bem()">
    <div :class="bem('canvas')">
      <canvas
        ref="canvasRef"
        :width="width"
        :height="fullscreenHeight || height"
        @touchstart.prevent="touchstart"
        @touchmove.prevent="touchmove"
        @touchend.prevent="touchend"
      ></canvas>
    </div>
    <div :class="bem('control-bar')" ref="controlBarRef">
      <t-button :class="bem('button')" type="wanner" round @click="reset"
        >重置</t-button
      >
      <t-button :class="bem('button')" round @click="saveImg">确定</t-button>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue'
import TButton from '../button/index.vue'
import { makeNumericProp, makeStringProp, createNamespace } from '../utils'

const [name, bem] = createNamespace('signature')

const emits = ['save', 'reset']

const components = { TButton }

const props = {
  fullscreen: Boolean,
  width: makeNumericProp(document.body.clientWidth - 2),
  height: makeNumericProp(300),
  lineWidth: makeNumericProp(2),
  color: makeStringProp('black'),
  filename: makeStringProp('signatrue'),
  imgType: makeStringProp('png')
}

function setup(props, { emit }) {
  let isTouchMove = false,
    canvasRef = ref(),
    controlBarRef = ref(),
    fullscreenHeight = ref(),
    canvas,
    ctx,
    lastX,
    lastY

  //画线
  const drawLine = (x, y) => {
    if (isTouchMove) {
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
    drawLine(
      e.touches[0].pageX - canvas.offsetLeft,
      e.touches[0].pageY - canvas.offsetTop
    )
    isTouchMove = true
  }
  const touchmove = e => {
    if (isTouchMove) {
      drawLine(
        e.touches[0].pageX - canvas.offsetLeft,
        e.touches[0].pageY - canvas.offsetTop
      )
    }
  }
  const touchend = e => {
    isTouchMove = false
    if (!props.fullscreen) {
      document.body.classList.remove('dis-scroll')
    }
  }
  //清空画图
  function reset() {
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.closePath()
    emit('reset')
  }

  //保存图片
  function saveImg() {
    const images = canvas.toDataURL(`image/${props.imgType}`)
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
    emit('save', {
      url: images,
      file: new File([u8arr], props.filename, { type: mime })
    })
  }

  onMounted(() => {
    canvas = canvasRef.value
    ctx = canvasRef.value.getContext('2d')
    if (props.fullscreen) {
      nextTick(() => {
        fullscreenHeight.value =
          document.body.clientHeight - controlBarRef.value.clientHeight - 2
      })
    }
  })
  return {
    bem,
    reset,
    saveImg,
    touchend,
    touchmove,
    canvasRef,
    touchstart,
    controlBarRef,
    fullscreenHeight
  }
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
.t-signature {
  &__canvas {
    background: rgb(255, 255, 255);
    border: 1px dashed gray;
  }
  &__control-bar {
    display: flex;
    justify-content: flex-end;
  }
  &__button {
    margin: 10px 5px;
  }
}
.dis-scroll {
  overflow: hidden !important;
}
</style>
