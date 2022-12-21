import axios from "axios";
// http://gateway.marvel.com/v1/public/characters?
// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150)

const URL = 'https://gateway.marvel.com/v1/public/';



export const axioInstance = axios.create({
    baseURL: URL,
})
