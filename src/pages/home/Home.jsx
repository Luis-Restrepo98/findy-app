import React, { useState, useEffect } from "react";
import "./home.scss";
import imageContainer from "../../assets/img/imagen-principal-home.png";
import logoFindy from "../../assets/icons/logo-findy.svg";
import corazonIcon from "../../assets/icons/corazon-icon.svg";
import mensajesIcon from "../../assets/icons/mensajes-icon.svg";
import mensajeIcon from "../../assets/icons/mensaje-icon.svg";
import compartirIcon from "../../assets/icons/compartir-icon.svg";
import banderitaIcon from "../../assets/icons/banderita-icon.svg";
import agregarIcon from "../../assets/icons/agregar-icon.svg";
import imagenOvalo from "../../assets/img/imagen-ovalo.png";
import { getUserByNameAndAvatar } from "../../services/infousuario";

const Home = () => {
  const [userInfo, setUserInfo] = useState([]);

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

  const handleLike = (id)=>{
    alert(`"el id del usuario es", ${id}`)
      //traer id de usuario que inicio sesion, 
      //await post a el array posts enviar id del que inicio sesion y id del dueño de la foto
  }


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
              src={corazonIcon}
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
            {userInfo.map((user, index) => (
              <li key={index} className="container__list__estados">
                <img
                  className="container__list__oval__estados1"
                  src={user.profile.avatar}
                  alt=""
                />
                <h3 className="container__list__nombre">{user.name}</h3>
              </li>
            ))}
          </ul>
        </section>
        <section className="container__publi">
          <ul className="container__list2">
            {userInfo.map((user, index) => (
              <li className="container__list2__publicaciones" key={index}>
                <div className="container__publi__persona">
                  {
                    <img
                      className="container__publi__perfil"
                      src={user.profile.avatar}
                      alt=""
                    />
                  }
                  <h1 className="container__publi__nombre__perfil">
                    {user.name}
                  </h1>
                </div>
                <div>
                  <img
                    className="container__publi__imagen__principal"
                    src={user.profile.avatar}
                    alt=""
                  />
                </div>
                <section>
                  <div className="container__publi__iconos">
                    <img onClick={()=>handleLike(user.id)}
                      className="container__publi__like"
                      src={corazonIcon}
                      alt=""
                    />
                    <img
                      className="container__publi__mensaje"
                      src={mensajeIcon}
                      alt=""
                    />
                    <img
                      className="container__publi__compartir"
                      src={compartirIcon}
                      alt=""
                    />
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
                      {user.name}
                    </h2>
                    <p className="container__publi__comentario">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Praesentium, laborum. Laudantium iusto nemo adipisci
                      ipsam, nobis sit sapiente doloremque temporibus molestiae
                      quos libero repellendus, magnam corrupti nam? Molestiae,
                      temporibus nihil.
                    </p>
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
