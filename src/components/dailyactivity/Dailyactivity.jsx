import './dailyactivity.css'

function DailyActivity(){
    return(
        <>
            <div className="activityBackground">
                <div>
                    <p> Activité quotidienne </p>
                </div>

                <div>
                    <i className="fa-solid fa-circle"></i>
                    <p> Poids (kg)" </p>
                </div>

                <div>
                    <i className="fa-solid fa-circle dot"></i>
                    <p> Calories brulées (kg) </p>
                </div>

            </div>
        </>
    )
}

export default DailyActivity;