/* eslint-disable no-param-reassign */
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { uploadImages } from 'services/products';
import { buildFormData } from './utils';

import styles from './styles.module.scss';

interface Props {
  /* eslint-disable no-unused-vars */
  onFileUploaded: (files: string[]) => void;
  setGlobalIsLoading: (state: boolean) => void;
  /* eslint-enable no-unused-vars */
}

function FileUploader({ onFileUploaded, setGlobalIsLoading }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [multipleImages, setMultipleImages] = useState(false);

  const handleLoading = (hasError: boolean, error?: string) => {
    setIsLoading(false);
    setGlobalIsLoading(false);
    if (hasError) {
      alert(
        error || 'Ocurrió un error tratando de cargar las imágenes. Reintente por favor',
      );
    }
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setGlobalIsLoading(true);
    const { files } = event.target;
    if (!!files && files?.length > 1) {
      setMultipleImages(true);
    }

    try {
      const formData = buildFormData(files);
      uploadImages(formData)
        .then((response) => {
          if (response.data) {
            onFileUploaded(response.data.links);
            handleLoading(false);
          } else {
            handleLoading(true);
            event.currentTarget.value = '';
          }
        })
        .catch((err) => {
          handleLoading(true, err.message);
          event.currentTarget.value = '';
        });
      setMultipleImages(false);
    } catch (err) {
      handleLoading(true, String(err) || 'Ha ocurrido un error, reintente por favor.');
      event.currentTarget.value = '';
      setMultipleImages(false);
    }
  };

  return (
    <Form.Group controlId="formFile" className="mt-3 d-flex flex-column">
      <Form.Label>Imágenes (4 imágenes - Max 10MB)</Form.Label>
      <div className={`d-flex ${styles.gap}`}>
        <Form.Control
          type="file"
          accept="image/*"
          multiple
          onChange={onFileSelect}
          disabled={isLoading}
        />
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="1x"
            className="align-self-center"
          />
        )}
      </div>
      {isLoading && (
        <Form.Text>
          Cargando imagen
          {multipleImages && 'es'}
          ... por favor espere
        </Form.Text>
      )}
      {' '}
    </Form.Group>
  );
}

export default FileUploader;
