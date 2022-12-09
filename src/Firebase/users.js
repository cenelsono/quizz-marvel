import {doc, getDoc, setDoc, collection} from "firebase/firestore";
import { db } from './firebaseConfig';

// export const user = uid => doc(db, `users/${uid}`);
export const user = uid => collection(db, 'users', uid);

/*
export const getUserData = async (uid)=>{

    const collectionRef = user(uid);
    const dataSnapshot = await getDoc(collectionRef);

    if(dataSnapshot.exists()){
        const userData = dataSnapshot.data();
        console.log('getUser data', userData);
        return userData;
    }else{
        console.log('No such user document in database')
    }
}*/
