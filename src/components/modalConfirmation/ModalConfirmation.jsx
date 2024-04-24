import styles from "./index.module.scss";

const ModalConfirmation = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`${styles["modal-overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={onClose}
    >
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          {children}
          <button className={styles.btnOk} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
