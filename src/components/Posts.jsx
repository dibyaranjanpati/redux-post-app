import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/feature/PostSlice";
import Spiner from "./Spiner";

const Posts = () => {
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, edit, body } = useSelector((state) => ({
    ...state.app,
  }));

  const handleFetchPost = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("plese provide a post id");
      console.log(id);
    } else {
      dispatch(getPost(id));
      console.log(id);
      setId("");
    }
  };

  // delete post
  const handleDelete = (id) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("post delete !");
  };

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  return (
    <>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleFetchPost}
            >
              Fatch Post
            </button>
            <button
              type="onClick"
              className="btn btn-success ms-3"
              onClick={() => nevigate("/createpost")}
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spiner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          className="form-control"
                          id="floatingTextarea"
                        />
                        <div className="d-flex align-items-end justify-content-end mt-4">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
