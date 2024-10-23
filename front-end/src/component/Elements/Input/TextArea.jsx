// eslint-disable-next-line react/prop-types
const TextArea = ({ name, id, placeholder, value, onChange }) => {
  return (
    <textarea
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

export default TextArea;
