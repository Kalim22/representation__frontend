function TableRow(props) {
  return (
    <>
      <tr>
        {/* <td className="text-center">{props.sNo}</td> */}
        <td className="text-center text-primary">{props.time}</td>
        <td className="text-center">{props.temperature}℃</td>
        <td className="text-center">{props.humidity}%</td>
        <td className="text-center">{props.windspeed}km/h</td>
      </tr>
    </>
  );
}

export default TableRow;
