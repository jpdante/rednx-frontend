import net from "../services/net";
import { hasToken } from "../services/auth";
import Store from "../undux";
import { navigate } from "@reach/router";

const api = {
  // ~~~~ AUTH ~~~~
  login: async (email: string, password: string, captcha: string) => {
    return await net.post("/auth/login", {
      email,
      password,
      captcha,
    });
  },
  register: async (
    username: string,
    email: string,
    password: string,
    birthdate: number,
    captcha: string,
    lang: string
  ) => {
    return await net.post("/auth/register", {
      username,
      email,
      password,
      birthdate,
      captcha,
      lang,
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
  // ~~~~ CHANNEL ~~~~
  newChannel: async (
    channelName: string,
    channelLink: string,
    captcha: string
  ) => {
    const response = await net.post("/channel/new", {
      channelName,
      channelLink,
      captcha,
    });
    await api.checkSession(response);
    return response;
  },
  canCreateNewChannel: async () => {
    const response = await net.get("/channel/cancreate");
    await api.checkSession(response);
    return response;
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
    await api.checkSession(response);
    return response;
  },
};

export default api;