const URL_BASE = 'https://app-findy-services.onrender.com/';

const endpoints = {
  users: `${URL_BASE}users`,
  user: (email, password) =>
    `${URL_BASE}users?email=${email}&&password=${password}`,
  posts: `${URL_BASE}posts`,
};

export default endpoints;
