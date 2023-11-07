import './Perfil.scss';
import React, { useEffect, useState, useContext } from 'react';
import flechaAtras from '../../assets/icons/atras-icon.svg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  getUserByNameAndAvatar,
  getUserPublic,
} from '../../services/infousuario';
import { AppContext } from '../../routes/Router';

const Perfil = () => {
  const {
    userLogged: { userLogged, userLoggedDispatch },
    postReducerInfo: { postState, postDispatch },
  } = useContext(AppContext);

  const [userInfo, setUserInfo] = useState([]);
  const [userPublic, setUserPublic] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await getUserByNameAndAvatar();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    const obtenerPublic = async () => {
      try {
        const data = await getUserPublic();
        setUserPublic(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatos();
    obtenerPublic();
  }, [postState, userLogged]);

  const navigate = useNavigate();

  const { id } = useParams();
  const profileIdToFind = id;
  const profile = userInfo.find(item => item.id == profileIdToFind);

  const userSelectedPosts = userPublic.filter(
    post => post.userId == profileIdToFind
  );

  const [perfil, setPerfil] = useState('PHOTOS');

  const handlePhotos = () => {
    setPerfil('PHOTOS');
  };

  const handleVideos = () => {
    setPerfil('VIDEOS');
  };

  const handleAlbum = () => {
    setPerfil('ALBUM');
  };

  const handleTag = () => {
    setPerfil('TAG');
  };

  const [seguidores, setSeguidores] = useState(10.7);
  const aumentarSeguidores = () => {
    setSeguidores(seguidores + 0.1);
  };

  return (
    <>
      <main className='contenedor__main'>
        <div className='contenedor__main__portada'>
          <img
            onClick={() => navigate(`/home`)}
            className='contenedor__main__flecha'
            src={flechaAtras}
            alt=''
          />
          <img
            className='contenedor__main__imgPortada'
            src={profile?.profile?.avatar}
            alt=''
          />
        </div>

        <section className='contenedor__main__background'>
          <span className='contenedor__main__span'>
            <img
              className='contenedor__main__imgPerfil'
              src={profile?.profile?.avatar}
              alt=''
            />
          </span>
          <section className='contenedor__main__FollowLike'>
            <div className='contenedor__main__contenFollow'>
              <h1 className='contenedor__main__millonFollow'>
                {seguidores.toFixed(1)}
              </h1>
              <h2 className='contenedor__main__followers'> Followers</h2>
            </div>
            <div className='contenedor__main__contenLike'>
              <h1 className='contenedor__main__numberLikes'>{1000}</h1>
              <h2 className='contenedor__main__Likes'>Likes</h2>
            </div>
          </section>
          <section className='contenedor__main__textDescription'>
            <p className='contenedor__main__name'>{profile?.name}</p>
            <h3 className='contenedor__main__description'>
              {profile?.profile?.bio}
            </h3>
          </section>
          <div className='contenedor__main__contenedorFollow'>
            <button
              className='contenedor__main__buttonFollow'
              onClick={aumentarSeguidores}
            >
              Follow
            </button>
            <button className='contenedor__main__buttonMessages'>
              Messages
            </button>
          </div>

          <div className='contenedor__main__contenedorInfo'>
            <div className='contenedor__main__contenedor'>
              <button
                className='contenedor__main__contenedorButton'
                onClick={handlePhotos}
              >
                Photos
              </button>
              <button
                className='contenedor__main__contenedorButton'
                onClick={handleVideos}
              >
                Videos
              </button>
              <button
                className='contenedor__main__contenedorButton'
                onClick={handleAlbum}
              >
                Album
              </button>
              <button
                className='contenedor__main__contenedorButton'
                onClick={handleTag}
              >
                Tag
              </button>
            </div>
            <div className='contenedor__main__contenedorPhoto'>
              {perfil === 'PHOTOS' ? (
                <div className='photosContainer'>
                  {userSelectedPosts.map((post, index) => (
                    <img
                      key={index}
                      // className='contenedor__main__rosado'
                      // className='contenedor__main__rosado'
                      src={post.content[0].photo}
                      alt=''
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            {/*  <div className='contenedor__main__contenedorPhoto'>
              {perfil === 'VIDEOS' ? (
                <>
                  <div className='contenedor__main__perfilVideos'>
                    {perfil === 'VIDEOS' ? (
                      <img
                        className='contenedor__main__video1'
                        src={profile?.photo[0].img1}
                        alt=''
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === 'VIDEOS' ? (
                      <img
                        className='contenedor__main__video2'
                        src={profile?.photo[1].img2}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === 'VIDEOS' ? (
                      <img
                        className='contenedor__main__video3'
                        src={profile?.photo[2].img4}
                      />
                    ) : (
                      <></>
                    )}
                  </div>{' '}
                </>
              ) : (
                <></>
              )}
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Perfil;
