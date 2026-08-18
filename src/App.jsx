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
  const { isReady, error, greetings, dailyActivity, averageSessions, performance, score, nutriments } = useCurrentUserData();

  if (error) {
    return <p>{error}</p>;
  }

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Header />
      <div className='main-all'>
        <Sidebar />
      <main>
        <Greetings firstName={greetings.firstName} />
        <div className='main-blocks'>
            <div className='activities-blocks'>
             <DailyActivity data={dailyActivity} />
             <div className='graphics-blocks'>
              <AverageSessions data={averageSessions} />
              <Hexagongraphic data={performance} />
              <Score todayScore={score.todayScore} />
             </div>
            </div>
            <aside className='nutriments-blocks'>
              <Nutriments data={nutriments} />
            </aside>

        </div>
      </main>

      </div>
    </>
  )
}

export default App
