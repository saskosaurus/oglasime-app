<template>
  <!--ako je korisnik autentificiran prikazi sve oglase  -->
  <div v-if="authenticated" >
    <br>
    
    <!--placeni oglasi  -->
    
    <div class="placenioglasi" >
      <h1 style="float:left; position:relative; left:40%; color:white; text-shadow: 0px 2px 5px black; "> <strong> Placeni oglasi  </strong></h1>
      <br><br><br>
      <div @click="gotoDetails(card)" :key="card.id" v-for="card in placeniOglasi" style="position:relative; left:40%;">
        <Oglas :info="card"/>
      </div>
    </div>

    <!--obicni oglasi  -->
    <div class="oglasi" >
      <h1 style="float:left; position:relative; left:40%; color:white; text-shadow: 0px 2px 5px black; "> <strong> Najnoviji oglasi  </strong></h1>
      <br><br><br>
      <div @click="gotoDetails(card)" :key="card.id" v-for="card in filteredCards" style="position:relative; left:40%;">
        <Oglas :info="card"/>
      </div>
    </div>




  </div>

</template>

<script>
import Oglas from "@/components/Oglas.vue";
import store from "@/store.js";

export default {
  data() {
    return store;
  },

  //dohvacanje svih oglasa iz kolekcije posts na firebaseu
  created(){
   db.collection("posts").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  },
  
  //vracanje podataka o oglasima
  computed: {
    filteredCards() {
      return this.cards;
    },
    placeniOglasi(){
      
      return this.cards.filter(card => card.nazivfirme.includes("Facebook"));
    }
  },

  

  name: "posts",

  methods: {
    gotoDetails(card) {
      this.$router.push({path: `oglas/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'novioglas'}).catch(err => console.log(err))
    },
    search() {
      this.$router.push({name: 'pretrazi'}).catch(err => console.log(err))
    }
  },
  
  components: {
    Oglas
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px;
    background-image: linear-gradient(to bottom right,  #d9ffff, #ebadff);
    color:black;
    border-color: #d9ffff;
    border-radius:15px;
  }
</style>