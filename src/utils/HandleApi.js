import axios from "axios";

const baseUrl = import.meta.env.VITE_API_SERVER;

const getAllToDo = (setToDo) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      // console.log("data ---", data);
      setToDo(data);
    })
    .catch((err) => console.log(err));
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then((data) => {
      console.log(data);
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(`${baseUrl}/update`, { _id: toDoId, text })
    .then(() => {
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateStatusDone = (toDoId, done, setToDo) => {
  axios
    .put(`${baseUrl}/update`, { _id: toDoId, done })
    .then(() => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then(() => {
      // console.log(data);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteAll = (setToDo) => {
  axios
    .delete(`${baseUrl}/deleteAll`)
    .then(() => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export {
  getAllToDo,
  addToDo,
  updateStatusDone,
  updateToDo,
  deleteToDo,
  deleteAll,
};
