import React from "react";
import { useSelector } from "react-redux";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  if (user.role === "admin") {
    return <AdminPage />;
  }
  else {
    return <UserPage/>
  }
};

export default HomePage;
