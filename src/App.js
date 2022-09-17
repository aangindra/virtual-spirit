import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { getPosts } from "./redux/actions/post";
import Card from "./components/Card";
import Loader from "./components/Loader";
import CardSkeleton from "./components/CardSkeleton";
import "./App.css";
import { MAX_POSTS } from "./constants/common";

const App = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const posts = lodash.get(postState, "posts", []);

  useEffect(() => {
    dispatch(getPosts({ from: 1, to: 100 }));
  }, [dispatch]);

  const handleEdit = (e) => {
    console.log(postState);
  };

  const handleDelete = (e) => {
    console.log("delete...");
  };

  return (
    <div className="bg-neutral-100 w-full min-h-screen">
      <Loader visible={posts.length < 10} />
      <div className="flex flex-row gap-6 justify-center flex-wrap py-24">
        {posts &&
          posts.length > 10 &&
          posts.map((post) => (
            <Card
              data={post}
              key={post.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        {posts &&
          posts.length < MAX_POSTS &&
          Array.from(Array(MAX_POSTS - posts.length).keys()).map(() => (
            <div className="w-1/5">
              <CardSkeleton />
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
