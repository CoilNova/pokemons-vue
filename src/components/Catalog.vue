<template>
  <div>
    <div>Покемоны</div>
    <div class="catalog">
      <router-link
        v-if="this.page > 0"
        tag="div"
        class="navigate"
        :to="`/${+this.page - 1}`"
      >
      </router-link>

      <div class="catalog_body">
        <div
          class="catalog_card"
          v-for="page in paginatedData"
          :key="page.length"
        >
          <router-link :to="`pokemons/${page.name}`">
            <img :src="page.image" alt="" />
            <div>{{ page.name }}</div>
          </router-link>
        </div>
      </div>
      <router-link
        v-if="this.page < this.pageCount - 1"
        tag="div"
        class="navigate"
        :to="`/${+this.page + 1}`"
      >
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Catalog",
  data() {
    return {
      pageNumber: 0, // по умолчанию 0
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 8,
    },
  },
  computed: {
    ...mapGetters(["getPokemons"]),
    page() {
      if (!this.$route.params["page"]) return 0;
      return this.$route.params["page"];
    },
    pageCount() {
      let l = this.getPokemons.length,
        s = this.size;

      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.page * this.size,
        end = start + this.size;
      return this.getPokemons.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["getPokemonsFromApi", "getPokemonBioApi"]),
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      if (this.pageNumber > 0) this.pageNumber--;
    },
  },
  created() {
    this.getPokemonsFromApi();
  },
};
</script>

<style scoped>
.catalog_body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.catalog_card {
  padding: 10px;
  background-color: lightpink;
  margin: 10px;
  font-size: large;
}
.catalog_card:hover {
  background-color: hotpink;
}
.catalog {
  display: flex;
  flex-direction: row;
}
.navigate:hover {
  background-color: hotpink;
}
.navigate {
  background-color: lightpink;
  width: 100px;
}
</style>
