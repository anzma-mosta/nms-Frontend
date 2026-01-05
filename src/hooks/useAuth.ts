import { useAppSelector, useAppDispatch } from "../store";
import { logout, setCredentials } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token } = useAppSelector(
    (state) => state.auth
  );

  const login = (user: any, token: string) => {
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
