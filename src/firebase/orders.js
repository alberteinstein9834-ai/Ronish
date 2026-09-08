import { collection, addDoc, getDocs, getDoc, updateDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "./config";

const collectionName = "orders";

export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...orderData,
      status: "pending",
      paymentMethod: "COD",
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    throw error;
  }
};