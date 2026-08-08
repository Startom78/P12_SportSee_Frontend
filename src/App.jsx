import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Greetings from './components/greetings/Greetings'
import DailyActivity from './components/dailyactivity/Dailyactivity'
import Nutriments from './components/nutriments/Nutriments'
import AverageSessions from './components/averagesessions/Averagesessions'
import Hexagongraphic from './components/hexagondiagram/Hexagongraphic'
import Score from './components/score/Score'
import { useCurrentUserData } from './services/Api.jsx'

function App() {
  const { isReady, userMainData, userActivity, userAverageSessions, userPerformance } = useCurrentUserData();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Header />
      <div className='main-all'>
        <Sidebar />
      <main>
        <Greetings userMainData={userMainData} />
        <div className='main-blocks'>
            <div className='activities-blocks'>
             <DailyActivity userActivity={userActivity} />
             <div className='graphics-blocks'>
              <AverageSessions userAverageSessions={userAverageSessions} />
              <Hexagongraphic userPerformance={userPerformance} />
              <Score userMainData={userMainData} />
             </div>
            </div>
            <aside className='nutriments-blocks'>
              <Nutriments userMainData={userMainData} />
            </aside>

        </div>
      </main>

      </div>
    </>
  )
}

export default App
