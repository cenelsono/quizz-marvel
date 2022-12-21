import {doc} from "firebase/firestore";
import {db} from './firebaseConfig';

// export const user = uid => doc(db, `users/${uid}`);
export const user = uid => doc(db, 'users', uid);

export const scores = uid => doc(db, 'scores', uid);

