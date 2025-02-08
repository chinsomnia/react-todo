import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ children, todoTitle, onTitleChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={onTitleChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.node,
  todoTitle: PropTypes.string,
  onTitleChange: PropTypes.func,
};

export default InputWithLabel;
