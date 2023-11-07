import axios from 'axios';
import endpoints from './endpoints';

export const createNewPost = async newPost => {
  try {
    const { data } = await axios.post(endpoints.posts, newPost);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateCommentsInPost = async (postId, commentBody) => {
  try {
    let { data } = await axios.get(`${endpoints.posts}/${postId}`);
    const updatedData = data.comments.push(commentBody);
    const newData = { ...data, updatedData };
    const response = await axios.put(`${endpoints.posts}/${postId}`, newData);
    console.log('response likes', response);
  } catch (error) {
    console.log(error);
    return null;
  }
};
