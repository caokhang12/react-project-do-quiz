import { useEffect, useState } from "react";
import {
  getAllQuizByAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiService";
import Select from "react-select";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
  }, []);
  const fetchAllQuiz = async () => {
    let data = await getAllQuizByAdmin();
    if (data && data.EC === 0) {
      let newData = data.DT.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListQuiz(newData);
    }
  };
  const fetchAllUser = async () => {
    let data = await getAllUsers();
    if (data && data.EC === 0) {
      let newData = data.DT.map((item) => {
        return { value: item.id, label: `${item.username}- ${item.email}` };
      });
      setListUser(newData);
    }
  };

  const handleAsign = async () => {
    let data = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (data && data.EC === 0) {
      toast.success(data.EM);
    }
    else {
      toast.error(data.EM);
    }
  };
  return (
    <div className="asign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div className="assign-btn">
        <button className="btn btn-primary mt-3" onClick={() => handleAsign()}>Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
