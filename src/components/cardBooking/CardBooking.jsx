import styles from "./index.module.scss";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CardBooking = ({ experience, booking, isClickable }) => {
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
      className={styles.Booking}
      onClick={onHandleClick}
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      <div className={styles.containerLeft}>
        <div className={styles.containerImage}>
          <Image
            src={
              experience.pictures && experience.pictures[0]
                ? experience.pictures[0]
                : ""
            }
            width={1200}
            height={1200}
            alt="picture experience"
          />
          {/* <IconHeart
            className={styles.heartIcon}
            size={26}
            color="red"
          
          /> */}
          {session && (
            <span className={styles.heartIcon} onClick={onHandleFavoriteClick}>
              {isFavorite ? (
                <IconHeartFilled
                  className={styles.heartIcon}
                  size={28}
                  color="red"
                />
              ) : (
                <IconHeart className={styles.heartIcon} size={28} color="red" />
              )}
            </span>
          )}
        </div>
        <h1>
          <span className={styles.bold}>Title:</span> {experience.title}
        </h1>
        <h3>
          <span className={styles.bold}>Host: </span>
          {experience.host[0].name_host}
        </h3>
      </div>

      <div className={styles.containerRight}>
        {/* <span className={styles.stars}>
          <StarsRating
            rating={experience.rating && experience.rating.$numberDecimal}
          />
        </span> */}

        {/* {session && (
          <span onClick={onHandleFavoriteClick}>
            {isFavorite ? <IconHeartFilled color="red" /> : <IconHeart />}
          </span>
        )} */}

        <h2>Info Booking</h2>
        <p>
          <span className={styles.bold}>Number: </span>
          {booking.guests}
        </p>
        <p>
          <span className={styles.bold}>Time: </span>
          {booking.timeSlot}
        </p>
        <p>
          <span className={styles.bold}>Price: </span>
          {experience.price.$numberDecimal}$
        </p>
        <p>
          <span className={styles.bold}>Category: </span>
          {experience.category}
        </p>
        <p>
          <span className={styles.bold}>Location: </span>
          {experience.geolocation}
        </p>
      </div>
    </div>
  );
};

export default CardBooking;
