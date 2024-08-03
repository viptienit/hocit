import MainNavigation from "../Components/MainNavigation";
import styles from "./Root.module.css";
const Error = () => {
  return (
    <>
      <MainNavigation />
      <main className={styles.content}>
        <h1>An error occurred</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};
export default Error;
