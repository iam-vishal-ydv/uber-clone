import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function UserLogout() {
  const navigate = useNavigate();
  axiosInstance.get("/users/logout").then((res) => {
    if (res.status == 200) {
      localStorage.removeItem("token");
      navigate("/user-login");
    }
  });

  return <div></div>;
}
