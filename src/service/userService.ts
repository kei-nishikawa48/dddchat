import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";

const UserService = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });
  });
  return user;
};
export default UserService;
