import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Greetings from './components/greetings/Greetings'
import DailyActivity from './components/dailyactivity/Dailyactivity'
import Nutriments from './components/nutriments/Nutriments'
import AverageSessions from './components/averagesessions/Averagesessions'
import Hexagongraphic from './components/hexagondiagram/Hexagongraphic'
import Score from './components/score/Score'
import { getUserById, getUserActivity, getUserAverageSessions, getUserPerformance } from './services/Api.jsx'

function App() {
  const { userId } = useParams();
  const currentUserId = Number(userId);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    Promise.all([
      getUserById(currentUserId),
      getUserActivity(currentUserId),
      getUserAverageSessions(currentUserId),
      getUserPerformance(currentUserId)
    ]).then(([userMainData, userActivity, userAverageSessions, userPerformance]) => {
      if (isCancelled) return;
      setUserData({ userMainData, userActivity, userAverageSessions, userPerformance });
      setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [currentUserId]);

  if (isLoading) {
    return null;
  }

  const { userMainData, userActivity, userAverageSessions, userPerformance } = userData;

  if (!userMainData || !userActivity || !userAverageSessions || !userPerformance) {
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
