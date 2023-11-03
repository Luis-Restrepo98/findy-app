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
