import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        settings: {
            duration: 7,
            difficulty: 5,
            operations: [ 'addition', 'division', 'exponentiation', ],
            hint: false,
        },
        statistics: {
            recentTotal: null,
            recentSolved: null,
            overallTotal: 0,
            overallSolved: 0,
            startAt: Date.now(),
        },
    },
    actions: {
        save({commit}, settings) {
            commit('SAVE_SETTINGS', settings);
        },
        progress({commit}, stat) {
            commit('SAVE_PROGRESS', stat);
        },
    },
    mutations: {
        SAVE_SETTINGS (state, settings) {
            state.settings = settings;
        },
        SAVE_PROGRESS (state, { total, solved }) {
            state.statistics.recentTotal = total;
            state.statistics.recentSolved = solved;
            state.statistics.overallTotal += total;
            state.statistics.overallSolved += solved;
        },
    },
    getters: {
        settings(state) {
            return state.settings;
        },
        statistics(state) {
            return state.statistics;
        },
    },
});
