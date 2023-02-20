import axios from 'axios';
var apiUrl = __DEV__ ? 'https://50b2-2806-2f0-5021-5dbe-6197-4ed5-6e2a-16b2.ngrok.io' : 'https://game-secrets-server-heroku-20.herokuapp.com/';
console.log('apuUrl: ' , apiUrl);
export default axios.create({
    baseURL: apiUrl
})