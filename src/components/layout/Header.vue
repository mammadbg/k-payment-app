<template>
  <v-app-bar app color="#fff" dark elevation="0" style="z-index:1000; border-bottom: 1px solid #dadada">
    <v-row>
      <v-col>
        <v-app-bar-nav-icon @click.stop="closeMenu" color="primary"></v-app-bar-nav-icon>
      </v-col>
      <v-col class="d-flex align-center justify-end">
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
  }),
  props: {
    value: Boolean,
  },
  methods: {
    closeMenu() {
      this.drawer = !this.drawer;
      this.$emit('input', this.drawer);
    },
    closeSideBarForGlobal() {
      this.drawer = false;
      this.$emit('input', this.drawer);
    },
    initDrawer(val) {
      this.drawer = val;
    },
  },

  mounted() {
    this.initDrawer(this.value);
    this.$root.$on('closeSideBarMenu', () => {
      this.closeSideBarForGlobal();
    });
  },
  created() {
    this.$eventHub.$on('F_DRAWER', this.initDrawer);
  },
  beforeDestroy() {
    this.$eventHub.$off('F_DRAWER', this.initDrawer);
    this.$root.$off('closeSideBarMenu');
  },
};
</script>
