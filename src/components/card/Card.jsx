import styles from "./index.module.scss";
import { IconHeart, IconHeartFilled, IconMapPin } from "@tabler/icons-react";
import StarsRating from "../starsRating";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Card = ({ experience, isClickable }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Controlla se l'esperienza è nei preferiti quando il componente
  // viene montato
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isFav = favorites.some((fav) => fav._id === experience._id);
    setIsFavorite(isFav);
  }, []);

  if (!experience) {
    return null;
  }

  const onHandleFavoriteClick = (e) => {
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Rimuove l'esperienza dai preferiti
      const index = favorites.findIndex((fav) => fav._id === experience._id);
      favorites.splice(index, 1);
    } else {
      // Aggiunge l'esperienza ai preferiti
      favorites.push(experience);
    }
    // Aggiorna i preferiti nel localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Infine aggiorna lo stato locale
    setIsFavorite(!isFavorite);
  };

  const onHandleClick = () => {
    if (isClickable) {
      router.push(`/experiences/${experience._id}`);
    }
  };

  return (
    <div
      className={styles.cardBox}
      onClick={onHandleClick}
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      <div className={styles.cardBoxImage}>
        <Image
          src={
            experience.pictures && experience.pictures[0]
              ? experience.pictures[0]
              : ""
          }
          width={1200}
          height={1200}
          alt="experience"
        />
      </div>
      <div className={styles.boxIconTop}>
        <span className={styles.stars}>
          <StarsRating
            rating={experience.rating && experience.rating.$numberDecimal}
          />
        </span>

        {session && (
          <span onClick={onHandleFavoriteClick}>
            {isFavorite ? (
              <IconHeartFilled color="red" />
            ) : (
              <IconHeart color="red" />
            )}
          </span>
        )}
      </div>
      <div className={styles.boxText}>
        <h4>{experience.title}</h4>
        <div className={styles.containerCity}>
          <span className={styles.iconCity}>
            <IconMapPin />
          </span>
          <p>{experience.geolocation}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
