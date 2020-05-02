import axios from 'axios';
var apiUrl = __DEV__ ? 'http://f54a5a9e.ngrok.io' : 'https://apricot-crisp-06362.herokuapp.com/';
console.log('apuUrl: ' , apiUrl);
export default axios.create({
    baseURL: apiUrl
})