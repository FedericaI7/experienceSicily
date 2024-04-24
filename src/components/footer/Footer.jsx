import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.containerFooter}>
        <div className={styles.leftSection}>
          <Image
            src="/logoBianco.svg"
            width={100}
            height={100}
            className={styles.logoImage}
            alt="logo"
            priority
          />

          <div>
            <h3>
              "Sicily Experience" is a group final project developed during the
              Edgemony Bootcamp in April 2024.
            </h3>
            <p>#Final Project</p>
            <p>#Edgemony Bootcamp</p>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h3>Contributors</h3>
          <div className={styles.containerContributors}>
            <div className={styles.contributor}>
              <IconBrandGithub />
              <p>Federica Iuvara</p>
              <Link href="https://github.com/FedericaI7">Github</Link>
            </div>
            <div className={styles.contributor}>
              <IconBrandGithub />
              <p>Paolo Spoto</p>
              <Link href="https://github.com/paolospoto">Github</Link>
            </div>
            <div className={styles.contributor}>
              <IconBrandGithub />
              <p>Alessio Restivo</p>
              <Link href="https://github.com/AlessioR7">Github</Link>
            </div>
            <div className={styles.contributor}>
              <IconBrandGithub />
              <p>Rita Landino</p>
              <Link href="https://github.com/RitaL1990">Github</Link>
            </div>
            <div className={styles.contributor}>
              <IconBrandGithub />
              <p>Elia Di Lorenzo</p>
              <Link href="https://github.com/Eli07Romi">Github</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
