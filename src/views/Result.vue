<template>
  <div class="payment-container d-block">
    <h4 class="w-100 mb-2">Bank receipt</h4>
    <v-data-table
      :headers="headers"
      :items="receiptData"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Transaction Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Date", value: "date" },
        { text: "Provider", value: "details" },
        { text: "Subscriber", value: "subscriber" },
        { text: "Amount", value: "amount" },
        { text: "Currency", value: "currency" },
      ],
      receiptData: [
        {
          id: '',
          date: '',
          details: '',
          subscriber: "",
          amount: null,
          currency: 'AZN'

        },
      ],
    };
  },
  methods:{
    getReceiptData(){
      const receipt = JSON.parse(localStorage.getItem('bankReceipt'));
      console.log(receipt);
      this.receiptData[0].id = receipt.id;
      this.receiptData[0].date = receipt.date;
      this.receiptData[0].details = receipt.details[0].v;
      this.receiptData[0].subscriber = receipt.details[1].v;
      this.receiptData[0].amount = receipt.amount.value;
      this.receiptData[0].currency = receipt.amount.currency;
      localStorage.removeItem('bankReceipt')
    }
  },
  mounted(){
    this.getReceiptData();
  },
  created(){
    console.log(navigator.onLine);
  }
};
</script>