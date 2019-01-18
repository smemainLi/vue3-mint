const state = {}
const getters = {}
const mutations = {}
const actions = {
  testApi: ({ commit }, data) => { return this.$axios.post('/wx/login', data) }
}

export default {
  state,
  getters,
  mutations,
  actions
}