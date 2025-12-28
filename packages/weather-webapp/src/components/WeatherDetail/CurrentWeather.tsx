import { type CurrentData } from "../../hook/useFetechWeather";
import useWeatherStore from "../../store/useWeatherStore";
import { getWeatherStatus, WEATHER_MAP_ICON } from "../../constans";

const LittleCard = ({
  title,
  value,
  unit,
}: {
  title: string;
  value: string | number;
  unit?: string;
}) => {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-[#202b3b] text-white h-full justify-between">
      <div className="text-sm text-gray-400 font-medium">{title}</div>
      <div className="text-3xl font-semibold mt-2">
        {value} <span className="text-lg text-gray-400 font-normal">{unit}</span>
      </div>
    </div>
  );
};

const CurrentWeather = ({ data }: { data: CurrentData }) => {
  const currentCity = useWeatherStore((state) => state.currentCity);

  const temp = Math.round(data.temperature_2m ?? 0);
  const code = data.weather_code ?? 0;
  const status = getWeatherStatus(code);
  const icon = WEATHER_MAP_ICON[status as keyof typeof WEATHER_MAP_ICON];

  // Format Date: e.g. "Tuesday, Aug 5, 2025"
  const dateObj = data.time;
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Details
  const feelsLike = Math.round(data.apparent_temperature ?? 0);
  const humidity = Math.round(data.relative_humidity_2m ?? 0);
  const wind = Math.round(data.wind_speed_10m ?? 0);
  const precipitation = data.precipitation ?? 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Main Card */}
      <div className="relative w-full h-[300px] rounded-3xl overflow-hidden text-white p-10 flex justify-between items-center bg-linear-to-br from-[#4F8EF7] to-[#3462D1] shadow-xl">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center opacity-30 mix-blend-overlay z-0"></div>

        <div className="z-10 flex flex-col justify-between h-full">
          <div className="mt-4">
            <h2 className="text-4xl font-bold mb-3 tracking-wide drop-shadow-md">
              {currentCity?.name || "Berlin, Germany"}
            </h2>
            <p className="text-blue-100 text-lg font-medium tracking-wide opacity-90">{dateStr}</p>
          </div>
        </div>

        <div className="z-10 flex items-center gap-6 mr-4">
          <img
            src={icon}
            alt={status}
            className="w-32 h-32 object-contain drop-shadow-xl filter brightness-110"
          />
          <span className="text-9xl font-bold leading-none tracking-tighter drop-shadow-lg">
            {temp}<span className="text-6xl align-top relative top-4">°</span>
          </span>
        </div>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-4 gap-6">
        <LittleCard title="Feels Like" value={feelsLike} unit="°" />
        <LittleCard title="Humidity" value={humidity} unit="%" />
        <LittleCard title="Wind" value={wind} unit=" km/h" />
        <LittleCard title="Precipitation" value={precipitation} unit=" mm" />
      </div>
    </div>
  );
};
export default CurrentWeather;
