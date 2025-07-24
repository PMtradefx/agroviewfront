import styles from './Login.module.css';

const LoginHeader = () => {
  return (
    <div className={styles.headerlogin}>
      <a className={styles.volver} href="/">
        <img src="/volver.png" alt="Volver" />
      </a>
      <a href="/" className={styles.headerLink}>
        <h1>Volver</h1>
      </a>
    </div>
  );
};

export default LoginHeader;
