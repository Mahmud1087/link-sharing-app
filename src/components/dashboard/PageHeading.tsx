type PageHeadingProps = {
  heading: string;
  subheading: string;
};

const PageHeading = (props: PageHeadingProps) => {
  const { heading, subheading } = props;
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-[2rem] font-bold leading-[48px] text-dark-default'>
        {heading}
      </h1>
      <p className='text-dark-light leading-6'>{subheading}</p>
    </div>
  );
};
export default PageHeading;
