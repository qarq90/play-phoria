import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const SongNav = ({ album, setAlbum }) => {
  return (
    <nav>
      <h1>
        Playphoria
        <span> </span>
        <FontAwesomeIcon icon={faMusic} />
      </h1>
      <button onClick={() => setAlbum(!album)}>Library</button>
    </nav>
  );
};

export default SongNav;
