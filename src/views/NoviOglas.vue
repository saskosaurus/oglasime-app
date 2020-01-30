<template>

<div class="container">
  <div class="row">
    <div class="col-sm">
      
    </div>
    <!--forma za predaju oglasa,kao kod signupa -->
    <div class="col-sm" style="position:relative; left:30%">
      <h1 style="float:left"> Predaj oglas </h1>
      <br><br><br>
     <form @submit.prevent="postImage" class="mb-5"> 
      <div class="form-group">
            <label for="nazivfirme"><strong> Naziv firme </strong></label>
            <input
              v-model="nazivFirme"
              type="nazivfirme"
              class="form-control"
              id="nazivfirme"
              placeholder="Unesi naziv poduzeca"
            />
          </div>
          <div class="form-group">
            <label for="nazivfirme"><strong>Oib firme </strong></label>
            <input
              v-model="oibFirme"
              type="oibfirme"
              class="form-control"
              id="oibfirme"
              placeholder="Unesi oib firme"
            />
          </div>
          <div class="form-group">
            <label for="kontaktfirme"><strong>Kontakt </strong></label>
            <input
              v-model="kontaktFirme"
              type="kontaktfirme"
              class="form-control"
              id="kontaktfirme"
              placeholder="Unesi kontakt(email/broj)"
            />
          </div>
          <div class="form-group">
            <label for="djelatnostfirme"><strong>Djelatnost firme</strong></label>
              <select
                v-model="djelatnostFirme"
                id="djelatnostfirme"
                class="form-control form-control-lg"
                placeholder="Odaberi djelatnost"
              >
                <option v-for="k in djelatnosti">{{k}}</option>
              </select>
          </div>
          <div class="form-group">
            <label for="zupanijafirme"><strong>Zupanija firme</strong></label>
            <select
              v-model="zupanijaFirme"
              id="zpanijafirme"
              class="form-control form-control-lg"
            >
              <option v-for="k in zupanije">{{k}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="opisfirme"><strong>Opis </strong></label>
            <input
              v-model="opisFirme"
              type="opisfirme"
              class="form-control"
              id="opisfirme"
              placeholder="Unesi opis"
            />
          </div>
     <!--pohranjivanje slike u imagedata -->     
    <croppa :width="400" :height="400" v-model="imageData" ></croppa>
    <button type="submit" class="btn btn-secondary ml-2" style="background-color:#4CAF50">Predaj oglas</button>
  </form>
    </div>
    <div class="col-sm">
     
    </div>
  </div>
</div>
  
</template>

<script>
import Oglas from "@/components/Oglas.vue";
import store from "@/store.js";

export default {
  data() {
    return store
    
  },
  name: "novioglas",
  methods: {
    postImage() {
      //postavljanje oglasa u storage sa svim njegovim informacijama
      this.imageData.generateBlob(blobData => {
        if (blobData != null) {
          let imageName = this.userEmail + "/" + Date.now() + ".png";
          let naziv= this.nazivFirme;
          let kontaktFirme = this.kontaktFirme;
          let djelatnostFirme = this.djelatnostFirme;
          let zupanijaFirme = this.zupanijaFirme;
          let opisFirme = this.opisFirme;
          let oibFirme = this.oibFirme;
          
          
          storage
            .ref(imageName)
            .put(blobData)
            .then(result => {
              result.ref.getDownloadURL()
                .then(url => {
                  db.collection("posts")
                    .add({
                      email: this.userEmail,
                      posted_at: Date.now(),
                      url: url,
                      imepoduzeca: naziv,
                      kontakt: kontaktFirme,
                      djelatnost: djelatnostFirme,
                      zupanija: zupanijaFirme,
                      opis: opisFirme,
                      oib: oibFirme,
          
                    
                    })
                    .then(docRef => {
                      this.imageData = null;
                      this.$router.push({name: "posts"})
                    })
                    .catch(e => {
                      console.error("Error adding document: ", error);
                    });
                })
                .catch(e=> {
                  console.error(e)
                })
            })
            .catch(e => {
              console.error(e)
            })
        }
      }); 
    }
  }
};
</script>

<style lang="scss">

.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}

.btn-post {
  width: 200px;
}

.croppa-container {
  border: 3px dashed gray;
  width: 400px;
  display: block;
  margin-bottom: 10px;
}
</style>