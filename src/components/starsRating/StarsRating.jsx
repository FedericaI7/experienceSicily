import styles from "./index.module.scss";

const StarsRating = ({ rating }) => {
  return <div className={styles.Stars} style={{ "--rating": rating }}></div>;
};

export default StarsRating;
