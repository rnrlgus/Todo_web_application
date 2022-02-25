import { SingleBedOutlined } from "@material-ui/icons";
import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type" : "application/json",
  });

  //로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);  
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };


  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          //response.ok가 트루이면 정상적인 응답을 받은 것 반대면 에러 응답 받은 것
          return Promise.reject(json);
        }
        return json;
      })
  )
  .catch((error) => {
    console.log(error.status);
    if (error.status === 403) {
      window.location.href = "/login"; // redirect
    }
    
    return Promise.reject(error);
  });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem(ACCESS_TOKEN, response.token);
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}