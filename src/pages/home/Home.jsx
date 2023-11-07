import React, { useState, useEffect, useContext } from 'react';

import {
  getUserByNameAndAvatar,
  getUserPublic,
} from '../../services/infousuario';

import { AppContext } from '../../routes/Router';
import { addLikeToPost } from '../../services/postsService';

import logoFindy from '../../assets/icons/logo-findy.svg';
import corazonIcon1 from '../../assets/icons/corazon-icon1.svg';
import corazonIconred from '../../assets/icons/corazon-iconred.svg';
import mensajesIcon from '../../assets/icons/mensajes-icon.svg';
import mensajeIcon from '../../assets/icons/mensaje-icon.svg';
import compartirIcon from '../../assets/icons/compartir-icon.svg';
import banderitaIcon from '../../assets/icons/banderita-icon.svg';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import './home.scss';
import { updateCommentsInPost } from '../../services/postService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {
    userLogged: { userLogged, userLoggedDispatch },
    postReducerInfo: { postState, postDispatch },
  } = useContext(AppContext);

  console.log('Post state from home:', postState);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [userPublic, setUserPublic] = useState([]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clickeada, setClickeada] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await getUserByNameAndAvatar();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatos();
  }, [userLogged]);

  useEffect(() => {
    const obtenerPublic = async () => {
      try {
        const data = await getUserPublic();
        setUserPublic(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPublic();
  }, [postState]);

  const handleLike = async id => {
    try {
      await addLikeToPost(id, userLogged.user.id);
      setClickeada(prevClickeada => [...prevClickeada, id]);
      const updatedUserPublic = userPublic.map(publi =>
        publi.id === id ? { ...publi, likes: publi.likes + 1 } : publi
      );
      setUserPublic(updatedUserPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = event => {
    setNewComment(event.target.value);
  };

  const addComment = (userId, postId) => {
    if (newComment.trim() !== '') {
      // setComments([...comments, newComment]);
      console.log('Post ID:', postId);
      console.log('User ID:', userId);
      console.log('New Comment:', newComment);

      const commentBody = {
        userId: userId,
        contents: newComment,
      };

      // updateCommentsInPost(postId, commentBody);

      setNewComment('');
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className='container__home'>
        <header className='header__container'>
          <div className='header__container__logo'>
            <img src={logoFindy} alt='' />
          </div>
          <div>
            <img
              className='header__container__corazon'
              src={corazonIcon1}
              alt=''
            />
            <img
              className='header__container__mensaje'
              src={mensajesIcon}
              alt=''
            />
          </div>
        </header>
        <section className='container__estados'>
          <ul className='container__list'>
            {userInfo.map((user, index) => (
              <li key={index} className='container__list__estados'>
                <img
                  className='container__list__oval__estados1'
                  src={userLogged.user.profile.avatar}
                  alt=''
                />

                <h3 className='container__list__nombre'>{userLogged.name}</h3>
              </li>
            ))}
          </ul>
        </section>
        <section className='container__publi'>
          <ul className='container__list2'>
            {userPublic.map((publi, index) => (
              <li className='container__list2__publicaciones' key={index}>
                <div className='container__publi__persona'>
                  {
                    <img
                      className='container__publi__perfil'
                      src={
                        userInfo.find(user => user.id === publi.userId)?.profile
                          .avatar
                      }
                      alt=''
                    />
                  }
                  <h1
                    onClick={() => navigate(`/profile/${publi.userId}`)}
                    className='container__publi__nombre__perfil'
                  >
                    {userInfo.find(user => user.id === publi.userId)?.name}
                  </h1>
                </div>
                <div>
                  {publi.content.map((photos, photoIndex) => (
                    <img
                      key={photoIndex}
                      className='container__publi__imagen__principal'
                      src={photos.photo}
                      alt=''
                    />
                  ))}
                </div>
                <section>
                  <div className='container__publi__iconos'>
                    <img
                      onClick={() => handleLike(publi.id)}
                      className='container__publi__like'
                      src={
                        clickeada.includes(publi.id)
                          ? corazonIconred
                          : corazonIcon1
                      }
                      alt=''
                    />
                    <span>{publi.likes.length}</span>
                    <img
                      // onClick={() => console.log(`Post ID: ${publi.id}`)}
                      onClick={openModal}
                      // onClick={onOpen}
                      className='container__publi__mensaje'
                      src={mensajeIcon}
                      alt=''
                    />
                    <span>0</span>

                    {isModalOpen && (
                      <div className='modal'>
                        <div className='modal-content'>
                          <span className='close' onClick={closeModal}>
                            &times;
                          </span>
                          <h2>Comentarios</h2>
                          <ul>
                            {publi.comments.map((comments, index) => (
                              <li key={index}>{comments.contents}</li>
                            ))}
                          </ul>
                          <input
                            type='text'
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder='Agregar un comentario...'
                          />
                          <button
                            onClick={() => addComment(publi.userId, publi.id)}
                          >
                            Agregar Comentario
                          </button>
                        </div>
                      </div>
                    )}
                    <img
                      className='container__publi__compartir'
                      src={compartirIcon}
                      alt=''
                    />
                    <span>0</span>
                    <div>
                      <img
                        className='container__publi__banderita'
                        src={banderitaIcon}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='container__publi__comentarios'>
                    <h2 className='container__publi__nombre__comentario'>
                      {userInfo.find(user => user.id === publi.userId)?.name}
                    </h2>
                    {publi.content.map((comment, commentIndex) => (
                      <p
                        key={commentIndex}
                        className='container__publi__comentario'
                      >
                        {comment.text}
                      </p>
                    ))}
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </section>

        {/* Modal Comments */}

        {/* <Modal
          scrollBehavior='inside'
          closeOnOverlayClick={false}
          size='sm'
          isCentered
          className='modalComments'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comments Section</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='modalBodyPost'>
              <ul>
                {publi.comments.map((comment, index) => (
                  <>
                    <li key={index}>{comment.contents}</li>
                  </>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter className='modalFooterComments'>
              <Button className='saveCommentButton'>Save</Button>
              <Button className='cancelButton' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </main>
    </>
  );
};

export default Home;
