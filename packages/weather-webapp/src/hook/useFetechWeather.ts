import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import { getInitialUserPosition } from "../lib/initialUserPosition";
import useWeatherStore from "../store/useWeatherStore";

export interface DailyData {
  time: Date[];
  temperature_2m_max: Float32Array | null;
  temperature_2m_min: Float32Array | null;
  weather_code: Float32Array | null;
}

export interface HourlyData {
  time: Date[];
  temperature_2m: Float32Array | null;
  weather_code: Float32Array | null;
}
export interface CurrentData {
  time: Date;
  temperature_2m: number | null;
  relative_humidity_2m: number | null;
  apparent_temperature: number | null;
  precipitation: number | null;
  weather_code: number | null;
  wind_speed_10m: number | null;
}
export interface WeatherData {
  current: CurrentData;
  hourly: HourlyData;
  daily: DailyData;
}

const API_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchWeather(latitude: number, longitude: number) {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ],
  };
  const responses = await fetchWeatherApi(API_URL, params);
  const response = responses[0];
  if (!response) {
    throw new Error("Weather response is empty");
  }

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  if (!current) {
    throw new Error("Weather response missing current data");
  }
  const hourly = response.hourly();
  if (!hourly) {
    throw new Error("Weather response missing hourly data");
  }
  const daily = response.daily();
  if (!daily) {
    throw new Error("Weather response missing daily data");
  }

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)?.value() ?? null,
      relative_humidity_2m: current.variables(1)?.value() ?? null,
      apparent_temperature: current.variables(2)?.value() ?? null,
      precipitation: current.variables(3)?.value() ?? null,
      weather_code: current.variables(4)?.value() ?? null,
      wind_speed_10m: current.variables(5)?.value() ?? null,
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000
          )
      ),
      temperature_2m: hourly.variables(0)?.valuesArray() ?? null,
      weather_code: hourly.variables(1)?.valuesArray() ?? null,
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
            1000
          )
      ),
      temperature_2m_max: daily.variables(0)?.valuesArray() ?? null,
      temperature_2m_min: daily.variables(1)?.valuesArray() ?? null,
      weather_code: daily.variables(2)?.valuesArray() ?? null,
    },
  } satisfies WeatherData;
}

export default function useFetchWeather() {
  const latitude = useWeatherStore((state) => state.latitude);
  const longitude = useWeatherStore((state) => state.longitude);
  console.log("latitude", latitude, "longitude", longitude);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      getInitialUserPosition();
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchWeather(latitude, longitude)
      .then((weatherData) => {
        if (cancelled) return;
        setData(weatherData);
        setLoading(false);
        console.log(weatherData, "weatherData");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  return { data, loading, error };
}
