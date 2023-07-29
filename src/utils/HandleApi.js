import axios from "axios";

const baseUrl = import.meta.env.VITE_API_SERVER;

const getAllToDo = (setToDo) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log("data ---", data);
      setToDo(data.sort());
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

const updateDone = (toDoId, done, setToDo) => {
  axios
    .post(`${baseUrl}/updateDone`, { _id: toDoId, done: done })
    .then(() => {
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

export { getAllToDo, addToDo, updateDone, deleteAll };
