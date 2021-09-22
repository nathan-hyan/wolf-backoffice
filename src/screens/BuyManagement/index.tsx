import ContentContainer from 'components/ContentContainer';
import CustomPagination from 'components/CustomPagination';
import LoadingSpinner from 'components/LoadingSpinner';
import { Purchase } from 'interfaces/Purchase';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getAllSells, toggleFinished } from 'services/sells';
import DataList from './components/DataList';

function Management() {
  const [displayData, setdisplayData] = useState<Purchase[]>([]);
  const [fullData, setFullData] = useState<Purchase[]>([]);
  const [loadingText, setLoadingText] = useState('');

  const handlePageChange = (newItems: Purchase[]) => {
    setdisplayData(newItems);
  };
  const handleToggleFinished = (id: string, finished: boolean) => {
    setLoadingText(finished ? 'Restaurando Venta' : 'Finalizando Venta');
    toggleFinished(id).then(() => {
      getAllSells().then((response) => {
        if (response.data) {
          setFullData(
            response.data.data.sort((a: Purchase) => (a.finished ? 1 : -1)),
          );
          setLoadingText('');
        }
      });
    });
  };

  useEffect(() => {
    setLoadingText('Cargando Ventas');
    getAllSells().then((response) => {
      if (response.data) {
        setFullData(
          response.data.data.sort((a: Purchase) => (a.finished ? 1 : -1)),
        );
        setLoadingText('');
      }
    });
  }, []);
  return (
    <>
      {!!loadingText && <LoadingSpinner loadingText={loadingText} />}
      <ContentContainer centerContent>
        <ListGroup className="w-100">
          <DataList
            active
            name="Nombre"
            quantity="Cantidad"
            total="Precio"
            contact="Contacto"
            final="Finalizada"
            toggleFinished={() => {}}
          />
          {displayData.map((data) => (
            <DataList
              name={data.userInfo.name}
              quantity={String(data.products.length)}
              total={String(data.amount)}
              contact={String(data.userInfo.whatsApp)}
              finished={data.finished}
              id={data._id}
              toggleFinished={handleToggleFinished}
            />
          ))}
        </ListGroup>
        <CustomPagination
          className="mt-5"
          onChangePage={handlePageChange}
          items={fullData}
        />
      </ContentContainer>
    </>
  );
}

export default Management;
