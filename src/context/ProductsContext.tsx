/* eslint-disable no-unused-vars */
import LoadingSpinner from 'components/LoadingSpinner';
import { Product } from 'interfaces/Products';
import {
  createContext, ReactNode, useCallback, useContext, useState,
} from 'react';
import { notify } from 'react-notify-toast';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from 'services/products';
import { UserContext } from './UserContext';

interface ContextProps {
  products: Product[];
  gatherProducts: () => void;
  addProductToList: (product: Product) => void;
  editProductFromList: (id: string, product: Product) => void;
  deleteProductFromList: (id?: string) => void;
}

export const ProductsContext = createContext<ContextProps>({
  products: [],
  gatherProducts: () => {},
  addProductToList: (product: Product) => {},
  editProductFromList: (id: string, product: Product) => {},
  deleteProductFromList: (id?: string) => {},
});

function ProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn } = useContext(UserContext);
  const [loadingText, setLoadingText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const gatherProducts = useCallback(
    () => {
      if (isLoggedIn) {
        setLoadingText('Obteniendo productos');
        getAllProducts()
          .then(({ data }) => {
            if (data) {
              setProducts(data.response);
              setLoadingText('');
            }
          })
          .catch(() => {
            notify.show('Ocurrió un error trayendo los datos');
            setLoadingText('');
          });
      }
    },
    [isLoggedIn],
  );

  const addProductToList = (product: Product) => {
    setLoadingText('Agregando producto');
    addProduct(product)
      .then(({ data }) => {
        if (data) {
          if (data.success) {
            notify.show('Se agregó el producto correctamente', 'success');
            gatherProducts();
            setLoadingText('');
          } else {
            setLoadingText('');
            notify.show('Ha ocurrido un error', 'error');
          }
        }
      })
      .catch((err) => {
        notify.show('Ha ocurrido un error', 'error');
        setLoadingText('');
      });
  };

  const editProductFromList = (id: string, product: Product) => {
    setLoadingText('Modificando producto');
    editProduct(id, product)
      .then(({ data }) => {
        if (data) {
          if (data.success) {
            notify.show('Se editó el producto correctamente', 'success');
            gatherProducts();
            setLoadingText('');
          } else {
            notify.show('Ha ocurrido un error', 'error');
            setLoadingText('');
          }
        }
      })
      .catch((err) => {
        notify.show('Ha ocurrido un error', 'error');
        setLoadingText('');
      });
  };

  const deleteProductFromList = (id?: string) => {
    if (confirm('Seguro que deseas eliminar el ítem')) {
      setLoadingText('Eliminando producto');
      deleteProduct(id || '0')
        .then(({ data }) => {
          notify.show('Producto eliminado correctamente!', 'success');
          gatherProducts();
          setLoadingText('');
        })
        .catch((err) => {
          notify.show('Ha ocurrido un error', 'error');
          setLoadingText('');
        });
    }
  };

  const value = {
    products,
    gatherProducts,
    addProductToList,
    editProductFromList,
    deleteProductFromList,
  };

  return (
    <ProductsContext.Provider value={value}>
      {!!loadingText && <LoadingSpinner loadingText={loadingText} />}
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
