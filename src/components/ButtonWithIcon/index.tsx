import { Button, Spinner } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  label: string;
  icon: IconProp;
  onClick?: () => void;
  variant?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  disabledWithoutSpinner?: boolean;
}

function ButtonWithIcon({
  disabled,
  disabledWithoutSpinner,
  label,
  icon,
  onClick,
  variant,
  className,
  type,
}: Props) {
  return (
    <Button
      disabled={disabled || disabledWithoutSpinner}
      variant={variant}
      onClick={onClick}
      className={className}
      type={type}
    >
      {disabled ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <FontAwesomeIcon icon={icon} />
      )}
      {' '}
      {label}
    </Button>
  );
}

export default ButtonWithIcon;
