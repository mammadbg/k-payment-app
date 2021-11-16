<template>
  <div>
    <h1 class="pt-5">{{category.name}}</h1>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="(pro, index) in category.providers"
        :key="index"
        
      >
        <v-card elevation="2" height="200" class="dashboard--card" @click="gotoPayment(pro)">
          <v-card-title>
            <h5>{{ pro.name }}</h5>
          </v-card-title>
          <v-icon :color="pro.color">mdi-chart-bubble</v-icon>
          <v-card-actions>
            <router-link to="/dummyPage">Make payment</router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "KapitalTaskProviders",

  data() {
    return {
      id: "",
      category: {},
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.showMatchingProviders();
  },
  mounted() {},
  methods: {
      //in a REAL situation it could be getPaymentCategories(id) ...
    showMatchingProviders() {
      const arr = api.categories;
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.id == this.id) {
          this.category = element;
          break;
        }
      }
    },
    gotoPayment(provider){
        this.$router.push(`/payment/${this.category.id}/${provider.id}`)
    }
    
  },
};
</script>

