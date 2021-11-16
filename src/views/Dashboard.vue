<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="(category, index) in categories"
        :key="index"
        
      >
        <v-card elevation="2" height="300" class="dashboard--card" @click="gotoProvider(category)">
          <v-card-title>
            <h5>{{ category.name }}</h5>
          </v-card-title>
          <v-icon v-text="category.icon"></v-icon>
          <v-card-actions>
            <router-link to="/dummyPage">Make payment</router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        <p>
          Kapital Bankın təqdim etdiyi onlayn xidmətlərdən yararlanaraq evdən
          çıxmadan sürətli və etibarlı pul köçürmələri, kredit ödənişləri etmək,
          kart sifarişi vermək, arayış və çıxarışlar almaq hər zamankından daha
          asan və sürətlidir. Kartdan karta pul köçürmələrinizi, kommunal və
          stasionar ödənişlərinizi onlayn şəkildə edin. Nağd pulunuzu hesablar
          arasında və ya xarici hesablara sürətli şəkildə köçürün. Vaxtınıza və
          enerjinizə qənaət edin. Ödəniş etmək üçün Birbank mobil tətbiqindən və
          ya Kapital Bank veb saytından istifadə etməniz yetərlidir. Birbank
          online odeme xidmətindən istifadə etmək üçün sadəcə Birbank hesabınıza
          daxil olmağınız yetərlidir. Siz həmçinin Birbank online ödəniş sistemi
          ilə , əməliyyatlarınızı yadda saxlayaraq növbəti ödənişlərinizi daha
          sürətli etmə imkanından yararlana bilərsiniz. Kredit ödənişlərinizi və
          ya kredit sifarişlərinizi evdən çıxmadan yerinə yetirin. Kredit
          hesabınızdakı qalıq vəsaitin miqdarını öyrənib onlayn ödənişlər həyata
          keçirin. Ödənişlərinizi vaxtından əvvəl edərək gecikmiş ödəmə
          faizlərindən qaçının. Birbank mobil tətbiqi və Kapitalbank.az sayt
          vasitəsiylə bank əməliyyatlarınızı günün istənilən vaxtında növbə
          gözləmədən həyata keçirin. Onlayn bank xidmətləri ilə , Siz hesab
          tarixçənizə və əməliyyatlarınıza hər yerdən daxil olaraq
          ödənişlərinizi rahatlıqla baxa bilərsiniz incələyin. Sistem şəxsi
          məlumatlarınızı gizli saxlamaq və icazəsiz girişin qarşısını almaq
          üçün yüksək təhlükəsizlik sistemləri ilə qorunur.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    filterCategories() {
      let array = api.categories;
      let filteredArray = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.inDashboard == true) {
          filteredArray.push(element);
        }
      }
      this.categories = filteredArray;
    },
    gotoProvider(cat) {
      this.$router.push(`/providers/${cat.id}`);
    },
  },
  created() {
    this.filterCategories();
  },
};
</script>