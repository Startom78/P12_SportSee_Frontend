import './dailyactivity.css'

function DailyActivity(){
    return(
        <>
            <div className="activityBackground">
                <div>
                    <p> Activité quotidienne </p>
                </div>

                <div className='indicators'>
                    <div className='indicator'>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#282D30"/>
                        </svg>

                        <p> Poids (kg) </p>
                    </div>

                    <div className='indicators'>
                        <div className='indicator'>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#E60000"/>
                            </svg>

                            <p> Calories brulées (kg) </p>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DailyActivity;