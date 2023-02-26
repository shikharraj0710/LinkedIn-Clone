import React, { useState } from "react";
import "./Modal.css";
import { useForm } from "react-hook-form";

export default function Modal({ show, setModalShow }) {
  const [modalForm, setModalForm] = useState({ caption: "", file: null });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function windowOnClick(event) {
    var modal = document.querySelector(".modal");
    if (event.target === modal) {
      setModalShow((prev) => !prev);
    }
  }

  function handleModalFormData() {
    console.log(modalForm)
  }
   

  return (
    <>
      {show && (
        <div className="modal" onClick={windowOnClick}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setModalShow((prev) => !prev)}>×</span>
            <div className="modal__title">Post Photo</div>
            <form>
              <input
                type="text"
                placeholder="Enter Caption"
                onInput={(e) =>
                  setModalForm((prev) => ({ ...prev, caption: e.target.value }))
                }
                name="caption"
                {...register("caption", {
                  required: { value: true, message: "Caption cannot be Empty" },
                })}
              />
              {errors?.caption && (
                <div className="input__error">{errors?.caption?.message}</div>
              )}
              <div class="upload-btn-wrapper">
                <button class="btn">Upload a file</button>
                <input
                type="file"
                onInput={(e) =>
                  setModalForm((prev) => ({
                    ...prev,
                    file: e.target.files[0],
                  }))
                }
                name="file"

                {...register("file", {
                  required: { value: true, message: "Select a photo" },
                })}
              />
              </div>
              
              {errors?.file && (
                <div className="input__error">{errors?.file?.message}</div>
              )}
              <button type="submit" onClick={handleSubmit(handleModalFormData())} id="modal-btn">
              <span>Sign In</span>
            </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
