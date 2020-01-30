<template>
  <div id="app">
      <div class="bg-gradient" >
        <div class="container">
          <div class="row">
            <div class="col">
              <nav class="navbar navbar-expand-lg navbar-light mb-2">
                <router-link class="navbar-brand" :to="{name: 'posts'}">
                <img src="/images/logo1.png" width="80" >
                 <h1 style="color: white; text-shadow: 3px 3px 3px black;">|   Oglasi me</h1>
              </router-link>
              <div class="divide" style="width:20%;" > </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!--ako nije autentificiran prikazi login button i usmjeri na login -->
                <router-link v-if="!authenticated" class="btn btn-info my-2 my-sm-0 mr-2" to="/login">Login</router-link>
                <!--ako je autentificiran prosiri navbar s dodatnim mogucnostima -->
                <span v-if="authenticated">
                  
                  <button @click="newOglas()" class="btn btn-info my-2 my-sm-0 mr-2" >Dodaj oglas</button>
                  <button @click="searchOglas()" class="btn btn-info my-2 my-sm-0 mr-2" >Pretrazi</button>
                  <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
                  <router-link to="/editprofile"> <button class="btn btn-info my-2 my-sm-0 mr-2" >Uredi profil</button></router-link>
                  {{ nickname }}
                  <router-link to="/editprofile"> <img src="user.png" style="max-width:50px; max-height:50px; border-radius:50%;"> </router-link>   
                </span>
                <!--ako nije autentificiran prikazi signup button i preusmjeri na registraciju -->
                <router-link v-if="!authenticated" class="btn btn-outline my-2 my-sm-0 mr-2" to="/signup" style="border:2px solid white;">Signup</router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </div>

    <div class="container" >
        
      <router-view/>

    </div>

    
  </div>
</template>

<script type="text/javascript">
import store from '@/store.js'

export default {
  data () {
    return store;
  },


  
  methods: {
    // odjavljivanje korisnika s baze
    logout() {
      firebase.auth().signOut()
    },
    // usmjerava rutu na novi oglas
    newOglas() {
      this.$router.push({name: 'novioglas'}).catch(err => console.log(err))
    },
    // usjmerava rutu na trazilicu
    searchOglas() {
      this.$router.push({name: 'pretrazi'}).catch(err => console.log(err))
    },
  },

  mounted () {
    
    //provjera dal je korisnik autentificiran
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Korisnik ulogiran " + user.email )
        this.authenticated = true
        //dohvacanje korisnickih podataka iz baze
         db.collection("korisnici")
          .doc(user.email)
          .get()
          .then(doc => {
              if (doc.exists) {
                console.log("Podaci o korisniku:", doc.data());
                this.tipKorisnika = doc.data().tipProfila;
                this.nickname = doc.data().nick;
              } else {
                console.log("No such document!");
              }
              
              
          });
        this.userEmail = user.email;
        
        //ako je korisnik ulogiran preusmjeri na posts,ako nije vraca nas na login ponovo
        if (this.$route.name === 'login')
          this.$router.push({name: 'posts'}).catch(err => console.log(err))
      }
      else {
        console.log("Korisnik nije ulogiran")
        this.authenticated = false
        if (this.$route.name !== 'login')
          this.$router.push({name: 'login'}).catch(err => console.log(err))
      }
    });
    //listener,stvara se snimku dokumenta i mjenja se svaki put kad se azurira dokument 
    db.collection("posts").orderBy("posted_at", "desc").limit(10)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type !== "added") return
            //deklaracija konstante card i njezine vrijednosti spremljene u bazi
            const card = {
              id: change.doc.id, 
              nazivfirme: data.imepoduzeca ,
              imepoduzeca: data.imepoduzeca,
              url: data.url,
              email: data.email, 
              title: data.djelatnost, 
              posted_at: data.posted_at, 
              comments: data.comments,
              podrucje: data.zupanija,
              oib: data.oib,
              nick: data.nickname,
             }
            this.cards.unshift(card)
        });
        //sortiranje kartica po datumu objave
        this.cards.sort((a, b) => {
          return b.posted_at - a.posted_at
        })
    });
  }
}
</script>

<style lang="scss">
body {
  background-image: url("bck1.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  
  
}

h1{
font-family:helvetica;
font-size:25px;
float:right;
position:relative;
top:15px;

}

.bg-gradient {
  background-image: linear-gradient(to bottom right,  #ebadff, #d9ffff);
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
  padding: 10px;
}

nav.navbar {
  a {
    svg {
      border-right: #aaa 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }

    img {
      position: relative;
      height:100%;
    }
  }
}

.btn-info{
  background-color: transparent;
  border:2px solid white;
  color:black;
}

.btn-info:hover{
  background-color: transparent;
  border-color: rgb(25, 138, 245);
  color:rgb(25, 138, 245);
}

</style>
