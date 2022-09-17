import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div>
      <Skeleton height={150} />
      <p>
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default CardSkeleton;
