import React, { useState } from "react";
//import "./Modal.css";

export default function AddDistributeurForm( props) {
  return (
    <>
        <div className="modal">
          <div onClick={props.onBtnClick} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={props.onBtnClick}>
              CLOSE
            </button>
          </div>
        </div>
      
   </>
  );
}