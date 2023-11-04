import "./Perfil.scss";
import React, { useState } from "react";
/* import { Link, Route, Routes } from "react-router-dom"; */
import flechaAtras from "../../assets/icons/atras-icon.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const perfiles = [
    {
      id: 1,
      image: "/src/assets/img/portada.jpg",
      perfil: "https://i.postimg.cc/1X3xs0Kz/angie.jpg",
      followers: "10.7 M",
      likes: "186.3 M",
      name: "Angie Diaz",
      description1:
        "Estudiante de economía y del diplomado en desarrollo Front-End",
      photo: [
        {
          img1: "https://i.postimg.cc/1X3xs0Kz/angie.jpg",
        },
        {
          img2: "https://i.postimg.cc/x8R84tRx/imagen-angie-2.jpg",
        },
        {
          img3: "https://i.postimg.cc/KjN7D7gF/imagen-angie-3.jpg",
        },
        {
          img4: "https://i.postimg.cc/h4b0nnZw/imagen-angie-4.jpg",
        },
      ],
      video: "url_video_tour.mp4",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/tgFG54T9/oscar.jpg",
      perfil: "https://i.postimg.cc/tgFG54T9/oscar.jpg",
      followers: "10.7 M",
      likes: "186.3 M",
      name: "Oscar Gomez",
      description1: "Estudiante del diplomado en desarrollo Front-End",
      photo: [
        {
          img1: "https://i.postimg.cc/tgFG54T9/oscar.jpg",
        },
        {
          img2: "https://i.postimg.cc/jSzfH4V1/imagen-oscar-2.jpg",
        },
        {
          img3: "https://i.postimg.cc/fbD9BSDR/imagen-oscar-3.jpg",
        },
        {
          img4: "https://i.postimg.cc/wjKJRbrJ/imagen-oscar-4.jpg",
        },
      ],
      video: "url_video_tour_2.mp4",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/MTDkC3V4/cristian.jpg",
      perfil: "https://i.postimg.cc/MTDkC3V4/cristian.jpg",
      followers: "10.7 M",
      likes: "186.3 M",
      name: "Cristian Arenas",
      description1: "Estudiante del diplomado en desarrollo Front-End",
      photo: [
        {
          img1: "https://i.postimg.cc/MTDkC3V4/cristian.jpg",
        },
        {
          img2: "https://i.postimg.cc/wxwdw1YT/imagen-cristian-2.jpg",
        },
        {
          img3: "https://i.postimg.cc/Bbnfq0H0/imagen-cristian-3.jpg",
        },
        {
          img4: "https://i.postimg.cc/qqDVq5xC/imagen-cristian-4.jpg",
        },
      ],
      video: "url_video_tour_3.mp4",
    },
    {
      id: 4,
      image: "https://i.postimg.cc/85DQngJM/kevin.jpg",
      perfil: "https://i.postimg.cc/85DQngJM/kevin.jpg",
      followers: "10.7 M",
      likes: "186.3 M",
      name: "Kevin Colorado",
      description1: "Estudiante del diplomado en desarrollo Front-End",
      photo: [
        {
          img1: "https://i.postimg.cc/85DQngJM/kevin.jpg",
        },
        {
          img2: "https://i.postimg.cc/RV8hbsxF/imagen-kevin-2.jpg",
        },
        {
          img3: "https://i.postimg.cc/XYCqMfng/imagen-kevin-3.jpg",
        },
        {
          img4: "https://i.postimg.cc/1544BxT2/imagen-kevin-4.jpg",
        },
      ],
      video: "url_video_tour_3.mp4",
    },
    {
      id: 5,
      image: "https://i.postimg.cc/x8xwCks3/luis.jpg",
      perfil: "https://i.postimg.cc/x8xwCks3/luis.jpg",
      followers: "10.7 M",
      likes: "95.3 M",
      name: "Luis Restrepo",
      description1: "Apasionado por la lógica y la programación",
      photo: [
        {
          img1: "https://i.postimg.cc/x8xwCks3/luis.jpg",
        },
        {
          img2: "https://i.postimg.cc/SxS4dcJs/imagen-luis-2.jpg",
        },
        {
          img3: "https://i.postimg.cc/KcTm8Z6Z/imagen-luis-3.jpg",
        },
        {
          img4: "https://i.postimg.cc/X7c39sNm/imagen-luis-4.jpg",
        },
      ],
      video: "url_video_tour_3.mp4",
    },
  ];
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id", id);
  console.log(typeof id);
  const profileIdToFind = id;
  const profile = perfiles.find((item) => item.id == profileIdToFind);

  const [perfil, setPerfil] = useState("PHOTOS");

  const handlePhotos = () => {
    setPerfil("PHOTOS");
  };

  const handleVideos = () => {
    setPerfil("VIDEOS");
  };

  const handleAlbum = () => {
    setPerfil("ALBUM");
  };

  const handleTag = () => {
    setPerfil("TAG");
  };

  const [seguidores, setSeguidores] = useState(10.7);
  const aumentarSeguidores = () => {
    setSeguidores(seguidores + 0.1);
  };

  return (
    <>
      <main className="contenedor__main">
        <div className="contenedor__main__portada">
          <img
            onClick={() => navigate(`/home`)}
            className="contenedor__main__flecha"
            src={flechaAtras}
            alt=""
          />
          <img
            className="contenedor__main__imgPortada"
            src={profile?.image}
            alt=""
          />
        </div>

        <section className="contenedor__main__background">
          <span className="contenedor__main__span">
            <img
              className="contenedor__main__imgPerfil"
              src={profile?.perfil}
              alt=""
            />
          </span>
          <section className="contenedor__main__FollowLike">
            <div className="contenedor__main__contenFollow">
              <h1 className="contenedor__main__millonFollow">
                {" "}
                {seguidores.toFixed(1)}{" "}
              </h1>
              <h2 className="contenedor__main__followers"> Followers</h2>
            </div>
            <div className="contenedor__main__contenLike">
              <h1 className="contenedor__main__numberLikes">
                {profile?.likes}
              </h1>
              <h2 className="contenedor__main__Likes">Likes</h2>
            </div>
          </section>
          <section className="contenedor__main__textDescription">
            <p className="contenedor__main__name">{profile?.name}</p>
            <h3 className="contenedor__main__description">
              {profile?.description1}
            </h3>
          </section>
          <div className="contenedor__main__contenedorFollow">
            <button
              className="contenedor__main__buttonFollow"
              onClick={aumentarSeguidores}
            >
              Follow
            </button>
            <button className="contenedor__main__buttonMessages">
              {" "}
              Messages{" "}
            </button>
          </div>

          <div className="contenedor__main__contenedorInfo">
            <div className="contenedor__main__contenedor">
              <button
                className="contenedor__main__contenedorButton"
                onClick={handlePhotos}
              >
                Photos{" "}
              </button>
              <button
                className="contenedor__main__contenedorButton"
                onClick={handleVideos}
              >
                Videos
              </button>
              <button
                className="contenedor__main__contenedorButton"
                onClick={handleAlbum}
              >
                Album
              </button>
              <button
                className="contenedor__main__contenedorButton"
                onClick={handleTag}
              >
                Tag
              </button>
            </div>
            <div className="contenedor__main__contenedorPhoto">
              {perfil === "PHOTOS" ? (
                <>
                  {" "}
                  <div>
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__rosado"
                        src={profile?.photo[0].img1}
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__azul"
                        src={profile?.photo[1].img2}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__gris"
                        src={profile?.photo[2].img3}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__morado"
                        src={profile?.photo[3].img4}
                      />
                    ) : (
                      <></>
                    )}
                  </div>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="contenedor__main__contenedorPhoto">
              {perfil === "VIDEOS" ? (
                <>
                  {" "}
                  <div className="contenedor__main__perfilVideos">
                    {perfil === "VIDEOS" ? (
                      <img
                        className="contenedor__main__video1"
                        src={profile?.photo[0].img1}
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "VIDEOS" ? (
                      <img
                        className="contenedor__main__video2"
                        src={profile?.photo[1].img2}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "VIDEOS" ? (
                      <img
                        className="contenedor__main__video3"
                        src={profile?.photo[2].img4}
                      />
                    ) : (
                      <></>
                    )}
                  </div>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Perfil;
