import { create } from "zustand";

// 公制（metric）：温度用摄氏度 °C，风速用 km/h，降水用 mm，气压用 hPa（或 kPa）。
// 英制（imperial）：温度用华氏度 °F，风速用 mph，降水用 in，气压用 inHg。
export type UnitSystem = "metric" | "imperial";

export interface CurrentCity {
  name: string;
  lat: number;
  lon: number;
  address: {
    // 详细地址列表
    city: string;
    state: string;
    ISO3166_2_lvl4?: string;
    country?: string;
    country_code?: string;
  };
}

interface WeatherState {
  unitSystem: UnitSystem;
  cityQuery: string;
  latitude: number | null;
  longitude: number | null;
  currentCity: CurrentCity | null;
  setUnitSystem: (unitSystem: UnitSystem) => void;
  setCityQuery: (cityQuery: string) => void;
  setCoordinates: (latitude: number | null, longitude: number | null) => void;
  setCurrentCity: (currentCity: CurrentCity | null) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  unitSystem: "metric",
  cityQuery: "",
  latitude: null,
  longitude: null,
  currentCity: null,
  setUnitSystem: (unitSystem) => set({ unitSystem }),
  setCityQuery: (cityQuery) => set({ cityQuery }),
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setCurrentCity: (currentCity) => set({ currentCity }),
}));

export default useWeatherStore;
