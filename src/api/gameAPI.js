import axios from 'axios';
var apiUrl = __DEV__ ? 'https://c6fc-2806-2f0-5021-5dbe-e03b-c786-5907-7534.ngrok.io' : 'https://game-secrets-server-heroku-20.herokuapp.com/';
console.log('apuUrl: ' , apiUrl);
export default axios.create({
    baseURL: apiUrl
})