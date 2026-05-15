import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Greetings from './components/greetings/Greetings'
import DailyActivity from './components/dailyactivity/Dailyactivity'
import Nutriments from './components/nutriments/Nutriments'
import AverageSessions from './components/averagesessions/Averagesessions'
import Hexagongraphic from './components/hexagondiagram/Hexagongraphic'
import Score from './components/score/Score'


function App() {
  API;
  return (
    <>
      <Header />
      <div className='main-all'>
        <Sidebar />
      <main>
        <Greetings />
        <div className='main-blocks'>
            <div>
             <DailyActivity />
            </div> 

            <aside>
              <Nutriments />
            </aside>
        </div>
      </main>

      </div>
    </>
  )
}

export default App
