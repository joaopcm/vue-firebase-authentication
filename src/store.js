import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserUp({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          const newUser = {
            id: data.user.uid
          };
          commit("setUser", newUser);
        })
        .catch(err => alert(`${err.message} \r Error: ${err.code}`));
    },
    signUserIn({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          const newUser = {
            id: data.user.uid
          };
          commit("setUser", newUser);
        })
        .catch(err => alert(`${err.message} \r Error: ${err.code}`));
    },
    signUserOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", {});
        });
    },
    signUserInWithSocialMedia({ commit }, payload) {
      let provider =
        payload === "facebook"
          ? new firebase.auth.FacebookAuthProvider()
          : new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(data => {
          const newUser = {
            id: data.user.uid
          };
          commit("setUser", newUser);
          console.log(data);
        })
        .catch(err => alert(`${err.message} \r Error: ${err.code}`));
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
});
