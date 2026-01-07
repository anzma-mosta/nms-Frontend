import { useAppSelector, useAppDispatch } from "../store";
import { logout, setCredentials } from "../store/slices/authSlice";
import { type User } from "../types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token } = useAppSelector(
    (state) => state.auth
  );

  const login = (user: User, token: string) => {
    dispatch(setCredentials({ user, token }));
  };

  const performLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout: performLogout,
  };
};
