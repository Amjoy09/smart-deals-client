import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { customer, logOutUser, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //    Request Interceptor

    const requestInterceptors = instance.interceptors.request.use((config) => {
      if (customer?.accessToken) {
        config.headers.authorization = `Bearer ${customer.accessToken}`;
      }

      return config;
    });

    // Response Interceptor

    const responseInterceptors = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logOutUser()
            .then(() => {
              navigate("/login");
              setLoading(false);
              toast.error("Session expired. Please login again.");
            })
            .catch((error) => console.log(error));
        }

        return Promise.reject(err);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
      instance.interceptors.response.eject(responseInterceptors);
    };
  }, [customer, logOutUser, navigate, setLoading]);

  return instance;
};

export default useAxiosSecure;
