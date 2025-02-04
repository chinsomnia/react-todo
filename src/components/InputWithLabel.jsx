import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function InputWithLabel(props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.onTitleChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  props: PropTypes.func
}

export default InputWithLabel;
