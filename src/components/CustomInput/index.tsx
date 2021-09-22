import { Form } from 'react-bootstrap';

interface Props {
  name: string;
  label: string;
  type: string;
  error?: string;
  pattern?: string;
  title?: string;
  className?: string;
  onChange?: any;
  value?: string;
  required?: boolean;
}

function CustomInput({
  name,
  label,
  type,
  error,
  pattern,
  title,
  className,
  onChange,
  value,
  required,
}: Props) {
  return (
    <Form.Group className={className} controlId={name}>
      <Form.Label>{label}</Form.Label>
      {type === 'textarea' ? (
        <Form.Control
          as="textarea"
          placeholder="Descripción"
          onChange={onChange}
          name={name}
          title={title}
          value={value}
          required={required}
          style={{ height: '100px' }}
        />
      ) : (
        <Form.Control
          onChange={onChange}
          name={name}
          type={type}
          pattern={pattern}
          title={title}
          value={value}
          required={required}
        />
      )}
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}

export default CustomInput;
