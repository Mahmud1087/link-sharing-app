import { cn } from '@/utils/cn';

type ButtonProperties = {
  btnClassName: string;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  formID?: string;
  //   handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  btnClassName,
  children,
  type,
  disabled,
  formID,
}: //   handleClick,
ButtonProperties) => {
  return (
    <button
      type={type}
      disabled={disabled}
      form={formID}
      //   onClick={handleClick}
      className={cn(
        'font-semibold leading-6 py-3 px-7 text-center rounded-lg self-stretch transition-all disabled:bg-prim-default/25 disabled:cursor-wait',
        btnClassName
      )}
    >
      {children}
    </button>
  );
};
export default Button;
