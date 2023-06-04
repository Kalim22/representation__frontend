import { useEffect, useState } from "react";
import Button from "./components/Button";

import Header from "./components/Header";
import Loading from "./components/Loading";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import Input from "./components/Input";
import Details from "./components/Details";

function App() {
  const [data, setData] = useState([]);

  const [text, setText] = useState("");

  const [check, setCheck] = useState(false);

  const [sortCheck, setSortCheck] = useState(false);

  const [values, setValues] = useState({
    time: [],
    temperature: [],
    humidity: [],
    windspeed: [],
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";
      const res = await fetch(url);
      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        setData(data);
        setValues({
          time: data?.hourly?.time,
          temperature: data?.hourly?.temperature_2m,
          humidity: data?.hourly?.relativehumidity_2m,
          windspeed: data?.hourly?.windspeed_10m,
        });
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDataToMongo = async () => {
    try {
      setLoading(true);
      const url = "http://localhost:7000/apiv1/save-data";

      const res = await fetch(url);
      const data = await res.json();

      if (data) {
        setTimeout(() => {
          setLoading(false);
          alert("Data successfully saved to mongodb");
          return;
        }, 1200);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filter = () => {
    setCheck(!check);
    setValues({
      time: data?.hourly?.time.reverse(),
      temperature: data?.hourly?.temperature_2m.reverse(),
      humidity: data?.hourly?.relativehumidity_2m.reverse(),
      windspeed: data?.hourly?.windspeed_10m.reverse(),
    });
  };

  const sort = () => {
    setSortCheck(true);
    setValues({
      time: data?.hourly?.time.sort(),
      temperature: data?.hourly?.temperature_2m.sort(),
      humidity: data?.hourly?.relativehumidity_2m.sort(),
      windspeed: data?.hourly?.windspeed_10m.sort(),
    });
  };

  const refresh = async () => {
    await fetchData();
    setSortCheck(false);
  };

  useEffect(() => {
    const subscribe = fetchData();

    return () => subscribe;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="content" style={{ background: "#a9a9a9" }}>
        <div className="details container-fluid">
          <Details keys="Time" value={`${data?.current_weather?.time}`} />
          <Details
            keys="Temperature"
            value={`${data?.current_weather?.temperature}℃`}
          />
          <Details
            keys="Wind Direction"
            value={`${data?.current_weather?.winddirection}deg`}
          />
          <Details
            keys="Wind Speed"
            value={`${data?.current_weather?.windspeed}km/h`}
          />
          <Details keys="Latitude" value={`${data?.latitude}`} />
          <Details keys="Longitude" value={`${data?.longitude}`} />
          <Details keys="TimeZone" value={`${data?.timezone}`} />
          <Details keys="Elevation" value={`${data?.elevation}`} />
        </div>
        <div
          className="input__container"
          style={{ background: "white", padding: "30px 0" }}
        >
          <div className="search__tag">Search By Time</div>
          <Input
            placeholder="Type here...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Header heading="Filter Options" color="#027ad6" />
            <div>
              <Button btnName="Save Data" onClick={saveDataToMongo} />
              <Button
                btnName={!check ? "Reverse" : "Undo"}
                onClick={filter}
                icon={!check ? <BsArrowDownShort /> : <BsArrowUpShort />}
              />
              <Button
                btnName="Sort"
                onClick={sort}
                // icon={!check ? <BsArrowDownShort /> : <BsArrowUpShort />}
              />
              <Button
                btnName="Refresh"
                onClick={refresh}
                disable={!sortCheck ? true : false}
                background={!sortCheck ? "#A9A9A9" : "#027ad6"}
                // icon={!check ? <BsArrowDownShort /> : <BsArrowUpShort />}
              />
            </div>
          </div>

          <div className="table-responsive custom-table-responsive">
            <table className="table custom-table">
              <TableHeader />
              <tbody>
                {data?.hourly?.time.length < 1 ? (
                  <h1>There is no Data available</h1>
                ) : (
                  data?.hourly?.time
                    ?.filter((elements) =>
                      elements.toLowerCase().includes(text.toLowerCase())
                    )
                    .map((ele, idx) => {
                      return (
                        <TableRow
                          // sNo={idx + 1}
                          key={idx}
                          time={ele}
                          temperature={values.temperature[idx]}
                          humidity={values.humidity[idx]}
                          windspeed={values.windspeed[idx]}
                        />
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
