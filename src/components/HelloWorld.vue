<template>
  <div class="hello">
    <p>
      For managing Boxy Accounts Add, Update, Delete, List
    </p>
    <h3>check out the</h3>
    <ul>
      <li>
        <a href="https://boxy-resvona.netlify.app/" target="_blank" rel="noopener">Platform</a>.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
