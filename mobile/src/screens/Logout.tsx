import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

export default function Logout() {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);
  return <></>;
}
