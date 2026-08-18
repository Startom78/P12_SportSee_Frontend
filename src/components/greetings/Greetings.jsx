import './greetings.css'

function Greetings({ firstName }){
    return (
        <>
            <div className="greetings">

            <div>
                <h1> Bonjour <span className="greetings-firstname">{firstName}</span> </h1>
            </div>
            <p> Félicitations ! Vous avez explosé vos objectifs hier 👏 </p>

            </div>
        </>
    )
}

export default Greetings;