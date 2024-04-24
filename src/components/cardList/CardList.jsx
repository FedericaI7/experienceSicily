import Card from "../card/Card";
import styles from "./index.module.scss";

const CardList = ({ experiences }) => {
  return (
    <div className={styles.CardList}>
      {experiences.map((experience) => (
        <Card key={experience._id} experience={experience} isClickable={true} />
      ))}
    </div>
  );
};

export default CardList;
