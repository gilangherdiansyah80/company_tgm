import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// eslint-disable-next-line react/prop-types
const Reactquill = ({ id, placeholder, value, onChange }) => {
  return (
    <ReactQuill
      id={id}
      placeholder={placeholder}
      theme="snow"
      modules={{
        toolbar: [
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ],
      }}
      formats={[
        "header",
        "bold",
        "italic",
        "underline",
        "link",
        "image",
        "list",
      ]} // Pastikan 'list' ada
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default Reactquill;
