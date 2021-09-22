import {
  Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import styles from './styles.module.scss';

interface Props {
  name: string;
  quantity: string;
  total: string;
  contact: string;
  finished?: boolean;
  final?: string;
  active?: boolean;
  // eslint-disable-next-line no-unused-vars
  toggleFinished: (id: string, finished: boolean) => void;
  id?: string;
}

function DataList({
  name,
  quantity,
  total,
  contact,
  active,
  final,
  finished = false,
  toggleFinished,
  id,
}: Props) {
  return (
    <ListGroup.Item active={active}>
      <Container className="p-0 m-1">
        <Row className="d-flex align-items-center justify-content-center">
          <Col md="4" className={styles.name}>
            {name}
          </Col>
          <Col md="2">{quantity}</Col>
          <Col md="2">
            {!active && '$'}
            {total}
          </Col>
          <Col md="2">
            <a target="_blank" rel="noreferrer" href={`https://wa.me/${contact}`}>
              {contact}
            </a>
          </Col>
          <Col md="2" className={styles.final}>
            {active ? (
              final
            ) : (
              <input
                type="checkbox"
                className={styles.checkBox}
                id={id}
                value="name"
                checked={finished}
                onClick={() => toggleFinished(id || '', finished)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

export default DataList;
