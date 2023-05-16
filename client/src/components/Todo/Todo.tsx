import { RiDeleteBin6Line } from "react-icons/ri";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Todo = () => {
  return (
    <>
      <div className="w-96 px-5 py-2 m-2 rounded-md bg-slate-200">
        <div className="flex justify-between">
          <h3 className="font-bold">First Todo</h3>
          <div className="text-xl">
            <button className="mr-2">
              <BsFillArrowLeftCircleFill />
            </button>
            <button>
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
        <p className="font-semibold text-justify my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          explicabo aliquam nostrum consequuntur fugit eligendi aliquid odio
          necessitatibus unde veritatis rerum officia facere, officiis corrupti
          nisi sit quae aspernatur optio!
        </p>
        <div className="flex justify-between">
          <span className="w-24 p-1 text-sm text-center font-bold bg-orange-200 bg-opacity-30 text-orange-600 rounded-md">
            In-Progress
          </span>
          <button className="text-red-500 text-xl">
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
