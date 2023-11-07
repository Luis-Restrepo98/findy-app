export const userLoggedInitial = {
  isAuthenticated: false,
  user: null,
};

const userLoggedReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true, 
        user: action.payload.user
      };      
    case 'LOGOUT':
      return userLoggedInitial;
    case 'UPDATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userLoggedReducer;
