import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { workFormInterface } from "models/Models";

// Create or update clockstate
export const setClockStatusById = async (userId, data) => {
  console.log(data);
  await setDoc(doc(db, "clockstate", userId), data);
};

export const getClockStatusById = async (userId) => {
  var docSnap = await getDoc(doc(db, "clockstate", userId));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// TODO: Lot of duplication here with WorkFormRepository
export const saveTimestampToWorkformById = async (userId, pausedTimestamp) => {
  console.log("saveTimestampToWorkformById" + userId, pausedTimestamp);
  const formsRef = collection(db, "workforms");

  const q = query(
    formsRef,
    where("user", "==", userId),
    where("date", "==", new Date().toLocaleDateString().toString().replaceAll("-","/"))
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("Requested workform is empty or doesn't exist.");
    const workedTimeInMs = pausedTimestamp;
    await addDoc(collection(db, "workforms"), {
      ...workFormInterface,
      workedTimeInMs: workedTimeInMs,
      workedTime: new Date(workedTimeInMs).toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString().toString().replaceAll("-","/"),
      user: userId,
    });
  } else {
    const workedTimeInMs = pausedTimestamp;
    await updateDoc(querySnapshot.docs[0].ref, {
      workedTimeInMs: workedTimeInMs,
      workedTime: new Date(workedTimeInMs).toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }
};
