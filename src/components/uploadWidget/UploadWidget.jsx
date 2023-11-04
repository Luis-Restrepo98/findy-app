import React, { useEffect, useRef, useState } from 'react';
import cameraIcon from '../../assets/icons/camera-icon.svg';

import './uploadWidget.scss';

const UploadWidget = ({ profilePictureUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageUrl, setImageUrl] = useState('');
  const [profilePictureUpdated, setProfilePictureUpdated] =
    useState(profilePictureUrl);

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
          setProfilePictureUpdated(result.info.secure_url);
          if (error) console.log(error);
        }
      }
    );
  }, []);

  return (
    <>
      <img
        src={profilePictureUpdated || imageUrl || cameraIcon}
        alt='cameraIcon'
        className='previewImage'
        onClick={() => widgetRef.current.open()}
      />
    </>
  );
};

export default UploadWidget;
