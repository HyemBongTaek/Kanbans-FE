import axios from "axios";
import { getCookie, setCookie } from "../components/Login/utils/cookie";
import { useCookies } from "react-cookie";

const Apis = axios.create({
  baseURL: "https://cocorikanbans.site",
});

//요청시 AccessToken 계속 보내주기
Apis.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (!token) {
    config.headers["accessToken"] = null;
    config.headers["refreshToken"] = null;
    return config;
  }
  if (config.headers && token) {
    const accessToken = JSON.parse(token);
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  }
});

//AccessToken이 만료됐을때 처리
Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      const refreshToken = getCookie("cocoriLogin");
      try {
        const data = await axios({
          url: `https://cocorikanbans.site/oauth/refresh`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            withCredentials: true,
          },
        });
        if (data) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 14);
          setCookie("cocoriLogin", data.data.refreshToken, {
            path: "/",
            secure: true,
            expires,
          });
          localStorage.setItem("token", JSON.stringify(data.data.accessToken));

          return await Apis.request(originalConfig);
        }
      } catch (err) {
        throw err;
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);
export default Apis;
