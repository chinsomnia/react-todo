import { useRef } from "react";

function InputWithLabel({ todoTitle, handleTitleChange }, props) {
  const inputRef = useRef(null);

  const focus = () => inputRef.current.focus();

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        name={props.children}
        value={todoTitle}
        onChange={handleTitleChange}
        autoFocus
        ref={inputRef}
      ></input>
      <button onClick={focus}>Add</button>
    </>
  );
}

export default InputWithLabel;
