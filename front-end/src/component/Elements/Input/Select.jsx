// eslint-disable-next-line react/prop-types
const Select = ({ name, id, value, onChange, children }) => {
  return (
    <select
      name={name}
      id={id}
      className="p-3 rounded-lg border-black border-2"
      value={value}
      onChange={onChange}
      required
    >
      <option value={value}>{children}</option>
      <option value={value}>{children}</option>
      <option value={value}>{children}</option>
      <option value={value}>{children}</option>
      <option value={value}>{children}</option>
    </select>
  );
};

export default Select;
