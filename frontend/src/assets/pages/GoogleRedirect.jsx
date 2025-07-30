// src/assets/pages/GoogleRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser, Status, setStatus } from "../store/authSlice";
import axios from "axios";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("authToken", token);
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));

        try {
          const response = await axios.get("http://localhost:4000/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          dispatch(setUser(response.data));
          navigate("/home");
        } catch (err) {
          console.error("Fetching Google user failed", err);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleGoogleAuth();
  }, [dispatch, navigate]);

  return <p className="text-center mt-10">Logging you in with Google...</p>;
}
