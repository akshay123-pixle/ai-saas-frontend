import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import dashboardReducer from "./allContent.js"
import paymentReducer from "./payment.js"
import bgRemoval from "./bgRemoval.js"
const store = configureStore({
  reducer: {
    app: userReducer,
    allContent:dashboardReducer,
    payment:paymentReducer,
    bg:bgRemoval,
  },
});

export default store;