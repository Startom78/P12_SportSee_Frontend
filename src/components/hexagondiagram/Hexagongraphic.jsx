import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import './hexagon.css';

const hexagonTitles = {
    cardio: 'Cardio',
    energy: 'Energie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité'
};

function CustomTick({ payload, x, y, textAnchor }) {
    return (
        <text x={x} y={y} textAnchor={textAnchor} fill="#FFFFFF" fontSize={12}>
            {payload.value}
        </text>
    );
}

function Hexagongraphic({ userPerformance }){
    const data = [...userPerformance.data]
        .reverse()
        .map(({ kind, value }) => ({
            subject: hexagonTitles[userPerformance.kind[kind]],
            value
        }));

    return(
        <>
            <div className="hexagon">
                <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 300, height: 300 }}>
                    <RadarChart data={data} outerRadius="65%">
                        <PolarGrid stroke="#FFFFFF" />
                        <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
                        <Radar
                            dataKey="value"
                            stroke="#FF0101"
                            fill="#FF0101"
                            fillOpacity={0.7}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Hexagongraphic;