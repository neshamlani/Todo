import axiosAtom from "axios";

const axios = axiosAtom.create({
  baseURL: "https://todo-groot-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default axios
