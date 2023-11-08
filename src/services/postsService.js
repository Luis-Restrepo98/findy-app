import axios from "axios";
import endpoinst from "./endpoints";

export const addLikeToPost = async (postId, userId) => {
  try {
    let { data } = await axios.get(`${endpoinst.posts}/${postId}`);
    const likes = data.likes;
    likes.push(userId);
    console.log("likes service", likes)
    data= {...data, likes};
    const response = await axios.put(`${endpoinst.posts}/${postId}`, data);
    console.log("response likes", response)
  } catch (error) {
    console.log(error);
    return null;
  }
};

