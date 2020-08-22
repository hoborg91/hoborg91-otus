<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-btn @click="cancel"><span class="mr-2">Отмена</span></v-btn>
        </v-col>
        <v-col>
          <v-alert
            border="right"
            color="blue darken-1"
            dark
            outlined
            dense
          >
            {{ timeLeft }}
          </v-alert>
        </v-col>
      </v-row>
      
      <v-row no-gutters>
        <v-col>
        {{ (currentTask === null ? '' : currentTask.question) }}
        </v-col>
      </v-row>
      <v-row no-gutters v-if="exercise !== null">
        <v-col>
          <span v-for="chunk in exercise" :key="chunk.index">
            <span v-if="chunk.known">
              {{ chunk.operand }}</span> 
            <span v-else>
              <input 
                v-model.number="chunk.answer" 
                :data-index="chunk.index"
                @focus="focusAnswer"
                size="2" 
                placeholder="?"
                class="answer" />
            </span>
            <span v-if="chunk.followingOperator !== null">
              {{ chunk.followingOperator }}
            </span>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
           = {{ (currentTask === null ? '' : currentTask.answer) }}?
        </v-col>
      </v-row>
      <table>
        <tr>
          <td v-for="num in [1, 2, 3]" :key="num">
            <v-btn color="error" fab small dark @click="clickNum($event, num)">{{ num }}</v-btn>
          </td>
          <td>
            <v-btn color="normal" fab small dark @click="moveFocus($event, -1)">&lt;</v-btn>
          </td>
        </tr>
        <tr>
          <td v-for="num in [4, 5, 6]" :key="num">
            <v-btn color="error" fab small dark @click="clickNum($event, num)">{{ num }}</v-btn>
          </td>
          <td>
            <v-btn color="normal" fab small dark @click="moveFocus($event, +1)">></v-btn>
          </td>
        </tr>
        <tr>
          <td v-for="num in [7, 8, 9]" :key="num">
            <v-btn color="error" fab small dark @click="clickNum($event, num)">{{ num }}</v-btn>
          </td>
          <td><v-btn color="normal" fab small dark @click="nextTask">?</v-btn></td>
        </tr>
        <tr>
          <td></td>
          <td v-for="num in [0]" :key="num">
            <v-btn color="error" fab small dark @click="clickNum($event, num)">{{ num }}</v-btn>
          </td>
          <td></td>
          <td><v-btn color="normal" fab small dark :disabled="continueDisabled" @click="answer">=</v-btn></td>
        </tr>
      </table>
    </v-container>
  </div>
</template>

<script>
import * as OperationsMath from '../infrastructure/math.js';
import * as Utils from '../infrastructure/utils.js';

export default {
  name: 'Game',
  created: function() {
    const t = this;
    const timeout = t.settings.duration * 60 * 1000;
    setTimeout(function() {
      t.cancel();
    }, timeout);
    setInterval(function() {
      t.now = Date.now();
    }, 1000);
    t.nextTask();
  },
  props: {
    settings: Object,
  },
  data: function() { 
    const t = this;
    let dt = new Date();
    dt.setMinutes(dt.getMinutes() + t.settings.duration);
    return {
      endTime: dt,
      now: Date.now(),
      currentTask: null,
      exercise: null,
      focusedAnswer: null,
      total: 0,
      solved: 0,
    };
  },
  computed: {
    timeLeft: function() {
      const totalSeconds = Math.floor((this.endTime - this.now) / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return minutes + ':' + (seconds >= 10 ? seconds : '0' + seconds);
    },
    continueDisabled: function() {
      return this.exercise.filter(chunk => !chunk.known && chunk.answer === '').length > 0;
    },
  },
  methods: {
    cancel() {
      this.$store.dispatch('progress', { total: this.total, solved: this.solved, });
      this.$router.push('/');
    },
    nextTask() {
      this.currentTask = OperationsMath.inventTask(
        this.settings.operations,
        this.settings.difficulty
      );
      const exercise = [];
      for (let i = 0; i < this.currentTask.operands.length; i++) {
        exercise.push({
          index: i,
          operand: this.currentTask.operands[i],
          followingOperator: (i + 1 < this.currentTask.operands.length)
            ? this.currentTask.operators[i]
            : null,
          known: null,
          answer: '',
        });
      }
      const knownState = OperationsMath.getKnownIndices(exercise.length)
      this.focusedAnswer = null;
      for (let i = 0; i < exercise.length; i++) {
        exercise[i].known = knownState[i];
        if (this.focusedAnswer === null && !exercise[i].known)
          this.focusedAnswer = i;
      }
      this.exercise = exercise;
      this.total++;
    },
    focusAnswer(evt) {
      this.focusedAnswer = evt.target.getAttribute('data-index');
    },
    moveFocus(evt, direction) {
      this.focusedAnswer = Utils.slideTo(
        this.exercise,
        this.focusedAnswer,
        direction,
        chunk => !chunk.known
      );
    },
    clickNum(evt, num) {
      this.exercise[this.focusedAnswer].answer += '' + num;
    },
    answer() {
      let success = true;
      const toSolve = this.exercise.filter(chunk => !chunk.known);
      for (let i = 0; i < toSolve.length && success; i++) {
        if (parseInt(toSolve[i].answer) !== toSolve[i].operand)
          success = false;
      }
      if (success) {
        this.solved++;
      }
      this.nextTask();
    },
  },
}
</script>

<style scoped>
input.answer {
  border: 1px blue solid;
}
</style>
