"use client"
import { AuthContext } from "actions/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AdminPage() {
  const { loggedIn, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      !loggedIn ? router.push("/login") : router.push("/admin/userInformation");
    }
  }, [loggedIn, loading]);

  if(loading) return <p>Loading..</p>;

  return null;
}
