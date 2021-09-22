import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  className?: string,
  options: string[];
  name: string;
  label: string;
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function DropdownInput({
  className, options, name, label, onChange, value,
}: Props) {
  return (
    <Form.Group className={className} controlId={name}>
      <Form.Label>{label}</Form.Label>

      <Form.Select aria-label="Default select example" onChange={onChange} name={name} value={value}>
        {options.map((item, index) => <option key={item} value={index}>{item}</option>)}
      </Form.Select>
    </Form.Group>
  );
}

export default DropdownInput;
