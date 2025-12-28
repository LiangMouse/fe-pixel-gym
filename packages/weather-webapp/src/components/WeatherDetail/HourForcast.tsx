import { type HourlyData } from "../../hook/useFetechWeather";

import { getWeatherStatus, WEATHER_MAP_ICON } from "../../constans";

const HourForcast = ({ data }: { data: HourlyData }) => {
  const { time, temperature_2m, weather_code } = data;
  const now = new Date();

  // Find start index: nearest hour or next hour
  // We'll filter for times in the future (or including current hour)
  // Since time array is sorted, we can find the first index where time > now - 1hour
  const futureIndices = time
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => t.getTime() >= now.getTime() - 60 * 60 * 1000)
    .map(({ i }) => i);

  // Take next 24 hours (or less)
  const displayIndices = futureIndices.slice(0, 24);

  return (
    <div className="h-full bg-[#202b3b] rounded-3xl p-8 text-white flex flex-col shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold tracking-wide">Hourly forecast</h3>

        {/* Dropdown Placeholder/Mock */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2 bg-[#2b384e] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#35425e] transition-colors">
            <span>Tuesday</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {/* Dropdown content could go here in a real implementation */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {displayIndices.map((originalIndex) => {
          const t = time[originalIndex];
          const temp = temperature_2m ? Math.round(temperature_2m[originalIndex]) : 0;
          const code = weather_code ? weather_code[originalIndex] : 0;
          const status = getWeatherStatus(Number(code));
          const icon = WEATHER_MAP_ICON[status as keyof typeof WEATHER_MAP_ICON];

          // Format time: 3 PM
          const timeStr = t.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          return (
            <div
              key={t.toISOString()}
              className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-[#2b384e] to-[#253043] hover:from-[#35425e] hover:to-[#2e3b52] transition-colors group cursor-default"
            >
              <div className="flex items-center gap-6">
                <img src={icon} alt={status} className="w-10 h-10 object-contain drop-shadow-sm" />
                <span className="font-semibold text-lg text-gray-100 group-hover:text-white transition-colors">{timeStr}</span>
              </div>
              <div className="text-right font-bold text-xl">{temp}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourForcast;
