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
      (position) => {
        const lat = position.coords.latitude; // 纬度
        const lng = position.coords.longitude; // 经度
        console.log(`用户坐标: ${lat}, ${lng}`);
        useWeatherStore.getState().setCoordinates(lat, lng);
        resolve({ lat, lng });
      },
      (error) => {
        console.error("获取位置失败", error);
        resolve(null);
      }
    );
  });
}
function getCityNameFromPosition(_lat: number, _lng: number) {
  return Promise.resolve(null);
}

export { getInitialUserPosition, getCityNameFromPosition };
