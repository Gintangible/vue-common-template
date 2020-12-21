import request from "@/utils/request";

// 账号退出
const logout = () =>
  request({
    url: "/api",
    method: "get",
  });

export { logout };
