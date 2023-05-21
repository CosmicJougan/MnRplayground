import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { workFormInterface } from "models/Models";

// Create or update workfrom by id
export const setWorkformById = async (docId, data) => {
  if (docId === "") {
    await addDoc(collection(db, "workforms"), data);
  } else {
    await setDoc(doc(db, "workforms", `${docId}`), data);
  }
};

export const getWorkformsForDateRange = async (userId, dateRange) => {
  console.log("functie start");
  const q = query(
    collection(db, "workforms"),
    where("user", "==", userId),
    where("date", "in", dateRange)
  );
  console.log("query werkt");
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return [];
  } else {
    let dataList = [];
    querySnapshot.forEach((docData) => {
      dataList.push({ documentId: docData.id, ...docData.data() });
    });
    return dataList;
  }
};

export const getWorkformForDateById = async (userId, localeDate) => {
  console.log(`Retrieving form for user: ${userId} on date: ${localeDate.toString().replaceAll("-","/")}`);
  const formsRef = collection(db, "workforms");

  const q = query(
    formsRef,
    where("user", "==", userId),
    where("date", "==", localeDate.toString().replaceAll("-","/"))
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Requested workform is empty or doesn't exist, return empty.");
    const form = {
      ...workFormInterface,
      date: `${localeDate.toString().replaceAll("-","/")}`,
      user: `${userId}`,
    };
    const docId = "";
    return { form, docId };
  } else {
    var data = querySnapshot.docs[0].data();
    var workedTimeInMs = new Date(data.workedTimeInMs);
    var materialInMs = new Date(data.materialInMs);
    const form = {
      workedTime: workedTimeInMs.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }),
      workedTimeInMs: data.workedTimeInMs,
      constructionSite: data.constructionSite,
      personalTransportation: data.personalTransportation,
      companyTransportation: data.companyTransportation,
      material: materialInMs.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      }),
      materialInMs: data.materialInMs,
      notes: data.notes,
      date: `${localeDate.toString().replaceAll("-","/")}`,
      user: `${userId}`,
    };
    const docId = querySnapshot.docs[0].id;
    return { form, docId };
  }
};
