<template>
  <v-list dark rounded class="k-menu py-0 px-0">
    <v-list-item-group v-model="model">
      <v-list-item v-for="(item, i) in items" :key="i" @click="goToRoute(item)">
        <v-list-item-icon>
          <v-icon v-text="item.icon" color="grey lighten-1"></v-icon>
        </v-list-item-icon>
        <v-list-item-content color="grey darken-4">
          <v-list-item-title
            v-text="item.name"
            color="grey darken-4"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import global from "@/common/global";
import api from "@/api";
export default {
  data: () => ({
    items: [],
    model: 1,
  }),
  mixins: [global],
  methods: {
    filterCategories() {
      let array = api.categories;
      let filteredArray = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.inDashboard != true) {
          filteredArray.push(element);
        }
      }
      this.items = filteredArray;
    },
    goToRoute(item) {
      this.$router.push(item.url);
    },
  },
  created(){
    this.filterCategories();
  }
};
</script>


