import { Link } from 'react-router-dom';

const FormAuth = ({ children, onSubmit, authType = 'login' }) => {
  return (
    <form
      className="flex w-full max-w-[400px] flex-col gap-5 rounded-xl bg-white px-5 py-7 text-sm drop-shadow-lg"
      onSubmit={onSubmit}
    >
      {children}
      {authType === 'login' && (
        <Link
          to="/forgot-password"
          className="cursor-pointer text-center hover:underline"
        >
          forgot password?
        </Link>
      )}
      <button
        type="submit"
        className="w-[200px] self-center rounded-full bg-black px-5 py-3 text-white transition-colors hover:bg-gray-600"
      >
        {authType === 'login' ? 'Login' : 'SignUp'}
      </button>
      {authType === 'signup' && (
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="cursor-pointer font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      )}
      {authType === 'login' && (
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="cursor-pointer font-semibold hover:underline"
          >
            SignUp
          </Link>
        </p>
      )}
    </form>
  );
};

const Title = ({ children }) => {
  return <h1 className="text-center text-3xl font-semibold">{children}</h1>;
};

const Inputs = ({ forms, register, errors, watch }) => {
  return (
    <>
      {forms.map((form) => (
        <div className="relative flex flex-col gap-1" key={form.name}>
          <input
            type={form.type}
            name={form.name}
            id={form.name}
            {...register(form.name, {
              ...form.validation,
            })}
            className={`peer rounded-xl ${errors[form.name] && 'bg-red-50'} bg-gray-100 px-5 pb-2 pt-4 focus:outline-none`}
          />
          {errors[form.name] && (
            <span className="animate-valid-slide-up absolute -bottom-4 left-5 text-xs text-red-500">
              {errors[form.name].message}
            </span>
          )}
          <label
            htmlFor={form.name}
            className={`absolute left-5 top-[calc(50%-10px)] transition-all duration-150 peer-focus:-translate-y-2 peer-focus:text-xs ${errors[form.name] ? 'peer-focus:text-red-500' : 'peer-focus:text-gray-500'}  ${watch(form.name) ? ' -translate-y-2 text-xs text-gray-500' : errors[form.name] ? 'text-red-500' : 'text-black'}`}
          >
            {form.label}
          </label>
        </div>
      ))}
    </>
  );
};

FormAuth.Title = Title;
FormAuth.Inputs = Inputs;

export default FormAuth;
