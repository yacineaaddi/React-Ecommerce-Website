import { db } from "./firebase";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const increaseQty = async (data, userId, updatestate) => {
  console.log(data);
  if (data.State !== "Available") {
    toast.error("Out of stock");
    return;
  }

  try {
    const cartRef = doc(db, "users", userId, "cart", data.id);
    await updateDoc(cartRef, { Qty: data.Qty + 1 });

    updatestate();
    toast.success("Quantity added successfully!");
  } catch (error) {
    toast.error("Error increasing quantity");
  }
};
export const decreseQty = async (data, userId, updatestate) => {
  if (data.State !== "Available") {
    toast.error("Out of stock");
    return;
  }
  try {
    if (data.Qty > 1) {
      const cartdataref = doc(db, "users", userId, "cart", data.id);
      await updateDoc(cartdataref, { Qty: data.Qty - 1 });
      toast.success("Quantity decreased successfully!");
      updatestate();
    }
  } catch (error) {
    toast.error("Error decreasing Quantity");
  }
};
export function reducer(state, action) {
  const couponmsg = "Coupon code added successfully!";
  switch (action.type) {
    case "X7p9alq2":
      toast.success(couponmsg);
      return 20;
    case "M4zt82rw":
      toast.success(couponmsg);
      return 30;
    case "qh9lk3vj":
      toast.success(couponmsg);
      return 50;
    default:
      toast.error("Coupon code is not valid!");
      return state;
  }
}
