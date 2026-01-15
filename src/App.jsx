import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Greetings from './components/greetings/Greetings'
import DailyActivity from './components/dailyactivity/Dailyactivity'

function App() {

  return (
    <>
      <Header />
      <div className='main-all'>
        <Sidebar />
      <main>
        <div>
        <Greetings />
        <DailyActivity />
        </div>
      </main>

      </div>
    </>
  )
}

export default App
