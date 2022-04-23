<template>
  <div class="List">
    <div >
      <table >
        <thead >
          <tr >
            <th>name, Id</th>
            <th>bio</th>
            <th>
              socials
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="name"> 
              <span>{{ user.name }}</span>
              <span class="user-id">{{ user.id }}</span>
              </td>
            <td> {{ user.bio }} </td>
            <td>
              <span class="social" v-for="(social, index) in user.socials" :key="index">
                <span class="platform">{{ social.platform }} </span>
                <span>{{ social.name }} </span>
                <a :href="social.link" target="_blank">{{ social.link }} </a>
              </span>
              </td>
              <td>
                <a class="edit" :href="'/show/' + user.id">edit</a>
              </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../assets/table.scss";
  .name {
    display: flex;
    flex-direction: column;
    .user-id {
      font-size: 11px;
      color: rgb(11, 116, 116);
    }
  }
</style>

<script>

import { getDocs, collection } from "firebase/firestore";
import db from '../api/firebase'
export default {
  name: 'ListAccount',
  data () {
    return {
      users: [],
      found: 1,
      welcome: '',
    }
  },
  components: {
  },
  async mounted() {
    

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      var user = {
        'id': doc.id,
        'name': doc.data().name,
        'bio': doc.data().bio,
        'socials': doc.data().socials,
      };
      this.users.push(user);
      console.log(user);
    });
  },
}
</script>
