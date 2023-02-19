import { UserDTO } from "@dtos/User";
import { api } from "@service/api";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageToken";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

export type AuthContextDataProps = {
  user: UserDTO;
  signIn(email: string, password: string): Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token) {
        await storageUserSave(data.user);
        await storageAuthTokenSave(data.token);
        userAndTokenUpdate(data.user, data.token);
      }
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) userAndTokenUpdate(userLogged, token);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
