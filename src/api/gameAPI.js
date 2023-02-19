import axios from 'axios';
var apiUrl = __DEV__ ? 'http://6f89-2806-2f0-5021-5dbe-ad42-b979-79d4-e11a.ngrok.io' : 'https://game-secrets-server-heroku-20.herokuapp.com/';
console.log('apuUrl: ' , apiUrl);
export default axios.create({
    baseURL: apiUrl
})