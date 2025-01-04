import { useEffect, useRef } from "react";

function InputWithLabel(props) {
  const inputRef = useRef(null);

  useEffect( () => {
    inputRef.current.focus()
  })

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

export default InputWithLabel;
