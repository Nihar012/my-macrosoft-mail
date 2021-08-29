import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-macrosoft-mail-default-rtdb.firebaseio.com'
})

export default instance;