import axios from 'axios';
var apiUrl = __DEV__ ? 'http://8386dff2.ngrok.io' : 'https://apricot-crisp-06362.herokuapp.com/';
console.log('apuUrl: ' , apiUrl);
export default axios.create({
    baseURL: apiUrl
})