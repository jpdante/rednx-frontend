import net from "../services/net";
import { hasToken } from "../services/auth";
import Store from "../undux";
import { navigate } from "@reach/router"

const api = {
  // ~~~~ AUTH ~~~~
  login: async (email: string, password: string, captcha: string) => {
    return await net.post("/auth/login", {
      email,
      password,
      captcha,
    });
  },
  checkSession: async (response: any) => {
    let stores = Store.useStores();
    if (!hasToken()) return;
    if (response !== undefined) {
      if (response.data.invalidSession === true) {
        stores.auth.set("token")(null);
        navigate("/");
      }
    } else {
      const response = await net.get("/auth/checksession");
      if (response.data.invalidSession === true) {
        stores.auth.set("token")(null);
        navigate("/");
      }
    }
  },
  // ~~~~ FEED ~~~~
  getNewVideos: async () => {
    return await net.get("/feed/newvideos");
  },
  // ~~~~ PROFILE ~~~~
  uploadProfilePicture: async (picture: string) => {
    const response = await net.post("/profile/putpicture", {
      picture,
    });
    api.checkSession(response);
    return response;
  },
};

export default api;