const getters = {
  user: (state) => state.app.user,
  token: (state) => state.user.token,
};
export default getters;
