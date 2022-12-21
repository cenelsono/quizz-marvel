import {axioInstance} from "./apiConfig";

const PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const TS = '1';

//md5 est un générator de hash: https://www.md5hashgenerator.com/
// const hash = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);
const HASH = process.env.REACT_APP_MARVEL_API_HASH;

export const getCharacterInfo = async (heroId) => {
    // axioInstance.get(`/characters/${heroId}?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`)
    //     .then(response=> {
    //         console.log('response.data', response.data)
    //         return response.data
    //     })
    //     .catch(error=> console.log(error))

    try{
        const response = await axioInstance.get(`/characters/${heroId}?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`)
        console.log(response)
        return response.data;
    }catch(error){
        console.log(error)
    }}

