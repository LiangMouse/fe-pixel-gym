import useWeatherStore from "../store/useWeatherStore";

// 通过浏览器的获取所在经纬度
function getInitialUserPosition(): Promise<{
  lat: number;
  lng: number;
} | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude; // 纬度
        const lng = position.coords.longitude; // 经度
        console.log(`用户坐标: ${lat}, ${lng}`);
        useWeatherStore.getState().setCoordinates(lat, lng);
        await getCityNameFromPosition(lat, lng);
        resolve({ lat, lng });
      },
      (error) => {
        console.error("获取位置失败", error);
        resolve(null);
      }
    );
  });
}

async function getCityNameFromPosition(lat: number, lon: number) {
  // 使用 OpenStreetMap Reverse Geocoding API
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=zh-CN`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.address) {
      // 优先取 city, 然后 town, village, 最后 fallback 到 display_name 的第一部分
      const cityName = data.address.city || data.address.town || data.address.village || data.display_name?.split(',')[0] || "Unknown";

      const currentCity = {
        name: cityName,
        lat,
        lon,
        address: {
          city: data.address.city || "",
          state: data.address.state || "",
          ISO3166_2_lvl4: data.address.ISO3166_2_lvl4 || "",
          country: data.address.country || "",
          country_code: data.address.country_code || "",
        },
      };

      console.log("Detected City:", currentCity);
      console.log("Data", data);
      useWeatherStore.getState().setCurrentCity(currentCity);
      return currentCity;
    }
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
  return null;
}

export { getInitialUserPosition, getCityNameFromPosition };
