import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockedData from '../../services/mockeddata.jsx';
import './dailyactivity.css';

const { USER_ACTIVITY } = mockedData;
const userId = 12;

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        const kilogram = payload.find((entry) => entry.dataKey === 'kilogram')?.value;
        const calories = payload.find((entry) => entry.dataKey === 'calories')?.value;

        return (
            <div className="customTooltip">
                <p>{`${kilogram}kg`}</p>
                <p>{`${calories}Kcal`}</p>
            </div>
        );
    }
    return null;
}

function DailyActivity(){
    const userActivity = USER_ACTIVITY.find((user) => user.userId === userId);
    const data = userActivity.sessions.map((session, index) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories
    }));

    return(
        <>
            <div className="activityBackground">
                <div className="activityHeader">
                    <h3>Activité quotidienne</h3>

                    <div className='indicators'>
                        <div className='indicator'>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#282D30"/>
                            </svg>
                            <p> Poids (kg) </p>
                        </div>

                        <div className='indicator'>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#E60000"/>
                            </svg>
                            <p> Calories brulées (kCal) </p>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={200} className="chartContainer">
                    <BarChart data={data} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} />
                        <YAxis
                            yAxisId="kilogram"
                            orientation="right"
                            domain={['dataMin - 3', 'dataMax + 3']}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis yAxisId="calories" domain={[0, 'dataMax + 100']} hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#C4C4C4' }} />
                        <Bar yAxisId="kilogram" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} barSize={7} />
                        <Bar yAxisId="calories" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} barSize={7} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default DailyActivity;
