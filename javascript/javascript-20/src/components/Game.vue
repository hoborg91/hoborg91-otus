<template>
  <div>
    <h1><img alt="Vue logo" src="./../assets/logo.png" width="20"> Заглушка страницы с игрой</h1>
    <p>duration: {{settings.duration}}</p>
    <p>difficulty: {{settings.difficulty}}</p>
    <p>operations: {{settings.operations}}</p>
  </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
    settings: Object,
  }
}
</script>

<style scoped>
</style>
