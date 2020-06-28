<template>
  <div id="app">
    <router-view name="header" />

    <router-view name="default" />
  </div>
</template>
<script>
export default {
  name: "app",
  components: {},
  data: () => {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
