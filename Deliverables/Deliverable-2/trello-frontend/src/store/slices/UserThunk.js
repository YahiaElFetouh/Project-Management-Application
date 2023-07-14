import { createAsyncThunk } from "@reduxjs/toolkit";
;
import httpClient from "../../../lib/httpClient";

export const authenticateUser = createAsyncThunk(
  "user/auth",
  async ({ email, password }) => {
    let user = null;
    try {
      userSave = await httpClient.post("/user/save", { userName, email, password, SecurityQuestion, SecurityAnswer});
    } catch (e) {
      console.error(e);
    }
    console.log(userSave);
    return userSave;
  }
);
