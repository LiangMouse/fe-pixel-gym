import { type DailyData } from "../../hook/useFetechWeather";
import { getWeatherStatus, WEATHER_MAP_ICON } from "../../constans";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DailyForecast = ({ data }: { data: DailyData }) => {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } = data;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-6 text-white tracking-wide">Daily forecast</h3>
      <div className="grid grid-cols-7 gap-4">
        {time.map((t, index) => {
          const code = weather_code ? weather_code[index] : 0;
          const status = getWeatherStatus(Number(code));
          const icon = WEATHER_MAP_ICON[status as keyof typeof WEATHER_MAP_ICON];
          const max = temperature_2m_max ? Math.round(temperature_2m_max[index]) : 0;
          const min = temperature_2m_min ? Math.round(temperature_2m_min[index]) : 0;
          const dayName = WEEK_DAYS[t.getDay()];

          return (
            <div
              key={t.toISOString()}
              className="flex flex-col items-center justify-between py-6 px-2 rounded-2xl bg-[#202b3b] text-white hover:bg-[#2b384e] transition-colors cursor-pointer group"
            >
              <div className="text-md font-semibold text-gray-300 group-hover:text-white transition-colors">{dayName}</div>
              <div className="my-3 transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={icon}
                  alt={status}
                  className="w-12 h-12 object-contain drop-shadow-md"
                />
              </div>
              <div className="flex gap-3 text-base font-bold">
                <span>{max}°</span>
                <span className="opacity-50 font-medium">{min}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
