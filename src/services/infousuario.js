import axios from 'axios';
import endpoints from './endpoints';

export const getUserByNameAndAvatar = async () => {
  try {
    const { data } = await axios.get(endpoints.users);
    return data.length ? data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserPublic = async () => {
  try {
    const { data } = await axios.get(endpoints.posts);
    return data.length ? data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//crear un endpoint que recibe dos id
