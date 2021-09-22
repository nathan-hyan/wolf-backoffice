import { Row, Col } from 'react-bootstrap';
import styles from './styles.module.scss';

interface Props {
  loadingText?: string;
}

function LoadingSpinner({ loadingText = 'Cargando datos' }: Props) {
  return (
    <>
      <Row className={styles.rowStyle}>
        <Col />
        <Col md={2} className={`${styles.higherZIndex} my-auto shadow bg-light rounded py-4`}>
          <div className="m-auto" style={{ width: '4rem', height: '4rem' }}>
            <div className={styles.spinner} />
            <p className={`m-0 p-0 strong ${styles.rclogoCenter}`} />
          </div>
          <h1 className="mt-4 lead text-gray text-center">
            {loadingText}
            ...
          </h1>
        </Col>
        <Col />
      </Row>
      <div className={styles.backdrop} />
    </>
  );
}

export default LoadingSpinner;
