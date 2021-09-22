/* eslint-disable no-unused-vars */
export const ADD_ITEM_FORM = [
  {
    id: 1,
    name: 'name',
    label: 'Nombre de producto',
    type: 'text',
  },
  {
    id: 2,
    name: 'price',
    label: 'Precio',
    type: 'number',
  },
  {
    id: 3,
    name: 'stock',
    label: 'Stock de producto',
    type: 'number',
  },
  {
    id: 5,
    name: 'description',
    label: 'Descripción del producto',
    type: 'textarea',
  },
];

// eslint-disable-next-line no-shadow
export enum SortingType {
  All,
  Wallets,
  Purses,
  Backpacks,
  Bags,
  Accesories
}

export const SORTING_LABELS = ['Sin categoria', 'Billeteras', 'Carteras', 'Mochilas', 'Bolsos', 'Accesorios'];
