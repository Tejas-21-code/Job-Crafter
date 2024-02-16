import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  email: string;
  username: string;
  password: string;
  emailIsValid: boolean;
  usernameIsValid: boolean;
  passwordIsValid: boolean;
};

const initialState = {
  value: {
    email: "",
    username: "",
    password: "",
    emailIsValid: true,
    usernameIsValid: true,
    passwordIsValid: true,
  } as AuthState,
} as InitialState;

export const form = createSlice({
  name: "form",
  initialState,
  reducers: {},
});
