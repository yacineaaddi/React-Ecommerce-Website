import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ userDetail, setUserDetail, Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
