import { useState } from "react";

interface PropsTypes {
  maxStar?: number;
  color?: string;
  size?: number;
  defaultRating?: number;
  showNumResult?: boolean;
  onGetRating: (value: number) => void;
}
function Star({
  maxStar = 5,
  color = "#facc15",
  size = 28,
  defaultRating = 0,
  onGetRating,
  showNumResult = true,
}: PropsTypes) {
  const [stars, setStars] = useState<number>(defaultRating);
  const [hoverStars, setHoverStars] = useState<number>(0);

  const arry = Array.from({ length: maxStar }, (_, index) => index + 1);

  function handleRating(value: number) {
    setStars(value);
    onGetRating(value);
  }

  return (
    <div
      style={{ color: color, fontSize: `${size / 1.2}px` }}
      className="flex h-6 items-center gap-2 leading-3 "
    >
      <div className="flex">
        {arry.map((i) => (
          <StarItem
            color={color}
            size={size}
            key={i}
            value={i}
            stars={stars}
            setValue={handleRating}
            hoverStars={hoverStars}
            setHoverValue={setHoverStars}
          />
        ))}
      </div>
      {showNumResult &&
        (!hoverStars ? !stars ? null : <p>{stars}</p> : <p>{hoverStars}</p>)}
      {/* <p>{hoverStars || stars || ""}</p> */}
    </div>
  );
}

export default Star;

interface StarItemPropsTypes {
  value: number;
  stars: number;
  hoverStars: number;
  color: string;
  size: number;
  setValue: (value: number) => void;
  setHoverValue: (value: number) => void;
}
function StarItem({
  value,
  stars,
  hoverStars,
  setValue,
  setHoverValue,
  color,
  size,
}: StarItemPropsTypes) {
  const isFull = hoverStars ? hoverStars >= value : stars && stars >= value;

  return (
    <span
      onMouseOver={() => setHoverValue(value)}
      onMouseLeave={() => setHoverValue(0)}
      style={{ width: `${size}px`, height: `${size}px` }}
      className="cursor-pointer px-[1px] "
      onClick={() => setValue(value)}
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      )}
    </span>
  );
}
