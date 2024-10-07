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

const getAllQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getQuizData = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};
const postQuizAnswers = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", data);
};

const getAllQuizByAdmin = () => {
  return axios.get("api/v1/quiz/all");
};

const delQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const updateQuiz = (id, description, name, difficult, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficult);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data);
};

const postNewQuestion = (quizId, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quizId);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};

const postNewAnswer = (description, correct_answer, question_id) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
export {
  postNewUser,
  getAllUsers,
  putUser,
  deleteUser,
  getAllUsersPaginate,
  postLogin,
  postRegister,
  getAllQuizByUser,
  getQuizData,
  postQuizAnswers,
  postNewQuiz,
  getAllQuizByAdmin,
  delQuiz,
  updateQuiz,
  postNewQuestion,
  postNewAnswer,
};
