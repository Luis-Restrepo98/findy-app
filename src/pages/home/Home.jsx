import React, { useState, useEffect, useReducer, useContext } from "react";
import "./home.scss";
import imageContainer from "../../assets/img/imagen-principal-home.png";
import logoFindy from "../../assets/icons/logo-findy.svg";
import corazonIcon1 from "../../assets/icons/corazon-icon1.svg";
import mensajesIcon from "../../assets/icons/mensajes-icon.svg";
import mensajeIcon from "../../assets/icons/mensaje-icon.svg";
import compartirIcon from "../../assets/icons/compartir-icon.svg";
import banderitaIcon from "../../assets/icons/banderita-icon.svg";
import agregarIcon from "../../assets/icons/agregar-icon.svg";
import imagenOvalo from "../../assets/img/imagen-ovalo.png";
import {
  getUserByNameAndAvatar,
  getUserPublic,
} from "../../services/infousuario";
import userLoggedReducer, {
  userLoggedInitial,
} from "../../reducers/userLoggedReducer";
import { AppContext } from "../../routes/Router";
import { addLikeToPost } from "../../services/postsService";

import jennieKim from '../../assets/img/jennie-kim.png';

import './home.scss';

const Home = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userPublic, setUserPublic] = useState([]);

  const [state, dispatch] = useReducer(userLoggedReducer, userLoggedInitial);
  const {
    loggedInfo: { userLogged },
  } = useContext(AppContext);


  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, []);

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
  }, [userPublic.likes]);

  const handleLike = (id) => {
    addLikeToPost(id, userLogged.user.id);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
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
      <main className="container__home">
        <header className="header__container">
          <div className="header__container__logo">
            <img src={logoFindy} alt="" />
          </div>
          <div>
            <img
              className="header__container__corazon"
              src={corazonIcon1}
              alt=""
            />
            <img
              className="header__container__mensaje"
              src={mensajesIcon}
              alt=""
            />
          </div>
        </header>
        <section className="container__estados">
          <ul className="container__list">
            {userPublic.map((publi, index) => (
              <li key={index} className="container__list__estados">
                {publi.content.map((photos, photoIndex) => (
                  <img
                    key={photoIndex}
                    className="container__list__oval__estados1"
                    src={photos.photo}
                    alt=""
                  />
                ))}
                <h3 className="container__list__nombre">
                  {userInfo.find((user) => user.id === publi.userId)?.name}
                </h3>
              </li>
            ))}
          </ul>
        </section>
        <section className="container__publi">
          <ul className="container__list2">
            {userPublic.map((publi, index) => (
              <li className="container__list2__publicaciones" key={index}>
                <div className="container__publi__persona">
                  {
                    <img
                      className="container__publi__perfil"
                      src={
                        userInfo.find((user) => user.id === publi.userId)
                          ?.profile.avatar
                      }
                      alt=""
                    />
                  }
                  <h1 className="container__publi__nombre__perfil">
                    {userInfo.find((user) => user.id === publi.userId)?.name}
                  </h1>
                </div>
                <div>
                  {publi.content.map((photos, photoIndex) => (
                    <img
                      key={photoIndex}
                      className="container__publi__imagen__principal"
                      src={photos.photo}
                      alt=""
                    />
                  ))}
                </div>
                <section>
                  <div className="container__publi__iconos">
                    <img
                      onClick={() => handleLike(publi.id)}
                      className="container__publi__like"
                      src={corazonIcon1}
                      alt=""
                    />
                    <span>{publi.likes.length}</span>
                    <img
                      onClick={openModal}
                      className="container__publi__mensaje"
                      src={mensajeIcon}
                      alt=""
                    />
                    <span>0</span>
                    {isModalOpen && (
                      <div className="modal">
                        <div className="modal-content">
                          <span className="close" onClick={closeModal}>
                            &times;
                          </span>
                          <h2>Comentarios</h2>
                          <ul>
                            {publi.comments.map((comments, index) => (
                              <li key={index}>{comments.contents}</li>
                            ))}
                          </ul>
                          <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Agregar un comentario..."
                          />
                          <button onClick={addComment}>
                            Agregar Comentario
                          </button>
                        </div>
                      </div>
                    )}
                    <img
                      className="container__publi__compartir"
                      src={compartirIcon}
                      alt=""
                    />
                    <span>0</span>
                    <div>
                      <img
                        className="container__publi__banderita"
                        src={banderitaIcon}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="container__publi__comentarios">
                    <h2 className="container__publi__nombre__comentario">
                      {userInfo.find((user) => user.id === publi.userId)?.name}
                    </h2>
                    {publi.content.map((comment, commentIndex) => (
                      <p
                        key={commentIndex}
                        className="container__publi__comentario"
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
      </main>
    </>
  );
};

export default Home;
