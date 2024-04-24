import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/Profile.module.scss";
import Image from "next/image";
import MenuDesk from "@/components/menuDesk";
import MenuMobile from "@/components/menuMobile";
import Footer from "@/components/footer";
import CardBooking from "@/components/cardBooking";
// import Card from "@/components/card";

export default function Profile() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (session) {
      fetch(`/api/user/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetch(`/api/reservations/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const promises = data.map((booking) =>
            fetch(`/api/experiences/${booking.esperienceId}`)
              .then((res) => res.json())
              .then((experience) => {
                // Aggiunge i dettagli dell'esperienza alla prenotazione così avremo
                // la lista con le card
                return { ...booking, experience };
              })
          );
          Promise.all(promises).then((bookingsWithDetails) => {
            setBookings(bookingsWithDetails);
          });
        });
    }
  }, [session]);

  if (!user) return null;

  return (
    <div className={styles.Profile}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <MenuDesk />
        <MenuMobile />
      </nav>
      <main className={styles.infoProfile}>
        <div className={styles.backTheme}>
          <Image
            src="/profile-icon-isolated-white-on-600nw-211470211.webp"
            width={200}
            height={200}
            alt="user profile picture"
          />
        </div>
        <div className={styles.session}>
          {session ? (
            <div className={styles.sessionContainer}>
              <p className={styles.textName}>
                Welcome {session.user.username}!
              </p>
              <button className={styles.btnMenu} onClick={() => signOut()}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.containerBtn}>
              <button className={styles.btnMenu} onClick={() => signIn()}>
                Sign In
              </button>
            </div>
          )}
        </div>
        <div className={styles.containerInfo}>
          <div className={styles.infoName}>
            <h2>
              {user.name} {user.lastname}
            </h2>
          </div>
          <p className={styles.username}>
            <span className={styles.labelInfo}>Username:</span>
            {user.username}
          </p>
          <p className={styles.email}>
            <span className={styles.labelInfo}>Email:</span> {user.email}
          </p>
        </div>
      </main>

      <section>
        <div className={styles.bookings}>
          <h4 className={styles.title}>
            {bookings.length > 0 ? "Your Bookings:" : "Bookings made: none"}
          </h4>

          {bookings.map((booking) => (
            <div key={booking.esperienceId} className={styles.bookingList}>
              <CardBooking
                experience={booking.experience}
                booking={booking}
                isClickable={false}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
