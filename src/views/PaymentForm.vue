<template>
  <div class="payment-container">
    <v-card class="px-4">
      <div class="d-flex">
        <h3 class="mr-2">{{ provider.name }}</h3>
        <v-icon :color="provider.color">mdi-chart-bubble</v-icon>
      </div>
      <v-form v-model="valid">
        <v-row class="justify-center">
          <v-col cols="12" md="6" lg="8">
            <v-text-field
              v-model="payment.phone"
              label="Phone number"
              placeholder="+994 55 1234567"
              v-mask="'+###-##-###-##-##'"
              :masked="true"
              value="false"
              type="tel"
              required
              outlined
              :rules="[required, checkPhoneValidation()]"
              clearable
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              v-model="payment.amount"
              label="Amount (AZN)"
              placeholder="0"
              type="number"
              hint="Min 1, max 200 AZN"
              prefix="₼"
              required
              outlined
              :rules="[required, checkMoneyValidation()]"
              clearable
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" lg="12">
            <v-text-field
              v-model="payment.card"
              label="Card Number"
              type="tel"
              hint="Enter 16 digit number on card"
              v-mask="'#### #### #### ####'"
              maxlength="19"
              required
              outlined
              :rules="[required, checkCardValidation()]"
              clearable
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              v-model="payment.expiration"
              label="Expiration date"
              hint="Enter expiration date of card"
              v-mask="'##/##'"
              type="tel"
              maxlength="5"
              required
              outlined
              :rules="[required, checkExpirationValidation()]"
              clearable
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              v-model="payment.cvv"
              label="CVV/CVC"
              hint="Enter 3 digit number on card"
              type="tel"
              required
              maxlength="3"
              outlined
              :rules="[required, checkCvvValidation()]"
              clearable
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              :disabled="disabled"
              color="success"
              class="mr-4"
              @click="makeNewPayment()"
            >
              Validate
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
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
      provider: {},
      valid: false,
      disabled: true,
      required: (value) => !!value || "Required.",
      payment: {
        phone: "+994",
        amount: null,
        card: "",
        expiration: "",
        cvv: null,
      },
      inputValidations: {
        phone: false,
        amount: false,
        card: false,
        expiration: false,
        cvv: false,
      },
      online: navigator.onLine
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.showMatchingProvider();
  },
  methods: {
    gotoPayment(provider) {
      this.$router.push(`/payment/${provider.id}`);
    },

    //------------
    //error handling
    //------------
    checkPhoneValidation() {
      if (this.payment.phone.length && this.payment.phone.length >= 17) {
        return true;
      } else {
        return "Enter valid phone number";
      }
    },
    checkMoneyValidation() {
      if (this.payment.amount != null && this.payment.amount <= 200) {
        return true;
      } else {
        return "Enter true amount of money";
      }
    },
    checkCardValidation() {
      if (this.payment.card.length && this.payment.card.length >= 19) {
        return true;
      } else {
        return "Enter valid card number";
      }
    },
    checkExpirationValidation() {
      if (this.payment.expiration && this.payment.expiration.length >= 5) {
        return true;
      } else {
        return "Enter valid expiration date";
      }
    },
    checkCvvValidation() {
      if (this.payment.cvv && this.payment.cvv.length >= 3) {
        return true;
      } else {
        return "Enter valid CVV/CVC";
      }
    },
    everthingIsValid() {
      if (
        this.payment.phone.length &&
        this.payment.phone.length >= 17 &&
        this.payment.amount != null &&
        this.payment.amount <= 200 &&
        this.payment.card.length &&
        this.payment.card.length >= 19 &&
        this.payment.expiration.length >= 5 &&
        this.payment.cvv.length &&
        this.payment.cvv.length >= 3
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    //------------
    //main methods
    //------------

    //in a REAL situation it could be getProviderById(id) ...
    showMatchingProvider() {
      const categories = api.categories;
      const categoryId = this.$route.params.category;
      const providerId = this.$route.params.id;

      for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (element.id == categoryId) {
          this.category = element;
          for (let n = 0; n < element.providers.length; n++) {
            const provider = element.providers[n];
            if (provider.id == providerId) {
              this.provider = provider;
            }
          }
        }
      }
    },
    generateReceipt() {
      const receipt = {
        id: Math.random().toString(36).slice(2),
        date: new Date().toISOString().slice(0, -4),
        details: [
          { k: "Service", v: this.provider.name },
          { k: "Subscriber", v: this.payment.phone.replace(/-/g, " ") },
        ],
        amount: {
          value: this.payment.amount,
          currency: "AZN",
        },
      };
      localStorage.setItem("bankReceipt", JSON.stringify(receipt));
    },
    generateCardDetails() {
      return {
        number: this.payment.card.replace(/\s/g, ""),
        exp_month: this.payment.expiration.slice(0, -3),
        exp_year: this.payment.expiration.slice(3, 5),
        cvv: this.payment.cvv,
      };
    },
    makeNewPayment() {
      this.generateReceipt();
      return new Promise(() => {
        api
          .makeNewPayment({
            phone: this.payment.phone.replace(/-/g, ""),
            amount: this.payment.amount,
            card: this.payment.card.replace(/\s/g, ""),
            expiration: this.payment.expiration,
            cvv: this.payment.cvv,
          })
          .then(() => {
            this.$router.push("/result");
          })
          .catch(() => {
            if (navigator.online) {
              alert('internet connection lost');
            }else{
              this.$router.push("/result");
            }
          });
      });
    },
  },
  beforeUpdate() {
    this.everthingIsValid();
  },
};
</script>
