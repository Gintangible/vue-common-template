import request from "@/utils/request";

const appApi = {
  getUserInfo: () => {
    return request({
      url: "/getUserInfo",
      method: "get",
      loading: true,
    });
  }
};

export default appApi;
