import "./Perfil.scss";
import React, { useState } from "react";
/* import { Link, Route, Routes } from "react-router-dom"; */
import {useParams} from "react-router-dom";
import data from "../../data/db.json";

const Perfil = () => {
  const {id}=useParams()
  const profileIdToFind = id;
  const profile = data.perfiles.find((item) => item.id === profileIdToFind);
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
        <img
          className="contenedor__main__imgPortada"
          src={profile.image}
          alt=""
        />
        <section className="contenedor__main__background">
          <span className="contenedor__main__span">
            <img
              className="contenedor__main__imgPerfil"
              src={profile.perfil}
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
              <h1 className="contenedor__main__numberLikes">{profile.likes}</h1>
              <h2 className="contenedor__main__Likes">Likes</h2>
            </div>
          </section>
          <section className="contenedor__main__textDescription">
            <p className="contenedor__main__name">{profile.name}</p>
            <h3 className="contenedor__main__description">
              {profile.description1}
            </h3>
            <h3 className="contenedor__main__follow">{profile.description2}</h3>
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
                        src={profile.photo[0].img1}
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__azul"
                        src={profile.photo[1].img2}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__gris"
                        src={profile.photo[2].img3}
                      />
                    ) : (
                      <></>
                    )}
                    {perfil === "PHOTOS" ? (
                      <img
                        className="contenedor__main__morado"
                        src={profile.photo[3].img4}
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
            {/* <div className="contenedor__main__contenedorPhoto">
              {perfil === "VIDEOS" ? (
                <>
                  {" "}
                  <div className="contenedor__main__perfilVideos">
                    {perfil === "VIDEOS" ? (
                      <img className="contenedor__main__video1"  src={photoRosada} alt="" />
                    ) : (
                      <></>
                    )}
                    {perfil === "VIDEOS" ? <img className="contenedor__main__video2" src={photoAzul} /> : <></>}
                    {perfil === "VIDEOS" ? <img className="contenedor__main__video3" src={photoMorado} /> : <></>}
                  </div>{" "}
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
