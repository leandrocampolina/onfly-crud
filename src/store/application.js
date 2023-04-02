/* eslint-disable */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: [],
    user: null,
    userCreateError: null,
    userCreateSuccess: false,
  },
  getters: {
    GET_ALL_USERS(state) {
      return state.users;
    },
    GET_USER(state) {
      return state.user;
    },
  },
  mutations: {
    SET_ALL_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_CREATE_ERROR (state, error) {
      state.userCreateError = error
    },
    SET_USER_CREATE_SUCCESS (state, success) {
      state.userCreateSuccess = success
    },
    DELETE_USER (state, id) {
      state.users = state.users.filter(user => user.id !== id)
    }
  },
  actions: {
    async FETCH_ALL_USERS({ commit }) {
      const url = 'https://gorest.co.in/public/v1/users';

      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      await axios.get(url, config)
        .then((response) => {
          console.log('response', response.data);
          commit('SET_ALL_USERS', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CREATE_USER({ commit }, payload) {
      const url = 'https://gorest.co.in/public/v1/users';

      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const response = axios.post(url, payload, config)
        commit('SET_USER_CREATE_ERROR', null)
        commit('SET_USER_CREATE_SUCCESS', response.data)
      } catch (error) {
        commit('SET_USER_CREATE_SUCCESS', null)
        commit('SET_USER_CREATE_ERROR', error.response.data)
      };
    },

    async DELETE_USER_BY_ID({ commit }, id) {

      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        await axios.delete(`https://gorest.co.in/public/v1/users/${id}`, config)
        commit('DELETE_USER', id);
      } catch (error) {
        console.error(error)
      }
    },

    async UPDATE_USER_BY_ID({ commit }, {id, updates}) {
      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        await axios.patch(`https://gorest.co.in/public/v1/users/${id}`, updates, config)
        .then(response => {
          console.log('response update', response.data);
          commit('SET_ALL_USERS', response.data);
        })
      } catch (error) {
        console.error(error)
      }
    },

    DETAIL_USER_BY_ID({ commit }, id) {
      const token = '9a859e2d69df9482a9145faca351861f4f46cd77726e53694d8e1a97bad66588'

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      return axios
      .get(`https://gorest.co.in/public/v1/users/${id}`, config)  
      .then(response => {
        commit('SET_USER', response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    },
  },

  modules: {
  },

});
