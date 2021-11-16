import axios from '@/config/axios';

/**
 * @param {object} params 
 */

 export function makeNewPayment(params) {
    return axios.post("payment/new", {params}).then(res => res.data)
}