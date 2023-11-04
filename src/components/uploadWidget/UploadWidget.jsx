import React, { useEffect, useRef, useState } from 'react';
import cameraIcon from '../../assets/icons/camera-icon.svg';

import './uploadWidget.scss';

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dbtqtuwzw',
        uploadPreset: 'findy-app',
      },
      function (error, result) {
        if (result.event === 'success') {
          // console.log(result.info.secure_url);
          setImageUrl(result.info.secure_url);
          if (error) console.log(error);
        }
      }
    );
  }, []);

  return (
    <>
      <button className='uploadButton' onClick={() => widgetRef.current.open()}>
        Uplaod Photo
      </button>
      <br />
      <img
        src={imageUrl || cameraIcon}
        alt='cameraIcon'
        className='previewImage'
      />
    </>
  );
};

export default UploadWidget;
