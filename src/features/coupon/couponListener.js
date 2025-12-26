// couponListener.js
import { createListenerMiddleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setReduction } from "./couponSlice";

const couponListener = createListenerMiddleware();

couponListener.startListening({
  actionCreator: setReduction,
  effect: (action, listenerApi) => {
    switch (action.payload) {
      case "X7p9alq2":
        toast.success("Coupon applied: 20% off!");
        break;
      case "M4zt82rw":
        toast.success("Coupon applied: 30% off!");
        break;
      case "qh9lk3vj":
        toast.success("Coupon applied: 50% off!");
        break;
      default:
        toast.error("Invalid coupon code");
        break;
    }
  },
});

export default couponListener;
