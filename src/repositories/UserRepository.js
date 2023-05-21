import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../Firebase";

// userData should contain email, displayname, adminflag
export const createUserById = async (userId, userData) => {
  console.log(userId, userData);
  await setDoc(doc(db, "users", userId), userData);
};

export const findUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("User not found!");
    return null;
  }
};

export const deleteUser = async (userId) => {
  await deleteDoc(doc(db, "users", userId));
};

export const getUsers = async () => {
  let users = [];
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return users;
  } else {
    querySnapshot.forEach((doc) => {
      console.log("Ik heb effectief data");
      users.push({ ...doc.data(), Id: doc.id });
    });
  }
  return users;
};
