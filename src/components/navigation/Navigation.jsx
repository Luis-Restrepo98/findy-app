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
import userIcon from '../../assets/icons/user-icon.svg';

import './navigation.scss';

const Navigation = () => {
  const navigate = useNavigate();
  const [postText, setPostText] = useState('');
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

  const {
    userLogged: { userLogged },
  } = useContext(AppContext);

  console.log('From Navigation:', userLogged);

  const createPost = () => {
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

      createNewPost(postBody);
      setPostText('');
      onPostClose();
    }
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
          src={userIcon}
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
              <input type='text' defaultValue={userLogged.user.name} />
              <label>Bio</label>
              <textarea defaultValue={userLogged.user.profile.bio}></textarea>
            </form>
          </ModalBody>
          <ModalFooter className='modalFooterEditProfile'>
            <Button className='editProfileButton'>Edit</Button>
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
