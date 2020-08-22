<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <h1><img alt="Vue logo" src="./../assets/logo.png" width="20"> Привет!</h1>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <p>Добро пожаловать на {{day}} тренировочный день.</p>
          <p v-if="recentStatisticsEnabled">
            Ваш последний результат - решено {{statistics.recentSolved}} из {{statistics.recentTotal}}.
          </p>
          <p v-if="accuracy !== null">Общая точность {{accuracy}}%.</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-slider v-model="duration" min="1" max="15"></v-slider>
        </v-col>
        <v-col>
          Длительность {{duration}} мин.
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-slider v-model="difficulty" min="1" max="10"></v-slider>
        </v-col>
        <v-col>
          Сложность {{difficulty}}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-checkbox v-model="operations" label="Сложение" value="addition" type="checkbox"></v-checkbox>
          <v-checkbox v-model="operations" label="Разность" value="subtraction" type="checkbox"></v-checkbox>
          <v-checkbox v-model="operations" label="Умножение" value="multiplication" type="checkbox"></v-checkbox>
          <v-checkbox v-model="operations" label="Деление" value="division" type="checkbox"></v-checkbox>
          <v-checkbox v-model="operations" label="Возведение в степень" value="exponentiation" type="checkbox"></v-checkbox>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-btn @click="play" :disabled="playDisabled"><span class="mr-2">Играть</span></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    defaultSettings: Object,
    statistics: Object,
  },
  data() {
    let accuracy = null;
    if (this.statistics.overallTotal > 0)
        accuracy = Math.floor(100 * this.statistics.overallSolved / this.statistics.overallTotal);

    const now = Date.now();
    let day = 0;
    if (now >= this.statistics.startAt) {
      const diff = now - this.statistics.startAt;
      day = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    return {
      ...this.defaultSettings,
      recentStatisticsEnabled: this.statistics.recentSolved !== null && this.statistics.recentTotal !== null,
      accuracy,
      day,
    };
  },
  computed: {
    playDisabled() {
      return this.operations.length === 0;
    },
  },
  methods: {
    play() {
      this.$store.dispatch('save', {
          duration: this.duration,
          difficulty: this.difficulty,
          operations: this.operations,
      });
      this.$router.push('game');
    },
  },
}
</script>

<style scoped>
</style>
