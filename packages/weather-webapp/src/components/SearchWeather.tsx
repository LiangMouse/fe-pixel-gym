import { Button, Input } from "./ui"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import useCityGeoposition from "../hook/useCityGeoposition"

const SearchWeather = () => {
  const [cityInput, setCityInput] = useState('')
  const [debouncedCity, setDebouncedCity] = useState('')
  const cityList = useCityGeoposition(debouncedCity)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(cityInput.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [cityInput])

  useEffect(() => {
    console.log(cityList)
  }, [cityList])

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300" />
        <Input
          placeholder="Search for a place..."
          className="w-64 h-10 pl-8 text-white placeholder:text-neutral-300 bg-neutral-800 border-none rounded-full"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
      </div>
      <Button onClick={() => { }} className="bg-blue-700 mx-2">Search</Button>
    </div>
  )
}
export default SearchWeather
