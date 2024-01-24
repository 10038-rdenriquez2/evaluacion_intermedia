// AdoptionList.jsx
import PropTypes from 'prop-types';

function AdoptionList({ adoptions, dogs, adopters }) {
    if (!adoptions.length || !dogs.length || !adopters.length) {
        return <p>Cargando...</p>;
    }

    const findNameById = (array, id) => array.find(item => item.id.toString() === id)?.name || "No encontrado";

    return (
        <ul>
            {adoptions.map((adoption) => (
                <div key={adoption.id}>
                    <p>🙍‍♂️ Estudiante: {findNameById(dogs, adoption.dogId)}, 👤 Profesor: {findNameById(adopters, adoption.adopterId)}</p>
                    <p>Pregunta: ¿Cuál de las siguientes opciones NO es un lenguaje de programación?</p>
                    <p>Respuesta: {adoption.respuesta}</p>
                </div>
            ))}
        </ul>
    );
}

AdoptionList.propTypes = {
    adoptions: PropTypes.array.isRequired,
    dogs: PropTypes.array.isRequired,
    adopters: PropTypes.array.isRequired,
};

export default AdoptionList;
