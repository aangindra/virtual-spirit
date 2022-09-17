import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./redux/actions/post";
import Card from "./components/Card";
import Loader from "./components/Loader";
import CardSkeleton from "./components/CardSkeleton";
import { FormModal } from "./components/Modal";
import { useNotification } from "./components/Notification";
import { MIN_POSTS, MAX_POSTS } from "./constants/common";

const Home = () => {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [deletePostModalVisible, setDeletePostModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const notification = useNotification();
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const posts = lodash.get(postState, "posts", []);
  useEffect(() => {
    if (!postState.isFetching) {
      dispatch(getPosts({ from: 1, to: 100 }));
    }
  }, []);

  const handleDelete = (e) => {
    if (e) e.preventDefault();
    dispatch(deletePost(formData));
    notification.addNotification({
      message: "Sucessfully deleted post",
      level: "success",
    });
    setDeletePostModalVisible(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    dispatch(createPost(formData));
    notification.addNotification({
      message: "Sucessfully added post",
      level: "success",
    });
    setPostModalVisible(false);
  };

  const handleEdit = (e) => {
    if (e) e.preventDefault();
    dispatch(updatePost(formData));
    notification.addNotification({
      message: "Sucessfully updated post",
      level: "success",
    });
    setPostModalVisible(false);
  };

  return (
    <div className="bg-neutral-100 w-full min-h-screen">
      <Loader visible={posts.length < MIN_POSTS || postState.getPostsLoading} />
      <FormModal
        title={formData.id ? "Edit Post" : "Add New Post"}
        onClose={(e) => {
          if (e) e.preventDefault();
          setPostModalVisible(false);
        }}
        onSubmit={formData.id ? handleEdit : handleSubmit}
        visible={postModalVisible}
      >
        <div>
          <label className="block text-gray-600">
            Title<span className="text-rose-600">*</span>
          </label>
          <input
            required
            className="block w-full mb-8 py-2 pr-2 bg-white border-b-[1px] border-black focus:border-cornflower-blue-500 focus-visible:outline-none border-0"
            placeholder="eg. AC Milan"
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            value={formData.title}
          />
        </div>
        <div>
          <label className="block text-gray-600">
            Body<span className="text-rose-600">*</span>
          </label>
          <textarea
            className="block w-full mb-8 py-2 pr-2 bg-white border-b-[1px] border-black focus:border-cornflower-blue-500 focus-visible:outline-none border-0"
            placeholder="eg. San Siro Stadium"
            rows={5}
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value,
              })
            }
          />
        </div>
      </FormModal>
      <FormModal
        title={"Please Confirmation"}
        onClose={(e) => {
          if (e) e.preventDefault();
          setDeletePostModalVisible(false);
        }}
        onSubmit={handleDelete}
        customButton={
          <button
            type="submit"
            className="btn border-black border-2 w-24 md:w-32 px-2 py-2 rounded-lg text-black"
          >
            Yes
          </button>
        }
        hideSubmitButton={true}
        visible={deletePostModalVisible}
      >
        <div>
          <p>Are you sure you want delete this post?</p>
        </div>
      </FormModal>
      <div className="py-24">
        {posts.length > MIN_POSTS && (
          <button
            onClick={() => {
              setPostModalVisible(!postModalVisible);
              setFormData({
                title: "",
                body: "",
              });
            }}
            className="cursor-pointer bg-indigo-500 text-white px-4 py-1 rounded-lg flex items-center gap-1 mb-8 mx-32"
          >
            <HiOutlinePlusCircle />
            New Post
          </button>
        )}
        <div className="flex flex-row gap-6 justify-center flex-wrap">
          {posts &&
            posts.length > 10 &&
            posts.map(
              (post) =>
                post && (
                  <Card
                    data={post}
                    key={post.id}
                    onEdit={() => {
                      setPostModalVisible(true);
                      setFormData(post);
                    }}
                    onDelete={() => {
                      setFormData(post);
                      setDeletePostModalVisible(true);
                    }}
                  />
                )
            )}
          {posts &&
            posts.length < MAX_POSTS &&
            Array.from(Array(MAX_POSTS - posts.length).keys()).map((id) => (
              <div className="w-1/5" key={id}>
                <CardSkeleton />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
