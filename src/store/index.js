import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    pokemons_bio: {},
  },
  mutations: {
    setPokemonsToState: (state, pokemons) => {
      pokemons.map(function (pokemon) {
        pokemon.image = `https://robohash.org/${pokemon.name}.png`;
      });
      state.pokemons = pokemons;
    },
    setPokemonBioToState: (state, bio) => {
      state.pokemons_bio = { ...state.pokemons_bio, [bio.name]: bio };
    },
  },
  actions: {
    getPokemonsFromApi({ commit, state }) {
      if (state.pokemons.length > 0) {
        console.log("abort");
        return;
      }
      return axios("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0", {
        method: "GET",
      })
        .then((pokemons) => {
          commit("setPokemonsToState", pokemons.data.results);
          return pokemons;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    getPokemonBioApi({ commit, state }, name) {
      if (state.pokemons_bio[name]) {
        console.log("abortBio");
        return;
      }
      return axios(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        method: "GET",
      })
        .then((bio) => {
          commit("setPokemonBioToState", bio.data);
          return bio.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  modules: {},
  getters: {
    getPokemons(state) {
      return state.pokemons;
    },
    getPokemonBioByName: (state) => (name) => {
      return state.pokemons_bio[name];
    },
    getPokemonByName: (state) => (name) => {
      return state.pokemons.find(function (pokemon) {
        return pokemon.name === name;
      });
    },
  },
});
