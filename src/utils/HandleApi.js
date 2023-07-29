import axios from "axios";

const baseUrl = import.meta.env.VITE_API_SERVER;

const getAllToDo = (setToDo) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("data ---> ", data);
    setToDo(data);
  });
};

export { getAllToDo };
