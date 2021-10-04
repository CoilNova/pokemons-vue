<template>
  <div>
    <div>Покемон</div>
    <div>
      <div v-if="bio">
        <img :src="pokemon.image" alt="" />
        {{ bio.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Pokemon",
  computed: {
    ...mapGetters(["getPokemonBioByName", "getPokemonByName"]),
    name() {
      return this.$route.params["name"];
    },
    bio() {
      console.log(this.getPokemonBioByName(this.name));
      return this.getPokemonBioByName(this.name);
    },
    pokemon() {
      return this.getPokemonByName(this.name);
    },
  },
  methods: {
    ...mapActions(["getPokemonBioApi"]),
  },
  created() {
    this.getPokemonBioApi(this.name);
  },
};
</script>

<style scoped></style>
