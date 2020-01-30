<template>
  <!--prikaz odabranog oglasa -->
  <div v-if="card" style="position:relative; left:40%;">
    <Oglas :info="card" :showcomments="true" />
  </div>
</template>

<script>
import Oglas from "@/components/Oglas.vue";
import store from "@/store.js";

export default {
  props: ["id"],
  data() {
    return {
      card: null
    }
  },

  mounted() {
    //dohvacanje podataka o odabranom oglasu
    db.collection("posts")
      .doc(this.id).get().then(doc => {
        this.card = doc.data();
        this.card.id = doc.id;   
      })
  },

  name: "oglas-detalji",

  components: {
    Oglas
  },
}

</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>