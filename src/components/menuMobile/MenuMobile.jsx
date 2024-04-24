import styles from "./index.module.scss";
import Link from "next/link";
import {
  IconHome,
  IconHeart,
  IconSailboat,
  IconUserCircle,
  IconInfoCircle,
} from "@tabler/icons-react";

const MenuMobile = () => {
  return (
    <div className={styles.menu}>
      <Link href="/home">
        <IconHome />
      </Link>
      <Link href="/aboutUs">
        <IconInfoCircle />
      </Link>
      <Link href="/experiences">
        <IconSailboat />
      </Link>
      <Link href="/favorites">
        <IconHeart />
      </Link>
      <Link href="/profile">
        <IconUserCircle />
      </Link>
    </div>
  );
};

export default MenuMobile;
