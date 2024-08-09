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
  return axios.delete('api/v1/participant', { data: { id } });
}
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
export { postNewUser, getAllUsers, putUser, deleteUser };
