<template>
  <div>
    <div class="row">
      <div class="col">
        
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <h1 class="text-center mb-5" style="left:-30%;">Registracija</h1>
        <br><br><br>
        <!--forma za signup,svaki input za određeno polje varijable iz store.js povezan je s v-model -->
        <form @submit.prevent="signup">
          <!--ukoliko neko polje nije pravilno uneseno vraca grešku -->
          <div v-if="errorMessage" class="alert alert-danger">
            <strong>greška</strong>
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="emailField">Email adresa</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailField"
              aria-describedby="emailHelp"
              placeholder="Unesi email adresu"
            />
          </div>
          <div class="form-group">
            <label for="nickname">Nickname</label>
            <input
              v-model="nickname"
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
            <label for="Kontakt">Kontakt</label>
            <input
              v-model="kontaktKorisnika"
              type="kontaktKorisnika"
              class="form-control"
              id="kontaktKorisnika"
              placeholder="Unesi kontakt broj/email"
            />
          </div>
          <div class="form-group">
            <label for="passwordField">Lozinka</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="passwordField"
              placeholder="Unesi lozinku"
            />
          </div>
          <div class="form-group">
            <label for="confirmPasswordField">Potvrdi lozinku</label>
            <input
              v-model="password2"
              type="password"
              class="form-control"
              id="confirmPasswordField"
              placeholder="Ponovo unesi lozinku"
            />
          </div>

          <!--<croppa :width="400" :height="400" v-model="profilePic" ></croppa> -->

          <button type="submit" class="btn btn-secondary mt-5" style="background-color:#4CAF50">Submit</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      errorMessage: "",
      email: "",
      nickname: "",
      datumRodjenja: "",
      adresaKorisnika: "",
      kontaktKorisnika: "",
      password: "",
      password2: "",
      profilePic: null,
    };
  },

  mounted() {
    
  },

  methods: {
    //firebaseova metoda za signup,radi korsnika s unesenim mailom i passwordom na bazi i sprema u autentifikaciju
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          
          //postavljanje unesneni email kao id,jer je jedinstven,samo se jednom moze registirati tim emailom 
          let id = this.email;

          //postavljanje unesenih korisnickih podataka u kolekciju korisnici na firebaseu
          db.collection("korisnici")
            .doc(id)
            .set({
              email: this.email,
              password: this.password,
              nick: this.nickname,
              datumRodjenja: this.datumRodjenja,
              adresaKorisnika: this.adresaKorisnika,
              kontaktKorisnika: this.kontaktKorisnika,
              profilePic: null,
            })
            .then(function() {
              console.log("Document successfully written!");
              
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = error.message;
        });
      //kada sve to zavrsi preusmjerava na glavnu stranicu
       this.$router.push({name: 'posts'}).catch(err => console.log(err)) 
    }
    
  }
};
</script>