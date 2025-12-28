import { useState, useEffect } from "react";

// 网络请求获取到的城市列表类型
interface CityPosition {
  place_id: number; // 用于唯一id
  osm_type: string;
  osm_id: number;
  lat: string; // 纬度
  lon: string; // 经度
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: { // 详细地址列表
    city: string;
    state: string;
    ISO3166_2_lvl4: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}
// 作为初期项目，默认仅中文
const ENDPOINT = 'https://nominatim.openstreetmap.org/search?q={city}&format=json&accept-language=zh-CN&limit=5&addressdetails=1&countrycodes=cn';

function useCityGeoposition(city: string) {
  // 返回城市列表
  const [cityList, setCityList] = useState<CityPosition[]>([])

  useEffect(() => {
    if (!city) {
      setCityList([])
      return
    }
    const controller = new AbortController()
    function fetchCityList() {
      fetch(ENDPOINT.replace('{city}', city), { signal: controller.signal })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setCityList(data)
        })
        .catch((error) => {
          if (error?.name !== "AbortError") {
            console.error(error)
          }
        })
    }
    fetchCityList()
    return () => {
      controller.abort()
    }
  }, [city])
  return cityList
}

export default useCityGeoposition
