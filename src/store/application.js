/* eslint-disable */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: [],
  },
  getters: {
    GET_ALL_USERS(state) {
      return state.users;
    }
  },
  mutations: {
    SET_ALL_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    FETCH_ALL_USERS({ commit }) {
      const url = 'https://gorest.co.in/public/v1/users';

      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      return new Promise((resolve, reject) => {
        axios.get(url, config)
          .then((response) => {
            console.log('response', response.data);
            commit('SET_ALL_USERS', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {
  },
});
