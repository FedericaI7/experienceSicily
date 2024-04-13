import styles from "../../styles/ExperienceDetail.module.scss";
import Head from "next/head";

import Image from "next/image";
import {
  IconHeart,
  IconHeartFilled,
  IconArrowLeft,
  IconMapPin,
} from "@tabler/icons-react";
import MenuMobile from "@/components/menuMobile";
import MenuDesk from "@/components/menuDesk";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StarsRating from "@/components/starsRating";
import CardList from "@/components/cardList";
import Footer from "@/components/footer";
import ImagesSlider from "@/components/imagesSlider";

export default function ExperienceDetail() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [experience, setExperience] = useState(null);
  const [relatedExperiences, setRelatedExperiences] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  // slider
  const [mainPic, setMainPic] = useState(null);
  const [pics, setPics] = useState([]);

  const handleImageClick = (clickedPic) => {
    const newPics = pics.map((pic) => (pic === clickedPic ? mainPic : pic));
    newPics.sort();
    setMainPic(clickedPic);
    setPics(newPics);
  };

  const onHandleFavorite = () => {
    if (session) {
      setIsFavorite((prev) => !prev);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/experiences/${id}`);
      const data = await res.json();

      setExperience(data);

      // Imposta l'immagine principale e le altre immagini utilizzando i dati
      // dell'esperienza
      setMainPic(data.pictures[0]);
      setPics(data.pictures.slice(1));

      const allRes = await fetch("/api/experiences");
      const allData = await allRes.json();

      const relatedData = allData.filter(
        (exp) => exp.category === data.category && exp._id !== data._id
      );

      setRelatedExperiences(relatedData);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!experience) {
    return <div></div>;
  }

  const handleModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.ExperieceDetail}>
      <Head>
        <title>Experience</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ---NAV--- */}
      <nav className={styles.navExperienceDetail}>
        {/* ***MODAL TEST*** */}
        {/* {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeModal} onClick={handleModal}>
                &times;
              </span>
              <p>User need Login</p>
            </div>
          </div>
        )} */}
        <div className={styles.containerSlider}>
          <ImagesSlider
            className={styles.slider}
            pictures={experience.pictures}
          />
        </div>
        <MenuDesk />
        <MenuMobile />
      </nav>

      {/* ---MAIN--- */}
      <main className={styles.mainExperienceDetail}>
        <section className={styles.info}>
          <div className={styles.infoTitleCity}>
            <h1 className={styles.titleInfo}>{experience.title}</h1>
            <div className={styles.containerCityStarsPrice}>
              <div className={styles.city}>
                <IconMapPin className={styles.iconMap} />
                <p>{experience.geolocation}</p>
              </div>
              <div className={styles.infoPriceStars}>
                {/* <p>Rating Stelle</p> */}
                <StarsRating rating={4} />
                <p>{experience.price && experience.price.$numberDecimal}$</p>
              </div>
            </div>
          </div>
          {/* ****PREZZO E RATING MOBILE*** */}

          <div className={styles.containerOrganiz}>
            <div className={styles.organizPicture}>
              <Image
                src="/organiz.png"
                width={100}
                height={100}
                alt="organizer picture"
              />
            </div>
            <div className={styles.organizNameSurn}>
              <p>
                {experience.host && experience.host[0]
                  ? experience.host[0].name_host
                  : ""}
              </p>
            </div>
          </div>
        </section>

        {/* ---DESCRIPTION and PICTURE SECTION FOR DESK--- */}
        <div className={styles.picAndDescription}>
          <div className={styles.boxPicture}>
            <div className={styles.mainPic}>
              <Image
                src={mainPic}
                width={1000}
                height={1000}
                alt="image experience"
              />
              <button
                className={styles.iconHeartDesk}
                onClick={onHandleFavorite}
              >
                {isFavorite ? (
                  <IconHeartFilled size={26} color={"red"} />
                ) : (
                  <IconHeart size={26} />
                )}
              </button>
            </div>
            <div className={styles.containerPicBottom}>
              <div className={styles.containerPicBottom}>
                {pics.map((pic, index) => (
                  <div
                    key={index}
                    className={styles.picBottom}
                    onClick={() => handleImageClick(pic)}
                  >
                    <Image
                      src={pic}
                      width={400}
                      height={400}
                      alt="image experience"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.infoDescription}>
            <h2>Description</h2>
            <p className={styles.description}>{experience.program}</p>
            {/* ****PREZZO E RATING DESK*** */}
            <div className={styles.infoPriceStarsDesk}>
              <StarsRating
                rating={experience.rating && experience.rating.$numberDecimal}
              />
              <p>{experience.price && experience.price.$numberDecimal}$</p>
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.arrowButton}
                onClick={() => router.back()}
              >
                <IconArrowLeft size={20} />
                Back
              </button>
              <button className={styles.experienceBtn}>Add Experience</button>
            </div>
          </div>
        </div>
        <div className={styles.suggestion}>
          <h2>Suggestion for you</h2>
          <CardList experiences={relatedExperiences} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
