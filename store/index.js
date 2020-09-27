export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  }
}

export const actions = {
  async login({ commit }, { username, password }) {

    try {
      const data = await this.$axios.get('/accounts/' + username + '/' + password);
      

      if (data.status === 298) {
        await commit('SET_USER', data.data);
        this.$router.replace({ path: data.data[0].type })
      }


    } catch (error) {
      alert(error)
    }
  },

  logout({ commit }) {
    commit('SET_USER', null);
    this.$router.replace({ path: '/' })
  }

}
