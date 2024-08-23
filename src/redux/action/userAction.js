export const FETH_USER_LOGIN_SUCCESS = "FETH_USER_LOGIN_SUCCESS";

export const doLogin = (data) => {
  return {
    type: FETH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
