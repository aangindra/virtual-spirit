import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { getPosts } from "./redux/actions/post";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const posts = lodash.get(postState, "posts", []);

  useEffect(() => {
    if (postState.posts.length < 100) {
      dispatch(getPosts());
    }
  }, [postState.posts, dispatch]);

  const handleEdit = (e) => {
    console.log(postState);
  };

  const handleDelete = (e) => {
    console.log("delete...");
  };

  return (
    <div className="bg-neutral-100 w-full">
      {/* <div className="bg-neutral-100 absolute top-0 left-0 right-0 bottom-0 -z-10" /> */}
      <div className="flex flex-row justify-center gap-6 flex-wrap py-24">
        {posts.map((post) => (
          <Card
            data={post}
            key={post.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
