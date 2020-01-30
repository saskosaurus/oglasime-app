<template>
<div>
  <div class="row">
    <div class="col">
      
    </div>
  </div>
  <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <h1 class="text-center mb-5" style="left:-30%;">Prijava</h1>
        <br><br><br>
        <!--forma za login,aktivira se klikom i prelazi na metodu login -->
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email adresa</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesi email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Lozinka</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Unesi lozinku">
          </div>
          <button type="submit" class="btn btn-secondary " style=" background-color:#4CAF50;">Prijavi me</button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    // na bazu saljemo uneseni email i password i loginamo se
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        console.log(error)
      });
    }
  }
}
</script>
