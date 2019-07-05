import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

//Throw error if state is mutated out of mutation handlers
const strictMode = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {

    },
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin],
    strict: strictMode
})