<template>
  <div class="Add">
    <div class="form">
    <h1>Login</h1>
      <div class="error" v-if="error">
        error Credentials
      </div>
      <div class="input">
        <label for="">name</label>
        <input type="text" v-model="name" placeholder="name">
      </div>
      <div class="input">
        <label for="">password</label>
        <input type="text" v-model="password" placeholder="bio">
      </div>
      <button @click="login">Login</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/account.scss";
  h1 {
    text-align: center;
  }
.form {
  display: flex;
  width: 30rem;
  flex-direction: column;
}

.success-modal {
  position: absolute;
  z-index: 2;
  background: rgb(6, 194, 115);
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
  text-align: center;
  font-weight: 600;
}
</style>

<script>
import credentials from '../api/authentication'

export default {
  
  name: 'LoginView',
  data () {
    return {
      name: '',
      password: '',
      error: false
    }
  },
  methods: {
    login() {
        var userInputCombined = this.name + ', ' + this.password
        if(userInputCombined == credentials) {
            sessionStorage.setItem('authenticated', userInputCombined);
            this.$router.push("list");
        }
        else {
          this.error = true;
        }
    }
  },
  components: {
  },
  mounted() {
  }
}
</script>
