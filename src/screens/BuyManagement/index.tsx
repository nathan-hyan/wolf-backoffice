import ContentContainer from 'components/ContentContainer';
import CustomPagination from 'components/CustomPagination';
import LoadingSpinner from 'components/LoadingSpinner';
import { Purchase } from 'interfaces/Purchase';
import { useCallback, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { AdditionalInfo, getAllSells, toggleFinished } from 'services/sells';
import DataList from './components/DataList';
import PurchaseDescription from './components/PurchaseDescription';

function Management() {
  const [displayData, setdisplayData] = useState<Purchase[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>();
  const [fullData, setFullData] = useState<Purchase[]>([]);
  const [loadingText, setLoadingText] = useState('');

  const handlePageChange = useCallback((newItems: Purchase[]) => {
    setdisplayData(newItems);
  }, []);

  const handleToggleFinished = (id: string, finished: boolean) => {
    setLoadingText(finished ? 'Restaurando Venta' : 'Finalizando Venta');
    toggleFinished(id)
      .then(() => {
        getAllSells()
          .then((response) => {
            if (response.data) {
              setFullData(
                response.data.data.sort((a: Purchase) => (a.finished ? 1 : -1)),
              );
              setLoadingText('');
            } else {
              notify.show('Ocurrió un error, por favor reintente', 'error');
            }
          })
          .catch((err) => notify.show(err.message || '', 'error'));
      })
      .catch((err) => notify.show(err.message || '', 'error'));
  };

  useEffect(() => {
    setLoadingText('Cargando Ventas');
    getAllSells().then((response) => {
      if (response.data) {
        setAdditionalInfo(response.data?.additionalInfo);
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
      <PurchaseDescription
        monthAmount={additionalInfo?.monthAmount}
        monthPurchases={additionalInfo?.monthPurchases}
        totalAmount={additionalInfo?.totalAmount}
        totalPurchases={additionalInfo?.totalPurchases}
      />
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
              key={data._id}
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
