import net from "../services/net";

export default {
  // ~~~~ AUTH ~~~~
  login: async (email: string, password: string, captcha: string) => {
    return await net.post("/auth/login", {
      email,
      password,
      captcha
    });
  },
  // ~~~~ FEED ~~~~
  getNewVideos: async () => {
    return await net.get("/feed/newvideos");
  },
};
