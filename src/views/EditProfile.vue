<template>

<div class="container">
  <div class="row">
    <div class="col-sm">
      
    </div>
    
    <div class="col-sm">
        
      <h1 class="text-center mb-5" style="left:-30%;">Uredi profil</h1>
        <br><br><br>
        <!--forma za uredjivanje podataka o korisniku -->
        <form @submit.prevent="updateData">
         
          <div class="form-group">
            <label for="nickname">Nickname</label>
            <input
              v-model="newNickname"
              type="nickname"
              class="form-control"
              id="nickname"
              placeholder="Unesi nadimak"
            />
          </div>
          <div class="form-group">
            <label for="datumRodjenja">Datum rođenja</label>
            <input
              v-model="datumRodjenja"
              type="datumRodjenja"
              class="form-control"
              id="datumRodjenja"
              placeholder="Unesi datum rođenja"
            />
          </div>
          <div class="form-group">
            <label for="adresa">Adresa</label>
            <input
              v-model="adresaKorisnika"
              type="adresa"
              class="form-control"
              id="adresaKorisnika"
              placeholder="Unesi adresu stanovanja"
            />
          </div>
          <div class="form-group">
            <label for="Kontakt">Kontakt </label>
            <input
              v-model="kontaktKorisnika"
              type="kontaktKorisnika"
              class="form-control"
              id="kontaktKorisnika"
              placeholder="Unesi kontakt broj/email"
            />
          </div>
          <button type="submit" class="btn btn-secondary mt-5" style="background-color:#4CAF50">Submit</button>
        </form>
    </div>


    <div class="col-sm">
      
    </div>
  </div>
</div>

</template>


<script>
import store from '../store.js';
import Oglas from "@/components/Oglas.vue";


export default {
    
    props: [ "info"],
    
    data () {
      return {
        global: store,
        email: "",
        nickname: "",
        password: "",
        password2: "",
        datumRodjenja: "",
        adresaKorisnika: "",
        kontaktKorisnika: "",
        tipProfila: ["Javni", "Privatni"],
        odabraniTipProfila: "",
        newNickname: "",
        snick: "",
       
    }
  },


//dohvaca podatke s baze
  mounted(){
    var users = firebase.auth().currentUser;
    var cEmail;

    if (users != null) {
      let cNickname = users.nickname;
      let cEmail = users.email;
      console.log("trenutni email: "+ cEmail);
      return cEmail;
    }
  

  },

  
//update unesenih podataka na bazu pomocu firebase funkcije update
  methods: {
  updateData(){
    
    var users = firebase.auth().currentUser;
    let id = users.email;

    db.collection("korisnici")
            .doc(id)
            .update({
              nick: this.newNickname,
              datumRodjenja: this.datumRodjenja,
              adresaKorisnika: this.adresaKorisnika,
              kontaktKorisnika: this.kontaktKorisnika,
             
            })
            .then(function() {
              
              console.log("Document successfully written!");
              
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
  },
  

  },

   components: {
    Oglas
  },



}


</script>