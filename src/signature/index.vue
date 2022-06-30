<template>
  <div class="signature">
    <canvas id="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import TButton from '../button/index.vue'
const name = 'signature'
const components = { TButton }
const props = {
  width: {
    type: [String, Number],
    default: document.body.clientWidth
  },
  height: {
    type: [String, Number],
    default: 300
  }
}

function setup(props) {
  let isMouseMove = false,
    widthVal = 2,
    colorVal = 'pink',
    lastX,
    lastY

  //画线
  const drawLine = (x, y, isT) => {
    if (isT) {
      ctx.beginPath()
      ctx.lineWidth = widthVal //设置线宽状态
      ctx.strokeStyle = colorVal //设置线的颜色状态
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
}
export default {
  name,
  components,
  props,
  setup
}
</script>

<style lang="less" scoped>
.signature {
  border: 1px dashed gray;
  // border: 1px solid gray;
}
</style>
