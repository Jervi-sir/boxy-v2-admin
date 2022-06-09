<template>
  <div class="List">
    <h1>Edit Account</h1>
    <h3>Original data</h3>
    <table class="user">
      <tr class="row">
        <td>id:</td>
        <td>{{userId}}</td>
      </tr>
      <tr class="row">
        <td>name:</td>
        <td>{{user.name}}</td>
      </tr>
      <tr class="row">
        <td>bio:</td>
        <td>{{user.bio}}</td>
      </tr>
      <tr class="row">
        <td>socials:</td>
        <td>
          <div class="social">
            <div class="content" v-for="(social, index) in user.socials" :key="index">
              <span class="platform">{{ social.platform }}</span>
              <span class="name">{{ social.name }}</span>
              <a :href="social.link" class="link">{{ social.link }}</a>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <div class="edit">
      <h3>Update account</h3>
      <div class="error" v-if="error">
        don't leave things blank
      </div>
      <div class="form">
        <div class="input">
          <label for="">name</label>
          <input type="text" v-model="user.name" placeholder="name">
        </div>
        <div class="input">
          <label for="">bio</label>
          <input type="text" v-model="user.bio" placeholder="bio">
        </div>
        <div class="input">
          <label for="">social</label>
          <div class="socials" v-for="(social, index) in user.socials" :key="index">
            <div class="row">
              <select v-model="social.platform" placeholder="platforms">
                <option disabled selected value> -- select platform -- </option>
                <option v-for="platform in platforms" :value="platform.name" :key="platform.name" :selected="platform.name == social.platform">{{ platform.name }}</option>
              </select>
              <input type="text" v-model="social.link" placeholder="link">
              <input type="text" v-model="social.name" placeholder="name">
            </div>
            <div class="remove" v-if="user.socials.length > 1">
              <button @click="remove(index)">-</button>
            </div>
          </div>
          <div class="add-btn">
              <button @click="addSocial">+</button>
            </div>
        </div>
        <button @click="showUpdateModal">update</button>
      </div>
      <div class="delete-acc">
        <button @click="showDeleteModal">delete</button>
      </div>
      <div class="modal modal-delete" v-if="deleteModal">
        <h4>are you sure to delete this account</h4>
        <h5>please copy id <mark>{{ userId }}</mark> </h5>
        <input type="text" v-model="deleteConfirmation">
        <div class="actions">
          <button class="cancel-btn"  @click="hideDeleteModal">Cancel</button>
          <button class="delete-btn"  @click="deleteAcc" :disabled="deleteConfirmation != userId" >delete</button>
        </div>
      </div>
      <div class="modal modal-update" v-if="updateModal">
        <h4>do you want to update this account</h4>
        <div class="actions">
          <button class="update-btn" @click="update">update</button>
          <button class="cancel-btn" @click="hideUpdateModal">Cancel</button>
        </div>
      </div>
      <div class="successUpdate" v-if="successUpdate">
        <span>Updated Successfully</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/account.scss";
  .successUpdate {
    background: green;
    text-align: center;
    color: white;
  }
  .modal {
    position: absolute;
    top: 50%;
    background: rgb(223, 220, 216);
    border-radius: 1rem;
    padding: 2rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    .actions {
      display: flex;
      flex-direction: row-reverse;
      gap: 2rem;
    }
    button {
        padding: 0.5rem 1rem;
        color: white;
    }
    .cancel-btn {
        background: grey;
    }
    .delete-btn {
      background: red;
    }
    .update-btn {
      background: rgb(88, 190, 224);
    }

    .delete-btn:disabled {
      background: rgb(99, 31, 31);
      color: grey;
    }
  }
.error {
  color: red;
  text-align: center;
  font-weight: 600;
}

</style>

<script>
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import db from '../api/firebase'

export default {
  data () {
    return {
      user: '',
      docRef: '',
      platforms: [],
      deleteConfirmation: '',
      deleteModal: false,
      updateModal: false,
      successUpdate: false,
      error: false,
    }
  },
  methods: {
    async update () { 
      if(this.user.name == ''|| this.user.bio == ''|| this.user.socials.length < 1) {
          this.updateModal = false;
          this.error = true;
          return null;
        }
      try {
        await updateDoc(this.docRef, {
          name: this.user.name,
          bio: this.user.bio,
          socials: this.user.socials
        });
          this.successUpdate = true;
          this.updateModal = false;
      } catch(e) {
        console.log(e);
      }
    },
    addSocial() {
      this.user.socials.push({
        platform: '',
        link: '',
        name: '',
      })
    },
    async deleteAcc() {
      try {
        await deleteDoc(this.docRef);
        this.$router.push('/list');

      } catch(e) {
        console.log(e);
      }
    },
    showDeleteModal() {
      this.deleteModal = true;
    },
    hideDeleteModal() {
      this.deleteModal = false;
    },
    showUpdateModal() {
      this.updateModal = true;
    },
    hideUpdateModal() {
      this.updateModal = false;
    },
    remove(index) {
      this.user.socials.splice(index, 1);
    }
    
  },
  
  name: 'HomeView',
  components: {
  },
  
  async mounted() {
    const userid = window.location.pathname;
    console.log(userid);
    
    const querySnapshot = await getDocs(collection(db, "platforms"));
      querySnapshot.forEach((doc) => {
        var platform = {
          'name': doc.data().name,
        };
        this.platforms.push(platform);
      });
      
    try {
      this.docRef = doc(db, "users", userid.replace('/show/', ''));
      const docSnap = await getDoc(this.docRef);
      this.userId = docSnap.id;
      this.user = docSnap.data();
      console.log(this.user);
    } catch(e) {
      console.log(e);
    }

  },
  
}
</script>
