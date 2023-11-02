import axios from 'axios';
import endpoints from './endpoints';

export const createUser = async newUser => {
  try {
    const response1 = await axios.get(endpoints.users);
    const currentData = response1.data;
    const foundUser = currentData.find(
      currentUser => currentUser.email === newUser.email
    );

    if (foundUser) return 'already created';

    const { data } = await axios.post(endpoints.users, newUser);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const { data } = await axios.get(endpoints.user(email, password));
    return data.length ? data[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
