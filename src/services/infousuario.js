import axios from "axios";
import endpoinst from "./endpoints";

export const getUserByNameAndAvatar = async () => {
  try {
    const { data } = await axios.get(endpoinst.users);
    return data.length ? data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//crear un endpoint que recibe dos id  