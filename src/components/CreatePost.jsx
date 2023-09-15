import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/feature/PostSlice";
import Spiner from "./Spiner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { body, title } = values;
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(values));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  const showCreatePost = () => {
    return (
      <>
        {loading ? (
          <Spiner />
        ) : (
          <>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">{post[0].title}</h5>
                <p className="card-text">{post[0].body}</p>
              </div>
              <div className="d-flex align-items-end justify-content-end">
                <button className="btn btn-warning">Edit</button>
                <button
                  className="btn btn-danger ms-2"
                  // onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <h2 className="text-center bg-dark text-white p-2">create post</h2>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            aria-describedby="emailHelp"
            id="exampleInputEmail1"
            placeholder="Enter post title"
          />
        </div>
        <div className="form-floating">
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            className="form-control"
            placeholder="Post Description Here"
            id="floatingTextarea"
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea">Post Description Here</label>
        </div>
        <div className="d-flex align-items-end justify-content-end m-4">
          <button className="btn btn-warning" onClick={() => nevigate("/")}>
            {" "}
            Go Home{" "}
          </button>
          <button className="btn btn-success ms-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatePost()}</div>}</div>
    </div>
  );
};

export default CreatePost;
