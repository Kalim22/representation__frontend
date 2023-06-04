import { AiOutlineArrowsAlt } from "react-icons/ai";

function TableHeader({ singleListReverse }) {
  return (
    <thead>
      <tr>
        {/* <th scope="col" className="text-center">
          S.no
        </th> */}
        <th scope="col" className="text-center">
          Time
          <AiOutlineArrowsAlt
            size={30}
            style={{ transform: "rotate(-45deg)" }}
          />
        </th>
        <th scope="col" className="text-center">
          Temperature{" "}
          <AiOutlineArrowsAlt
            size={30}
            style={{ transform: "rotate(-45deg)" }}
          />
        </th>
        <th scope="col" className="text-center">
          Relative Humidity{" "}
          <AiOutlineArrowsAlt
            size={30}
            style={{ transform: "rotate(-45deg)" }}
          />
        </th>
        <th scope="col" className="text-center">
          Windspeed
          <AiOutlineArrowsAlt
            size={30}
            style={{ transform: "rotate(-45deg)" }}
          />
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
