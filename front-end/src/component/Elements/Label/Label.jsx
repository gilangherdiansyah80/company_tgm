// eslint-disable-next-line react/prop-types
const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-black font-bold">
      {children}
    </label>
  );
};

export default Label;
