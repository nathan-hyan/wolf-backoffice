import {
  faSave,
  faSpinner,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonWithIcon from 'components/ButtonWithIcon';
import CustomInput from 'components/CustomInput';
import DropdownInput from 'components/DropdownInput';
import FileUploader from 'components/FileUploader';
import { ProductsContext } from 'context/ProductsContext';
import { Product } from 'interfaces/Products';
import {
  ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Form, Modal,
} from 'react-bootstrap';
import { ADD_ITEM_FORM, SORTING_LABELS } from 'screens/Products/constants';
import { getProduct } from 'services/products';

import styles from './styles.module.scss';

interface StateProps extends Product {
  imageString: string;
  [key: string]: any;
}

interface Props {
  modalShow: boolean;
  toggleClose: () => void;
  id?: string;
}

const EMPTY_STATE = {
  price: 0,
  stock: 0,
  category: 0,
  name: '',
  image: [],
  imageString: '',
  comments: [],
  description: '',
  discount: 0,
  rating: {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
    usersRating: 0,
    total: 0,
  },
};

function AddEditModal({ modalShow, toggleClose, id }: Props) {
  const { addProductToList, editProductFromList } = useContext(ProductsContext);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [state, setState] = useState<StateProps>(EMPTY_STATE);

  const setGlobalIsLoading = (newState: boolean) => {
    setIsImageLoading(newState);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'categoryString') {
      setState({ ...state, category: Number(value) });
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      imageString, name, price, stock, description, category,
    } = state;
    const newImage = imageString.split(',');
    const newProduct = {
      name,
      price,
      stock,
      description,
      category,
      image: newImage,
    };

    if (typeof id === 'string') {
      editProductFromList(id, newProduct);
      toggleClose();
    } else {
      addProductToList(newProduct);
      toggleClose();
    }
  };

  const getSingleItem = useCallback(
    () => {
      setIsDataLoading(true);
      if (typeof id === 'string' && id !== '') {
        getProduct(id || '').then(({ data }) => {
          setIsDataLoading(false);
          if (data) {
            const { category, image } = data.response;

            if (category && image) {
              const imageString = image.join(',');

              setState({
                ...data.response,
                categoryString: category,
                imageString,
              });
            }
          }
        });
      } else {
        setIsDataLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    if (modalShow) {
      setState(EMPTY_STATE);
    }
    getSingleItem();
  }, [getSingleItem, modalShow]);

  const handleFileUploaded = (files?: string[]) => {
    if (files) {
      setState((prevState) => ({
        ...prevState,
        imageString: files.join(','),
      }));
    } else {
      alert(
        'Ocurrió un error tratando de cargar las imágenes. Reintente por favor',
      );
    }
  };

  const displayTitle = () => (typeof id === 'string' ? (
    'Editar producto'
  ) : (
    'Agregar producto'
  ));

  return (
    <Modal
      show={modalShow}
      onHide={isImageLoading ? () => {} : toggleClose}
      size="xl"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isDataLoading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="1x"
                  className="align-self-center"
                />
                <span> Cargando datos...</span>
              </>
            ) : displayTitle()}
          </Modal.Title>
        </Modal.Header>
        {isDataLoading ? (
          <></>
        ) : (
          <Modal.Body>
            {ADD_ITEM_FORM.map((item) => (
              <CustomInput
                key={item.id}
                name={item.name}
                label={item.label}
                type={item.type}
                onChange={handleChange}
                value={state[item.name]}
                required
              />
            ))}
            <DropdownInput
              name="categoryString"
              label="Categorias"
              options={SORTING_LABELS}
              onChange={handleChange}
              value={state.categoryString}
            />
            <FileUploader
              onFileUploaded={handleFileUploaded}
              setGlobalIsLoading={setGlobalIsLoading}
            />
            {typeof id === 'string' && id !== '' && (
              <div className="d-flex flex-column mt-3">
                <p>Imágenes actuales</p>
                <div className={styles.imgContainer}>
                  {state.imageString.split(',').map((i) => (
                    <img src={i} alt={i} className={styles.img} key={i} />
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
        )}
        <Modal.Footer>
          <ButtonWithIcon
            label="Cerrar"
            icon={faTimesCircle}
            variant="secondary"
            onClick={toggleClose}
            disabledWithoutSpinner={isImageLoading}
          />
          <ButtonWithIcon
            label="Guardar"
            icon={faSave}
            variant="primary"
            type="submit"
            disabledWithoutSpinner={isImageLoading}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddEditModal;
