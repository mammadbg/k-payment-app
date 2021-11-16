import { required } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '',
});

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
}