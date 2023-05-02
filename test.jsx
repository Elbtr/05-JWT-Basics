import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Linechart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

const LineCharts504 = () => {
  // const [domain, setDomain] = useState({})
  const [dataSource, setDataSource] = useState([]);
  const [sersorType, setSensorType] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    const response = await axios.get(
      "https://ibnux.github.io/BMKG-importer/cuaca/501320-json"
    );
    setWeatherData(response.data[0]);
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getDataSensor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensorread/one/504"
      );
      const dataSensor = res.data.map(({ ReadDate, Value1 }) => ({
        time: ReadDate.slice(11, 19),
        valueAlat: Value1,
        valueBMKG: weatherData.tempC,
      }));
      setTimeout(() => {
        getDataSensor();
      }, 1000);
      const reversedSensor = dataSensor.reverse();
      setDataSource(reversedSensor);
    } catch (err) {
      console.log(err);
    }
  };
};
