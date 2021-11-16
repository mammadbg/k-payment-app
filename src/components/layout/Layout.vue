<template>
  <v-app>
    <v-navigation-drawer width="300" v-model="drawer" app >
      <k-app-sidebar></k-app-sidebar>
    </v-navigation-drawer>

    <k-app-header v-model="drawer"></k-app-header>

    <v-main>
      <div class="k-page-container">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import '@/styles/layout/_layout.scss';
import '@/styles/layout/_page.scss';

export default {
  data: () => ({
    drawer: true 
  }),
  watch: {
    drawer(){
      this.$eventHub.$emit('F_DRAWER', this.drawer);
    },
  },
  components: {
    'k-app-sidebar': Sidebar,
    'k-app-header': Header,
  },
};
</script>
