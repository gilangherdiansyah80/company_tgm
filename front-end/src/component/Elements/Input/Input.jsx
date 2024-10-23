// eslint-disable-next-line react/prop-types
const Input = ({ type, name, id, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="p-3 rounded-lg border-black border-2"
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default Input;
