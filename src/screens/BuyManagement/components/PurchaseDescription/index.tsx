import ContentContainer from 'components/ContentContainer';
import { Row, Col } from 'react-bootstrap';
import { AdditionalInfo } from 'services/sells';

function PurchaseDescription({
  monthAmount, monthPurchases, totalAmount, totalPurchases,
}:Partial<AdditionalInfo>) {
  return (
    <ContentContainer className="mb-5">
      <Row>
        <Col>
          <h1 className="lead fs-4">Compras recibidas este mes:</h1>
          <p data-testId="monthPurchases" className="fw-bold fs-3">{monthPurchases || 0}</p>
          <h2 className="lead fs-4">En total:</h2>
          <p data-testId="totalPurchases" className="fw-bold fs-3">{totalPurchases || 0}</p>
        </Col>
        <Col>
          <h1 className="lead fs-4">Total suma de productos:</h1>
          <p data-testId="monthAmount" className="fw-bold fs-3">
            $
            {monthAmount || 0}
          </p>
          <h2 className="lead fs-4">En total:</h2>
          <p data-testId="totalAmount" className="fw-bold fs-3">
            $
            {totalAmount || 0}
          </p>
        </Col>
      </Row>
    </ContentContainer>
  );
}

export default PurchaseDescription;
