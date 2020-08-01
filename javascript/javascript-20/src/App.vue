<template>
  <div id="app">
    <Settings 
      :log="{ day: 24, solved: 10, total: 25, accuracy: 80, }"
      :duration="7"
      :difficulty="5"
      :operations="[ 'addition', 'division', 'exponentiation', ]"
      />
    <Game 
      :settings="{
        duration: 7,
        difficulty: 5,
        operations: [ 'addition', 'division', 'exponentiation', ],
      }"
      />
  </div>
</template>

<script>
import Settings from './components/Settings.vue'
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Settings,
    Game,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
