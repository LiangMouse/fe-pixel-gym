import useFetchWeather from "../../hook/useFetechWeather";
import HourForcast from "./HourForcast";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";

const WeatherDetail = () => {
  const { data, loading, error } = useFetchWeather();
  console.log("weather data", data, "error", error);

  if (loading) return <div className="text-white text-center mt-10">Loading weather data...</div>;
  if (!data) return null;

  const { hourly, current, daily } = data;

  return (
    <div className="flex gap-8 my-8 items-stretch h-[calc(100vh-200px)] min-h-[600px]">
      {/* Left Column */}
      <div className="w-[66%] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        <CurrentWeather data={current} />
        <DailyForecast data={daily} />
      </div>

      {/* Right Column */}
      <div className="w-[34%] h-full">
        <HourForcast data={hourly} />
      </div>
    </div>
  );
};
export default WeatherDetail;
