import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';
import { createNewPost } from '../../services/postService';
import { AppContext } from '../../routes/Router';

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

import navigationBackground from '../../assets/img/barra-navegacion.png';
import circulo from '../../assets/img/circulo.png';
import cruzIcon from '../../assets/icons/cruz-icon.svg';
import casaIcon from '../../assets/icons/casa-icon.svg';
import lupaIcon from '../../assets/icons/lupa-icon.svg';
import campanaIcon from '../../assets/icons/campana-icon.svg';

import './navigation.scss';
import { updateUser } from '../../services/userService';
import { sweetAlert } from '../../utils/alerts';

const Navigation = () => {
  const {
    userLogged: { userLogged, userLoggedDispatch },
    postReducerInfo: { postState, postDispatch },
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [postText, setPostText] = useState('');

  const [profileInformation, setProfileInformation] = useState({
    username: userLogged.user.name,
    bio: userLogged.user.profile.bio,
  });

  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();

  const {
    isOpen: isEditProfileOpen,
    onOpen: onEditProfileOpen,
    onClose: onEditProfileClose,
  } = useDisclosure();

  const goToHome = () => navigate('/home');

  const createPost = async () => {
    const imageUrl = document.querySelector('.previewImage')?.src;

    if (!imageUrl.includes('camera-icon.svg')) {
      const postBody = {
        userId: userLogged.user.id,
        content: [
          {
            photo: imageUrl,
            text: postText,
          },
        ],
        comments: [],
        likes: [],
      };

      setPostText('');

      const newPost = await createNewPost(postBody);

      const action = {
        type: 'ADD_POST',
        payload: {
          newPost,
        },
      };
      postDispatch(action);

      onPostClose();
    }
  };

  const editProfile = async () => {
    const imageUrl = document.querySelector('.previewImage')?.src;

    const editBody = {
      name: profileInformation.username,
      profile: {
        bio: profileInformation.bio,
        avatar: imageUrl,
      },
    };

    const userUpdated = await updateUser(userLogged.user.id, editBody);

    if (userUpdated) {
      const action = {
        type: 'UPDATE',
        payload: {
          isAuthenticated: true,
          user: userUpdated,
        },
      };
      userLoggedDispatch(action);
    } else {
      sweetAlert('error', 'There was an unexpected error');
    }

    onEditProfileClose();
  };

  return (
    <main className='navigation__container'>
      <div className='navigationBackground'>
        <img
          src={navigationBackground}
          alt='navigationBackground'
          className='navigationBackgroundImage'
        />
        <img
          src={casaIcon}
          alt='casaIcon'
          className='casaIcon'
          onClick={goToHome}
        />
        <img src={lupaIcon} alt='lupaIcon' className='lupaIcon' />
        <img src={campanaIcon} alt='campanaIcon' className='campanaIcon' />
        <img
          src={userLogged.user.profile.avatar}
          alt='userIcon'
          className='userIcon'
          onClick={onEditProfileOpen}
        />
      </div>

      <div className='newPostButton'>
        <img
          src={circulo}
          alt='circulo'
          className='circulo'
          onClick={onPostOpen}
        />
        <img
          src={cruzIcon}
          alt='cruzIcon'
          className='cruzIcon'
          onClick={onPostOpen}
        />
      </div>

      {/* Post Modal */}

      <Modal
        scrollBehavior='inside'
        closeOnOverlayClick={false}
        size='sm'
        isCentered
        className='modalPost'
        isOpen={isPostOpen}
        onClose={onPostClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modalBodyPost'>
            <label>Wanna say something?</label>
            <br />
            <textarea
              required
              id='newPostText'
              name='newPostText'
              type='text'
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
            <br />
            <UploadWidget />
          </ModalBody>
          <ModalFooter className='modalFooterPost'>
            <Button className='postButton' onClick={createPost}>
              Post
            </Button>
            <Button className='cancelButton' onClick={onPostClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Profile Modal */}

      <Modal
        scrollBehavior='inside'
        closeOnOverlayClick={false}
        size='sm'
        isCentered
        className='modalEditProfile'
        isOpen={isEditProfileOpen}
        onClose={onEditProfileClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modalBodyEditProfile'>
            <span>Profile picture</span>
            <UploadWidget profilePictureUrl={userLogged.user.profile.avatar} />
            <form>
              <label>Username</label>
              <input
                type='text'
                value={profileInformation.username}
                onChange={e =>
                  setProfileInformation({
                    ...profileInformation,
                    username: e.target.value,
                  })
                }
              />
              <label>Bio</label>
              <textarea
                value={profileInformation.bio}
                onChange={e =>
                  setProfileInformation({
                    ...profileInformation,
                    bio: e.target.value,
                  })
                }
              ></textarea>
            </form>
          </ModalBody>
          <ModalFooter className='modalFooterEditProfile'>
            <Button className='editProfileButton' onClick={editProfile}>
              Save
            </Button>
            <Button
              className='closeEditProfileButton'
              onClick={onEditProfileClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Navigation;
