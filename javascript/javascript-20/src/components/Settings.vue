<template>
  <div>
    <h1><img alt="Vue logo" src="./../assets/logo.png" width="20"> Привет!</h1>
    <p>Добро пожаловать на {{log.day}} тренировочный день.</p>
    <p>Ваш последний результат - решено {{log.solved}} из {{log.total}}.</p>
    <p>Общая точность {{log.accuracy}}%.</p>
    <label class="settings-line"><input v-model="duration" type="range" min="1" max="15" />Длительность {{duration}} мин.</label>
    <label class="settings-line"><input v-model="difficulty" type="range" min="1" max="15" />Сложность {{difficulty}}</label>
    <label class="settings-line"><input v-model="operations" type="checkbox" value="addition" />Сложение</label>
    <label class="settings-line"><input v-model="operations" type="checkbox" value="subtraction" />Разность</label>
    <label class="settings-line"><input v-model="operations" type="checkbox" value="multiplication" />Умножение</label>
    <label class="settings-line"><input v-model="operations" type="checkbox" value="division" />Деление</label>
    <label class="settings-line"><input v-model="operations" type="checkbox" value="exponentiation" />Возведение в степень</label>
    <button>Играть</button>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    log: Object,
    duration: Number,
    difficulty: Number,
    operations: Array,
  }
}
</script>

<style scoped>
.settings-line {
  display: block;
  padding: 5px;
}

button {
  margin: 5px;
  border-radius: 5px;
}
</style>
