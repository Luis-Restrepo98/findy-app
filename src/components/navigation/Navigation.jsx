import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const goToHome = () => navigate('/home');
  const goToProfile = () => console.log('Voy al perfil del usuario');

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
          onClick={goToProfile}
        />
      </div>

      <div className='newPostButton'>
        <img src={circulo} alt='circulo' className='circulo' onClick={onOpen} />
        <img
          src={cruzIcon}
          alt='cruzIcon'
          className='cruzIcon'
          onClick={onOpen}
        />
      </div>

      {/* Modal */}

      <Modal
        scrollBehavior='inside'
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        size='sm'
        isCentered
        className='modal'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modalBody'>
            <label>Wanna say something?</label>
            <br />
            <textarea
              required
              id='newPostText'
              name='newPostText'
              type='text'
            />
            <br />
            <UploadWidget />
          </ModalBody>
          <ModalFooter className='modalFooter'>
            <Button className='postButton'>Post</Button>
            <Button className='cancelButton' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Navigation;
