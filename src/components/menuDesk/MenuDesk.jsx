import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const MenuDesk = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.MenuDesk}>
      <Link className={styles.containerImage} href="/home">
        <Image
          src="/logoBianco.svg"
          width={100}
          height={100}
          className={styles.logoImage}
          alt="logo"
          priority
        />
      </Link>
      <div className={styles.topMenu}>
        <Link href="/favorites">Favorites</Link>
        <Link href="/experiences">Experiences</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/aboutUs">About Us</Link>
        <div>
          {session ? (
            <div className={styles.sessionContainer}>
              <p className={styles.textNameUser}>
                Welcome {session.user.username}!
              </p>
              <button className={styles.btnMenu} onClick={() => signOut()}>
                <p className={styles.textName}>Sign Out</p>
              </button>
            </div>
          ) : (
            <div className={styles.containerBtn}>
              <button className={styles.btnMenu} onClick={() => signIn()}>
                <p className={styles.textName}>Sign In</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDesk;
