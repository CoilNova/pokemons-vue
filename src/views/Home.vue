<template>
  <div class="home">
    <Catalog></Catalog>
  </div>
</template>

<script>
// @ is an alias to /src
import Catalog from "@/components/Catalog.vue";
export default {
  name: "Home",
  components: {
    Catalog,
  },
};
</script>
