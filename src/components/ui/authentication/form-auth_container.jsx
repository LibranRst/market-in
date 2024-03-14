import NavTitle from "../navbar/nav-title";

const FormContainer = ({ children }) => {
  return (
    <div className="bg-background-gradient flex h-screen flex-col items-center justify-center gap-5">
      <NavTitle className='text-3xl'>marketIn.</NavTitle>
      {children}
    </div>
  );
};

export default FormContainer;
