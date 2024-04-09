import styles from ".././styles/Intro.module.scss";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import SignUpForm from "@/components/signUpForm";

export default function Intro() {
  const { data: session } = useSession();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isShowPage, setIsShowPage] = useState(true);

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleRegistration = (state) => {
    setIsFormVisible(state);
    setIsShowPage(!state);
  };

  return (
    <div className={styles.Intro}>
      <Head>
        <title>Sicily Experience</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {isFormVisible && <SignUpForm isClose={handleRegistration} />}
        {isShowPage && (
          <>
            <div className={styles.logo}>
              <Image
                src="/Risorsa.svg"
                width={100}
                height={100}
                className={styles.logoImage}
                alt="logo"
                priority
              />
            </div>

            <h1>Find interest experience to Join in Sicily!</h1>
            <p>We share all experiences!</p>

            {session ? (
              <>
                <p>Signed in as {session.user.username}</p>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <div className={styles.containerBtn}>
                <button onClick={() => signIn()}>Sign In</button>
                <button onClick={() => handleRegistration(true)}>
                  Register
                </button>
              </div>
            )}

            <Link href="/home">Browse as guest</Link>
          </>
        )}
      </main>
    </div>
  );
}
