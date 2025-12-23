
import Header from './components/Header'
import SearchWeather from './components/SearchWeather'
function App() {

  return (
    <>
      <Header />
      <main>
        <h1 className='text-4xl font-bold text-white'>How's the sky looking today?</h1>
        <div className='flex items-center justify-center my-8'><SearchWeather /></div>
      </main>
    </>
  )
}

export default App
