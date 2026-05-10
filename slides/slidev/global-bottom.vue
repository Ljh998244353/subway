<template>
  <footer v-if="$nav.currentPage > 1" class="slide-footer">
    <span>商业综合体视觉 AI 数字孪生运营系统</span>
    <span>{{ $nav.currentPage }} / {{ $nav.total }}</span>
  </footer>
</template>

<style scoped>
.slide-footer {
  position: fixed;
  left: 44px;
  right: 44px;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(244, 239, 231, 0.58);
  font-size: 13px;
  letter-spacing: 0;
  pointer-events: none;
}
</style>
