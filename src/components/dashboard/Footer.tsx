import Button from '../common/Button';

type FooterProps = {
  btnType: 'button' | 'submit' | 'reset';
  formID?: string;
  addClass?: string;
  disabled?: boolean;
};

const Footer = ({ btnType, formID, addClass, disabled }: FooterProps) => {
  return (
    <footer className='px-10 py-6 border-t-2 border-sec-default bg-white h-[84px] rounded-b-xl relative flex items-center'>
      <div className='w-full flex justify-end'>
        <Button
          btnClassName={`w-fit bg-prim-default/25 text-white ${addClass}`}
          type={btnType}
          formID={formID}
          disabled={disabled}
        >
          Save
        </Button>
      </div>
    </footer>
  );
};
export default Footer;
