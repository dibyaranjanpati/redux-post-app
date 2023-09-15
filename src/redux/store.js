import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./feature/PostSlice";

export default configureStore({
  reducer: {
    app: postSlice,
  },
});
