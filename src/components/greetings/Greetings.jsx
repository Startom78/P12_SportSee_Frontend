import { getUserById } from '../../services/UserCalls.jsx';
import './greetings.css'

function Greetings({ userId }){
    const userMainData = getUserById(userId);
    const { firstName } = userMainData.userInfos;

    return (
        <>
            <div className="greetings">

            <div>
                <h1> Bonjour {firstName} </h1>
            </div>
            <p> Félicitations ! Vous avez explosé vos objectifs hier 👏 </p>

            </div>
        </>
    )
}

export default Greetings;