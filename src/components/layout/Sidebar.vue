<template>
  <aside class="k-sidebar">
    <div class="k-sidebar__header" @click="gotoHomePage()">
      <img class="k-sidebar__header--image" src="@/assets/images/logo.png" alt="kapital bank" />
    </div>
    <h4 class="text-center mt-5">Other payment categories</h4>
    <div class="k-sidebar__content">
      <k-app-menu></k-app-menu>
    </div>
  </aside>
</template>

<script>
import Menu from './Menu.vue';

export default {
  components: {
    'k-app-menu': Menu,
  },
  methods:{
    gotoHomePage(){
      this.$router.push('/')
    }
  }
};
</script>
