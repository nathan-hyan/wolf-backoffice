import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    outerPadding?: 1|2|3|4|5;
    centerContent?: boolean;
    className?: string;
}

function ContentContainer({
  children, outerPadding = 3, centerContent, className,
}: Props) {
  return (
    <div className={`${className} bg-white ${outerPadding ? `p-${outerPadding}` : ''} rounded shadow d-flex flex-column ${centerContent && 'justify-content-center align-items-center'}`}>
      {children}
    </div>
  );
}

export default ContentContainer;
