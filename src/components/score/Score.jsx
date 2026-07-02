import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import mockedData from '../../services/mockeddata.jsx';
import './score.css';

const { USER_MAIN_DATA } = mockedData;
const userId = 12;

function Score(){
    const userMainData = USER_MAIN_DATA.find((user) => user.id === userId);
    const { todayScore } = userMainData;
    const data = [{ value: todayScore }];

    return(
        <>
            <div className="score">
                <h3 className="scoreTitle">Score</h3>

                <div className="scoreChartContainer">
                    <div className="scoreCircleBackground" />

                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="75%"
                            outerRadius="85%"
                            barSize={8}
                            data={data}
                            startAngle={90}
                            endAngle={90 + 360 * todayScore}
                        >
                            <RadialBar
                                dataKey="value"
                                cornerRadius={10}
                                fill="#E60000"
                                background={{ fill: 'transparent' }}
                                max={1}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>

                    <div className="scoreCenter">
                        <p className="scoreValue">{`${Math.round(todayScore * 100)}%`}</p>
                        <p className="scoreLabel">de votre<br />objectif</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Score;
