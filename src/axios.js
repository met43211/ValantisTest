import axios from 'axios';
import md5 from 'md5';

const API_URL = import.meta.env.VITE_API_URL
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD

const currentDate = new Date()
const year = currentDate.getUTCFullYear()
const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0')
const day = currentDate.getUTCDate().toString().padStart(2, '0')

const timestamp = year + month + day
const xAuth = md5(`${API_PASSWORD}_${timestamp}`)


const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'X-Auth': xAuth,
    }
});

export default instance;