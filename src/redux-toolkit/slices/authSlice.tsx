import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = {
  id: number;
  name: string;
  parent_role: null | string | number;
};

type Profile = {
  id: number;
  status: number;
  parent_id: null | number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_ata: null | string;
  privacy_policy: boolean;
  terms_agreement: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  roles: any;
  permissions: any;
};

export interface AuthState {
  profile: null | Profile;
  token: string | null;
  expire_at: string | null;
}

const initialState: AuthState = {
  token: "",
  profile: null,
  expire_at: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string | null;
        profile: Profile | null;
        expire_at: string | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      state.expire_at = action.payload.expire_at;
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
