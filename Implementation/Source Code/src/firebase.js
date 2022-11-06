import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { getFirestore, query, setDoc, doc, getDoc, getDocs, collection, where, addDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCQ4hG2L8xknarRJYah63WCWtXWCUgB5SM",
  authDomain: "openjio-560ed.firebaseapp.com",
  projectId: "openjio-560ed",
  storageBucket: "openjio-560ed.appspot.com",
  messagingSenderId: "677771045281",
  appId: "1:677771045281:web:b403e9008bc61d5a9183e0"
})

//Guoyong
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyCx0a1skE6ww0UbDTNM41OCsss4wF3ZV1U",
//   authDomain: "openjio-tgy.firebaseapp.com",
//   projectId: "openjio-tgy",
//   storageBucket: "openjio-tgy.appspot.com",
//   messagingSenderId: "130995870998",
//   appId: "1:130995870998:web:791e73179191e1ccc08437",
// })

//Backup Firebase
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyDezzhreCJOIu4JR2x4ZBGX5Ww_ofHqnbM",
//   authDomain: "openjiobackup.firebaseapp.com",
//   projectId: "openjiobackup",
//   storageBucket: "openjiobackup.appspot.com",
//   messagingSenderId: "282607146102",
//   appId: "1:282607146102:web:828690740d667fe400bb57",
// })

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider()
const storage = getStorage(firebaseApp)

const updateNumbers = async(uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    const userNumFriends = docSnap.get('friends').length
    const numActivitiesParticipated = docSnap.get('upcoming_activities').length
    const numActivitiesPosted = docSnap.get('organised_activities').length

    await updateDoc(docRef, {
        numFriends: userNumFriends,
        numActivitiesParticipated: numActivitiesParticipated,
        numActivitiesPosted: numActivitiesPosted,
    })
}

const updateActivityNumbers = async(activityUid) => {
  const docRef = await doc(db, "activities", activityUid);
  const docSnap = await getDoc(docRef);

  const numParticipants = docSnap.get('Participants').length
  const numPendingUsers = docSnap.get('PendingUsers').length

  await updateDoc(docRef, {
      NumParticipants: numParticipants,
      NumPendingUsers: numPendingUsers,
  })
}

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
};

const registerWithEmailAndPassword = async (name, username, email, password, DOB) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      username,
      email,
      password,
      DOB,
      authProvider: "local",
      image_url: "https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3",
      numFriends: 0,
      numActivitiesPosted: 0,
      numActivitiesParticipated: 0,
      friendReqs: [],
      friends: [],
      saved_activities: [],
      upcoming_activities: [],
      pending_activities: [],
      organised_activities: [],
    })
    //return user; 

  } catch (err) {
    console.error(err)
    alert(err.message)
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert("Password reset link sent!")
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
};

const logout = () => {
  signOut(auth)
}

const getUserData = async () => {
  try {
    const user = getAuth().currentUser
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const snapshot = await getDocs(q)
    let u = []
    snapshot.forEach(doc => {
      u.push(doc.data())
    })
    return u[0]
  } catch (error) {
    console.log(error)
  }
}

const getCollection = (collectionName) => {

  const q = query(collection(db, collectionName))
  const array = []
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      //console.log(data)
      array.push(data)
    })
  })

  return array
}


export default firebaseApp
export {
  auth,
  db,
  firebaseApp,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
  getUserData,
  getCollection,
  updateNumbers,
  updateActivityNumbers,
  database
};
