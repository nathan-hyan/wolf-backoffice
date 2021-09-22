import { ListGroup } from 'react-bootstrap';
import ContentContainer from 'components/ContentContainer';
import CustomPagination from 'components/CustomPagination';
import {
  useCallback,
  useContext, useEffect, useState,
} from 'react';
import ButtonWithIcon from 'components/ButtonWithIcon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'interfaces/Products';
import { ProductsContext } from 'context/ProductsContext';
import ProductItem from 'components/ProductItem';
import AddEditModal from './components/AddEditModal';

export default function Products() {
  const { gatherProducts, products } = useContext(ProductsContext);

  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [modalShow, setModalShow] = useState(false);

  const [idToEdit, setIdToEdit] = useState('');

  useEffect(() => {
    gatherProducts();
  }, [gatherProducts]);

  const handlePageChange = useCallback((newItems: Product[]) => {
    setDisplayProducts(newItems);
  }, []);

  const toggleClose = (id?: string) => {
    if (id && !modalShow) {
      setIdToEdit(id);
    }

    setModalShow((prevState) => !prevState);
  };

  return (
    <>
      <AddEditModal
        modalShow={modalShow}
        toggleClose={toggleClose}
        id={idToEdit}
      />
      <ContentContainer centerContent>
        <ButtonWithIcon
          label="Agregar producto"
          variant="success"
          icon={faPlusCircle}
          onClick={toggleClose}
          className="mb-5"
        />

        <ListGroup className="w-100">
          <ProductItem
            name="Nombre"
            price="Precio"
            rating="Rating"
            stock="Stock"
            active
            toggleClose={() => {}}
          />
          {displayProducts.map((item) => (
            <ProductItem
              rating={String(item.rating?.total)}
              key={item._id}
              id={item._id}
              name={item.name}
              price={String(item.price)}
              toggleClose={toggleClose}
              stock={String(item.stock)}
              comments={item.comments}
            />
          ))}
        </ListGroup>

        <CustomPagination
          className="mt-5"
          onChangePage={handlePageChange}
          items={products}
        />
      </ContentContainer>
    </>
  );
}
