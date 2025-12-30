// Import Redux Toolkit middleware utility for listening to actions
import { createListenerMiddleware } from "@reduxjs/toolkit";

// Import toast notifications library
import toast from "react-hot-toast";

// Import the Redux action to set coupon reduction
import { setReduction } from "./couponSlice";

// Create a listener middleware instance for coupon actions
const couponListener = createListenerMiddleware();

// Start listening for the setReduction action
couponListener.startListening({
  actionCreator: setReduction,
  effect: (action, listenerApi) => {
    switch (action.payload) {
      case "X7p9alq2":
        // Show success toast for 20% off coupon
        toast.success("Coupon applied: 20% off!");
        break;
      case "M4zt82rw":
        // Show success toast for 30% off coupon
        toast.success("Coupon applied: 30% off!");
        break;
      case "qh9lk3vj":
        // Show success toast for 50% off coupon
        toast.success("Coupon applied: 50% off!");
        break;
      default:
        // Show error toast if coupon code is invalid
        toast.error("Invalid coupon code");
        break;
    }
  },
});

// Export the listener middleware to be included in the Redux store
export default couponListener;
