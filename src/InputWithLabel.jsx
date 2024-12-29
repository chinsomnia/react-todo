import { useRef } from "react";

function InputWithLabel(props) {
  const inputRef = useRef(null);

  const focus = () => inputRef.current.focus();

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
      ></input>
      <button onClick={focus}>Add</button>
    </>
  );
}

export default InputWithLabel;
