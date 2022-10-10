import styles from "../../core-ui/styles/homePageTitle.module.css";

const logo = () => {
  return (
    <>
      <div className={styles.logoTextHome}>
        <span id={styles.ascedance}>A <span id="icolor">s</span> <span>ce </span> <span id={styles.forum} >dan</span> ce</span>
        <div id={styles.forum}>F<span className={styles.dimO} >O</span> R<span className={styles.ushape}>U</span>M</div>
      </div>
    </>
  )
}

export default logo
