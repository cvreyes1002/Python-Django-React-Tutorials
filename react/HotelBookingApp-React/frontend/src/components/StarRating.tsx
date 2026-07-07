import { assets } from "../assets/assets";

const StarRating = ({ rating }: {rating: number}) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="star-icon"
            className="w-4 h-4"
          />
        ))}
    </>
  );
};

export default StarRating;
