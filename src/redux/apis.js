import axios from "axios";
import { getCookie, setCookie } from "../components/menu/login/utils/cookie";

const Apis = axios.create({
  baseURL: "http://3.37.231.161:4000",
});

//요청시 AccessToken 계속 보내주기
Apis.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  const refreshToken = getCookie("cocoriLogin");

  if (!token) {
    config.headers["accessToken"] = null;
    config.headers["refreshToken"] = null;
    return config;
  }
  if (config.headers && token) {
    const accessToken = JSON.parse(token);
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["refreshToken"] = `Bearer ${refreshToken}`;

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
      const refreshToken = originalConfig.headers["refreshToken"];
      try {
        // err.config.headers.Authorization = `Bearer ${token.refreshToken}`;
        const data = await axios({
          url: `http://3.37.231.161:4000/oauth/refresh`,
          method: "GET",
          headers: {
            Authorization: refreshToken,
          },
        });
        if (data) {
          setCookie("cocoriLogin", data.data.refreshToken, {
            path: "/",
            secure: true,
          });
          sessionStorage.setItem(
            "token",
            JSON.stringify(data.data.accessToken)
          );

          return await Apis.request(originalConfig);
        }
      } catch (err) {
        console.log("토큰 갱신 에러");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);
export default Apis;
