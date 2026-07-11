import { useParams } from 'react-router-dom'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Greetings from './components/greetings/Greetings'
import DailyActivity from './components/dailyactivity/Dailyactivity'
import Nutriments from './components/nutriments/Nutriments'
import AverageSessions from './components/averagesessions/Averagesessions'
import Hexagongraphic from './components/hexagondiagram/Hexagongraphic'
import Score from './components/score/Score'

function App() {
  const { userId } = useParams();
  const currentUserId = Number(userId);

  return (
    <>
      <Header />
      <div className='main-all'>
        <Sidebar />
      <main>
        <Greetings userId={currentUserId} />
        <div className='main-blocks'>
            <div className='activities-blocks'>
             <DailyActivity userId={currentUserId} />
             <div className='graphics-blocks'>
              <AverageSessions userId={currentUserId} />
              <Hexagongraphic userId={currentUserId} />
              <Score userId={currentUserId} />
             </div>
            </div>
            <aside className='nutriments-blocks'>
              <Nutriments userId={currentUserId} />
            </aside>

        </div>
      </main>

      </div>
    </>
  )
}

export default App
