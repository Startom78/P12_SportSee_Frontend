import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import './score.css';

function Score({ userMainData }){
    const todayScore = userMainData.todayScore;
    const data = [{ value: todayScore }];

    return(
        <>
            <div className="score">
                <h3 className="scoreTitle">Score</h3>

                <div className="scoreChartContainer">
                    <div className="scoreCircleBackground" />

                    <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 300, height: 300 }}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="75%"
                            barSize={8}
                            data={data}
                            startAngle={90}
                            endAngle={90 - 360 * todayScore}
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
