<template>
  <div class="row">
    <div class="col-4" >
      <div class="naslov"> <h1 style="position:relative; float:left; left:35%; "> Pretraga </h1> </div>
      <br>
      <br>
      <form @submit="pretraziDjelatnosti"> 
        <div class="form-group">
          <label for="djelatnostfirme" style="font-size:20px"><strong> Pretraži po djelatnosti </strong> </label>
          <select
            v-model="trazenaDjelatnost"
            id="djelatnostfirme"
            class="form-control form-control-lg"
          >
            <option v-for="k in djelatnosti">{{k}}</option>
          </select>
        </div>
      </form>
    <br>
    </div>

    <div class="col-8">
    
      <div v-if="authenticated">
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in pretraziDjelatnosti">
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
    pretraziDjelatnosti(){
      let trazenaDjelatnost = this.trazenaDjelatnost;
      console.log(this.trazenaDjelatnost);
      return this.cards.filter(card => card.title.includes(this.trazenaDjelatnost) );
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