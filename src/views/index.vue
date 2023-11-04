<template>
  <div id="app">
    <h1>Test Index Page</h1>
    <p>Hello world!</p>

    <!-- Import the components -->
    <Test />
  </div>
</template>

<script>
import Test from '../components/test.vue';

export default {
  components: {
    Test // Register 'Test' component
  }
};
</script>

<style scoped>
@import '../assets/css/scrollbar.css';

#app {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: aquamarine;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
