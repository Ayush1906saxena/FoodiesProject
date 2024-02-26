"use client";
import classes from "./image-picker.module.css";
import { useRef } from "react";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  // A function to handle clicks by the button and forward it to input button
  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        {/* We want this button to click the input under the hood */}
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
