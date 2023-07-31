import { AuthProvider } from "react-admin";

interface User {
  email: string;
  password: string;
}

export const authProvider: AuthProvider = {
  login: ({ email, password }: User) => {
    const request = new Request(
      `${import.meta.env.VITE_API_URL}/authenticate`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    return fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.statusCode < 200 || json.statusCode >= 300) {
          throw new Error(json.message);
        }
        return json;
      })
      .then((auth) => {
        // localStorage.setItem("auth", JSON.stringify(auth.user));
        localStorage.setItem("user", JSON.stringify(auth.user));
        localStorage.setItem("token", auth.token);
        // localStorage.setItem("username", auth.user.name);
        return Promise.resolve();
      })
      .catch((e) => {
        console.log("e", e);
        throw new Error(e);
      });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: JSON.parse(localStorage.getItem("user")!).role,
      fullName: JSON.parse(localStorage.getItem("user")!).name,
    }),
  getPermissions: () => Promise.resolve(""),
};
