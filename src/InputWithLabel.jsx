import { useRef } from "react";

function InputWithLabel(props) {
  const inputRef = useRef(null);

  return (
    <>
      <label htmlFor="todoTitle">{props.label}</label>
      <input
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.onTitleChange}
        autoFocus
        ref={inputRef}
      />
    </>
  );
}

export default InputWithLabel;
