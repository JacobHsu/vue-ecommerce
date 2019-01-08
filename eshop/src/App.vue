<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>

    <!-- https://getbootstrap.com/docs/4.1/components/buttons/ -->
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button>
    <a href="#">href color</a>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  created() {
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; 
    this.axios.get(api).then((response) => {
      console.log(111,response.data)
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
