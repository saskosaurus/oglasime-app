<template>
  <div class="row">
    <div class="col-4" >
          <div class="naslov"> <h1 style="position:relative; float:left; left:35%; "> Pretraga</h1> </div>
          <br>

        <label for="zupanijafirme"style="font-size:20px"> <strong> Pretraži po riječi </strong></label>
      <!--forma za pretragu po rijeci -->
      <form >
         <input v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="naziv,email,oib" aria-label="Search">
      </form>
      <br>
          <router-link to="/pretrazizupanije"> <button class="btn btn-secondary ml-0" style="background-color:#4CAF50;position:relative;"> Pretraži po županiji </button> </router-link>
        <br> <br>
        <router-link to="/pretrazidjelatnosti"> <button class="btn btn-secondary ml-0" style="background-color:#4CAF50;position:relative;"> Pretraži po djelatnosti </button> </router-link>
      <br>
    </div>
    <div class="col-8">
      <!--ako je korisnik autentificiran prikazi filtrirane oglase -->
      <div v-if="authenticated">
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in filteredCards">
          <Oglas :info="card"/>
        </div>
      </div>
    </div> 
  </div>
</template>


<script>
import store from '@/store.js'
import Oglas from "@/components/Oglas.vue";

export default{
  data() {
    return store;
  },



  computed: {
    //filtriranje oglasa po nazivufirme ili oibu ili emailu
    filteredCards() { 
      return this.cards.filter(card => card.nazivfirme.includes(this.searchTerm) ||  card.oib.includes(this.searchTerm) || card.email.includes(this.searchTerm));
    },
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
    },
    
  },
  components: {
    Oglas
  },

}

</script>

<style>

.naslov{
position:relative;
width: 100%;
height:50px;


}

</style>