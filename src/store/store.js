import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import dashboardReducer from "./allContent.js"
import paymentReducer from "./payment.js"
const store = configureStore({
  reducer: {
    app: userReducer,
    allContent:dashboardReducer,
    payment:paymentReducer
  },
});

export default store;