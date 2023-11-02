const URL_BASE = "https://app-findy-services.onrender.com/";

const endpoinst = {
  users: `${URL_BASE}users`,
  user: (email, password) =>
  `${URL_BASE}users?email=${email}&&password=${password}`,
};

export default endpoinst;

//funcion para los likes//
/* import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postId }) => {
 const [likes, setLikes] = useState(0);
 const [liked, setLiked] = useState(false);

 const handleLike = async () => {
   try {
     const response = await axios.post(`/api/posts/${postId}/like`);
     setLikes(response.data.likes);
     setLiked(true);
   } catch (error) {
     console.error('Error al dar like:', error);
   }
 };

 return (
   <button onClick={handleLike} disabled={liked}>
     {liked ? 'Ya no me gusta' : `Me gusta (${likes})`}
   </button>
 );
};

export default LikeButton; */