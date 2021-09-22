import {
  faComment,
  faEdit,
  faStar,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductsContext } from 'context/ProductsContext';
import { Comment } from 'interfaces/Products';
import { useContext, useState } from 'react';
import {
  Button, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import ProductCommentsModal from './components/ProductCommentsModal';

import styles from './styles.module.scss';

interface Props {
  name: string;
  price: string;
  id?: string;
  stock?: string;
  comments?: Comment[];
  active?: boolean;
  rating?: string;
  // eslint-disable-next-line no-unused-vars
  toggleClose: (id?: string) => void;
}

function ProductItem({
  name,
  price,
  id,
  active,
  rating,
  comments,
  stock,
  toggleClose,
}: Props) {
  const [show, setShow] = useState(false);
  const { deleteProductFromList, gatherProducts } = useContext(ProductsContext);

  const handleClose = () => {
    setShow((prevState) => !prevState);
  };

  const refreshList = () => {
    gatherProducts();
  };

  return (
    <>
      <ProductCommentsModal show={show} handleClose={handleClose} comments={comments} name={name} productId={id || ''} refresh={refreshList} />
      <ListGroup.Item active={active}>
        <Container className="p-0 m-0">
          <Row className="d-flex align-items-center justify-content-center">
            <Col md="7" className={styles.name}>
              {name}
            </Col>
            <Col md="1"><span className={Number(stock) <= 0 ? 'text-danger fw-bold' : ''}>{stock}</span></Col>
            <Col md="1">
              {!active && '$'}
              {price}
            </Col>
            <Col md="1">
              {!active && (
                <FontAwesomeIcon icon={faStar} className="text-warning" />
              )}
              {' '}
              {active
                ? rating
                : Math.round((Number(rating) + Number.EPSILON) * 100) / 100}
            </Col>
            <Col md="2">
              {!active && (
                <>
                  <Button
                    size="sm"
                    className="my-0"
                    onClick={() => toggleClose(id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mx-3 my-0"
                    onClick={() => deleteProductFromList(id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="my-0"
                    onClick={handleClose}
                  >
                    <FontAwesomeIcon icon={faComment} />
                    {' '}
                    (
                    {comments?.length}
                    )
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </>
  );
}

export default ProductItem;
