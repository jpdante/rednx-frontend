import net from "../services/net";

export default {
  getNewVideos: async () => {
    return await net.get("/feed/newvideos");
  },
};
