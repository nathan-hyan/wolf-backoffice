import { useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonWithIcon from 'components/ButtonWithIcon';
import { getTimeStamp } from 'components/ProductItem/utils';
import { Comment } from 'interfaces/Products';
import { Modal } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { deleteCommentFromProduct } from 'services/products';

interface Props {
    show: boolean;
    handleClose: () => void;
    comments?: Comment[];
    name: string;
    productId: string;
    refresh: () => void;
}

function ProductCommentsModal({
  show, handleClose, comments, name, productId, refresh,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleCommentDelete = ((commentId: string) => {
    setLoading(true);
    deleteCommentFromProduct(productId, commentId).then(
      () => {
        setLoading(false);
        notify.show('Comentario borrado con exito', 'success');
        refresh();
      },
    ).catch(() => {
      notify.show('Ocurrió un error eliminando el comentario', 'error');
      setLoading(false);
    });
  });

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{loading ? 'Borrando comentario...' : `Comentarios de ${name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments && comments.length > 0 ? comments.map((comment) => (
          <p key={comment._id} className="border-bottom pb-3 ">
            <span className="fw-bold">
              {comment.body}
            </span>
            <span className="text-muted">
              {comment.timestamp && ` - ${getTimeStamp(comment.timestamp)}`}
            </span>
            {' '}
            <span className={`text-muted text-small text-decoration-underline ${loading ? 'waiting' : 'link'}`} onClick={() => handleCommentDelete(comment._id)} role="link" tabIndex={0}>eliminar</span>
          </p>
        )) : <h1 className="lead text-muted">Este producto no tiene comentarios</h1>}
      </Modal.Body>
      <Modal.Footer>
        <ButtonWithIcon variant="primary" label="Cerrar" onClick={handleClose} icon={faTimesCircle} />
      </Modal.Footer>
    </Modal>
  );
}

export default ProductCommentsModal;
