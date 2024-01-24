import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CuestionarioForm({ dogs, adopters, onSubmitCuestionario }) {
    const [selectedDog, setSelectedDog] = useState('');
    const [selectedAdopter, setSelectedAdopter] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDog && selectedAdopter && respuesta) {
            onSubmitCuestionario(selectedDog, selectedAdopter, respuesta);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
           <select value={selectedDog} onChange={(e) => setSelectedDog(e.target.value)}>
                <option value="">Selecciona un Estudiante 🙍‍♂️</option>
                {dogs.map((dog) => (
                    <option key={dog.id} value={dog.id}>
                        🙍‍♂️ {dog.name}
                    </option>
                ))}
            </select>

            <select value={selectedAdopter} onChange={(e) => setSelectedAdopter(e.target.value)}>
                <option value="">Selecciona un Profesor 👤</option>
                {adopters.map((adopter) => (
                    <option key={adopter.id} value={adopter.id}>
                        👤 {adopter.name}
                    </option>
                ))}
            </select>

            <p>¿Cuál de las siguientes opciones NO es un lenguaje de programación?</p>
            <label>
                <input
                    type="radio"
                    value="Python"
                    checked={respuesta === "Python"}
                    onChange={(e) => setRespuesta(e.target.value)}
                />
                Python
            </label>
            <label>
                <input
                    type="radio"
                    value="HTML"
                    checked={respuesta === "HTML"}
                    onChange={(e) => setRespuesta(e.target.value)}
                />
                HTML
            </label>
            <label>
                <input
                    type="radio"
                    value="Java"
                    checked={respuesta === "Java"}
                    onChange={(e) => setRespuesta(e.target.value)}
                />
                Java
            </label>
            <label>
                <input
                    type="radio"
                    value="C++"
                    checked={respuesta === "C++"}
                    onChange={(e) => setRespuesta(e.target.value)}
                />
                C++
            </label>

            <button type="submit">Enviar Cuestionario</button>
        </form>
    );
}

CuestionarioForm.propTypes = {
    dogs: PropTypes.array.isRequired,
    adopters: PropTypes.array.isRequired,
    onSubmitCuestionario: PropTypes.func.isRequired,
};

export default CuestionarioForm;
