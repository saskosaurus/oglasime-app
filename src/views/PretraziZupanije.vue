<template>
  <div class="row">
    <div class="col-4" >
          <div class="naslov"> <h1 style="position:relative; float:left; left:35%; "> Pretraga </h1> </div>
          <br>
          <br>
          <!--forma za pretragu po zupanijama,na klik neke zupanije sprema se u trazenu zupaniju i vrti se kroz funkciju pretrazi zupanije -->
          <form @submit="pretraziZupanije"> 
              <div class="form-group">
                <label for="zupanijafirme" style="font-size:20px"><strong> Pretraži po županiji </strong> </label>
                <select
                  v-model="trazenaZupanija"
                  id="zpanijafirme"
                  class="form-control form-control-lg"
                >
                <option v-for="k in zupanije">{{k}}</option>
                </select>
              </div>
          </form>
        <br>
    </div>

    <div class="col-8">
      <!--ako je korisnik autentificiran listaj filtrirane oglase po zupanijama i na njihov klik odvedi na detalje oglasa -->
      <div v-if="authenticated">
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in pretraziZupanije">
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
    // filtriranje oglasa po unesenoj trazenoj zupaniji i vracanje rezultata
    pretraziZupanije(){
      let trazenaZupanija = this.trazenaZupanija;
      console.log(this.trazenaZupanija);
      return this.cards.filter(card => card.podrucje.includes(this.trazenaZupanija) );
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