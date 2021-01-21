import request from "@/utils/request";

const appApi = {
  getUserInfo: () => {
    return request({
      url: "/api",
      method: "get",
      loading: false,
    });
  }
};

export default appApi;
