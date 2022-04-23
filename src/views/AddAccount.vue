<template>
  <div class="Add">
    <div class="form">
    <h1>Add Account</h1>
      <div class="error" v-if="error">
        don't leave things blank
      </div>
      <div class="input">
        <label for="">name</label>
        <input type="text" v-model="name" placeholder="name">
      </div>
      <div class="input">
        <label for="">bio</label>
        <input type="text" v-model="bio" placeholder="bio">
      </div>
      <div class="input">
        <label for="">social</label>
        <div class="socials" v-for="(social, index) in socials" :key="index">
          <div class="row">
            <select v-model="social.platform" id="" placeholder="platforms">
              <option disabled selected value> -- select platform -- </option>
              <option v-for="platform in platforms" :value="platform.name" :key="platform.name">{{ platform.name }}</option>
            </select>
            <input type="text" v-model="social.link" placeholder="link">
            <input type="text" v-model="social.name" placeholder="name">
          </div>
          <div class="remove" v-if="socials.length > 1">
            <button @click="remove(index)">-</button>
          </div>
        </div>
        <div class="add-btn">
            <button @click="addSocial">+</button>
          </div>
      </div>
      <button @click="submit">submit</button>
    </div>
    <div class="success-modal" v-if="successModal">
      <h3>Added successfully</h3>
      <span>Id is: </span>
      <mark>{{createdAccountId}}</mark>
      <a :href="'/show/' + createdAccountId">show account</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/account.scss";
  h1 {
    text-align: center;
  }
.Add {
  display: flex;
  justify-content: center;

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
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc  } from "firebase/firestore";
import { getDocs  } from "firebase/firestore";

export default {
  
  name: 'AddAccount',
  data () {
    return {
      db: '',
      bio: '',
      name: '',
      platforms: [],
      socials: [
        {
          platform: '',
          link: '',
          name: '',
        }
      ],
      successModal: false,
      createdAccountId: '',
      error: false,
    }
  },
  methods: {
      async submit () { 
        if(this.name == ''|| this.bio == ''|| this.socials.length < 1) {
          this.error = true;
          return null;
        }
        try {
            const docRef = await addDoc(collection(this.db, "users"), {
              name: this.name,
              bio: this.bio,
              socials: this.socials
          });
          this.createdAccountId = docRef.id;
          this.successModal = true;
          this.name = '';
          this.bio = '';
          this.socials = [
            {
              platform: '',
              link: '',
              name: '',
            }
          ];

        } catch(e) {
          console.log("errors: ", e);
        }
      },
    addSocial() {
      this.socials.push({
        platform: '',
        link: '',
        name: '',
      })
    },
    remove(index) {
      this.socials.splice(index, 1);
    }
  },
  components: {
  },
  async mounted() {
    const firebaseConfig = {
      apiKey: "AIzaSyCM_wS47P5iShZGSTJwFO6HNWduKubTAHE",
      authDomain: "boxy-7f1ba.firebaseapp.com",
      projectId: "boxy-7f1ba",
      storageBucket: "boxy-7f1ba.appspot.com",
      messagingSenderId: "205377736356",
      appId: "1:205377736356:web:14638563216608303c6031"
    };
    
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);

    const querySnapshot = await getDocs(collection(this.db, "platforms"));
      querySnapshot.forEach((doc) => {
        var platform = {
          'name': doc.data().name,
        };
        this.platforms.push(platform);
      });
      console.log(this.platforms);
    }
}
</script>
