<template>
  <div class="tabs-body">
    <slot
      ><div class="empty">{{ title }}内容区</div></slot
    >
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});

console.log(props.title);
</script>

<style lang="less" scoped>
.empty {
  color: #d6d6d6;
  text-align: center;
  line-height: 100px;
}
</style>
