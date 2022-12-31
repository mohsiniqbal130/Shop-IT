import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://shop-it-ff797.firebaseio.com/'
});

export default instance;