import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { setUser } from '../slices/authSlice';

export const authenticatedUser: Middleware =
   (api: MiddlewareAPI) => (next) => (action) => {
      if (isRejectedWithValue(action)) {
         console.log({ api, action });
         if (action.payload.status === 401) {
            next(
               setUser({
                  expire_at: null,
                  profile: null,
                  token: null,
               })
            );
            localStorage.removeItem('profile');
            localStorage.removeItem('token');
            localStorage.removeItem('expire_at');
         }
      }

      return next(action);
   };
