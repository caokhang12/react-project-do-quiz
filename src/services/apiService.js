import axios from "../ultis/axiosCustomize";
const postNewUser = (username, password, email, role, image) => {
  const data = new FormData();
  data.append("username", username);
  data.append("password", password);
  data.append("email", email);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const putUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const deleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id } });
};
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
const getAllUsersPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password });
};

const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", { email, username, password });
};
export {
  postNewUser,
  getAllUsers,
  putUser,
  deleteUser,
  getAllUsersPaginate,
  postLogin,
  postRegister,
};
