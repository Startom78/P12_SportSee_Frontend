import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import mockedData from '../../services/mockeddata.jsx';
import './averagesessions.css';

const { USER_AVERAGE_SESSIONS } = mockedData;
const userId = 12;
const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="sessionsTooltip">
                <p>{`${payload[0].value} min`}</p>
            </div>
        );
    }
    return null;
}

function CustomCursor({ points, top, left, width, height }) {
    if (!points || !points.length) return null;
    const { x } = points[0];

    return (
        <Rectangle
            x={x}
            y={top}
            width={left + width - x}
            height={height}
            fill="url(#sessionsCursorGradient)"
        />
    );
}

function AverageSessions(){
    const userSessions = USER_AVERAGE_SESSIONS.find((user) => user.userId === userId);
    const data = userSessions.sessions.map((session) => ({
        day: dayLabels[session.day - 1],
        sessionLength: session.sessionLength
    }));

    return(
        <>
            <div className="averageSessionsCss">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="sessionsCursorGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.15)" />
                                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                            padding={{ left: 10, right: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
                        <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="#FFFFFF"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#FFFFFF' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default AverageSessions;
