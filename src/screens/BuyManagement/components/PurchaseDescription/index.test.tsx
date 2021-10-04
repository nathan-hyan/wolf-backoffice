import { render, screen } from '@testing-library/react';

import PurchaseDescription from '.';

const PROPS = {
  monthPurchases: 1,
  totalPurchases: 7,
  monthAmount: 255,
  totalAmount: 2295,
};

describe('Purchase description', () => {
  test('Renders ok without props', () => {
    render(<PurchaseDescription />);

    expect(screen.getByText(/recibidas/i)).toBeInTheDocument();
    expect(screen.getByText(/suma/i)).toBeInTheDocument();
    expect(screen.getAllByText(/en total/i)).toHaveLength(2);

    expect(screen.getByTestId('monthPurchases')).toHaveTextContent('0');
    expect(screen.getByTestId('totalPurchases')).toHaveTextContent('0');
    expect(screen.getByTestId('monthAmount')).toHaveTextContent('0');
    expect(screen.getByTestId('totalAmount')).toHaveTextContent('0');
  });

  test('Renders ok with props', () => {
    render(<PurchaseDescription {...PROPS} />);

    expect(screen.getByText(/recibidas/i)).toBeInTheDocument();
    expect(screen.getByText(/suma/i)).toBeInTheDocument();
    expect(screen.getAllByText(/en total/i)).toHaveLength(2);

    expect(screen.getByTestId('monthPurchases')).toHaveTextContent(String(PROPS.monthPurchases));
    expect(screen.getByTestId('totalPurchases')).toHaveTextContent(String(PROPS.totalPurchases));
    expect(screen.getByTestId('monthAmount')).toHaveTextContent(String(PROPS.monthAmount));
    expect(screen.getByTestId('totalAmount')).toHaveTextContent(String(PROPS.totalAmount));
  });
});
