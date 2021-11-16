import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const options = {
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#00A0E3',
        secondary: '#303F9F',
        textColor: '#424242',
        blue:'#2196F3',
        gray:'#EEEFFC'
      },
    },
  },
};

export default new Vuetify(options);
