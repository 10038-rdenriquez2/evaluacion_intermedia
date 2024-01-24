// App.jsxcdd
import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';
import AdoptionList from './components/AdoptionList';
import AvailableList from './components/AvailableList';
import AddDogForm from './components/AddDogForm';
import AddAdopterForm from './components/AddAdopterForm';
import CuestionarioForm from './components/CuestionarioForm';
import './app.css';


const App = () => {
  const [dogs, setDogs] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [showCuestionarioForm, setShowCuestionarioForm] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch('http://localhost:3001/dogs');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);

        const adoptersResponse = await fetch('http://localhost:3001/adopters');
        const adoptersData = await adoptersResponse.json();
        setAdopters(adoptersData);

        const adoptionsResponse = await fetch('http://localhost:3001/adoptions');
        const adoptionsData = await adoptionsResponse.json();
        console.log('Adopciones:', adoptionsData);
        setAdoptions(adoptionsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (dogId, adopterId) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
        }),
      });

      if (response.ok) {
        const newAdoption = await response.json();
        setAdoptions((prevAdoptions) => [...prevAdoptions, newAdoption]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Cuestionario realizado con éxito!\nID: ${newAdoption.id}\nEstudiante: ${newAdoption.dogId}\nProfesor: ${newAdoption.adopterId}`);
      } else {
        throw new Error('Error al enviar la solicitud del cuestionario.');
      }
    } catch (error) {
      console.error('Error en la solicitud del cuestionario:', error.message);
      throw error;
    }
  };

  const handleCuestionarioSubmit = async (dogId, adopterId, respuesta) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', { // Asegúrate que este es el endpoint correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
          respuesta, // Asegurándonos de enviar la respuesta
        }),
      });
  
      if (response.ok) {
        const newCuestionario = await response.json();
        
        // Actualiza el estado para incluir la nueva adopción con la respuesta
        setAdoptions(prevAdoptions => [...prevAdoptions, { ...newCuestionario, respuesta }]);
  
        alert(`¡Cuestionario enviado con éxito!\nEstudiante: ${newCuestionario.dogId}\nProfesor: ${newCuestionario.adopterId}\nRespuesta: ${respuesta}`);
      } else {
        throw new Error('Error al enviar el cuestionario.');
      }
    } catch (error) {
      console.error('Error en el envío del cuestionario:', error.message);
      alert('Error al enviar el cuestionario');
    }
  };
  
  


  const handleDogSubmit = (dogName) => {
    setDogs([...dogs, { id: dogs.length + 1, name: dogName }]);
  };

  const handleAdopterSubmit = (adopterName) => {
    setAdopters([...adopters, { id: adopters.length + 1, name: adopterName }]);
  };

  return (
    <div className="App">
      <header>
        <h1 className="university-title">Universidad de las Fuerzas Armadas "ESPE"</h1>
        <div className="names-section">
          <h2>Nombres:</h2>
          <ul>
            <li>Cristian Idrobo</li>
            <li>Jonathan Toapanta</li>
            <li>Daniel Enriquez</li>
          </ul>
        </div>
      </header>
  
      <section>
        <h3>Lista de Estudiantes Calificados</h3>
        <AdoptionList adoptions={adoptions} dogs={dogs} adopters={adopters} />
      </section>
  
      <section>
        <h3>Estudiantes y Profesores</h3>
        <AvailableList dogs={dogs} adopters={adopters} />
      </section>
  
      <section>
        <h1>Nuevo Cuestionario</h1>
        {showCuestionarioForm ? (
          <CuestionarioForm
            dogs={dogs}
            adopters={adopters}
            onSubmitCuestionario={handleCuestionarioSubmit}
          />
        ) : (
          <AdoptionForm dogs={dogs} adopters={adopters} onAdoptionSubmit={handleAdoptionSubmit} />
        )}
        <button onClick={() => setShowCuestionarioForm(!showCuestionarioForm)}>
          {showCuestionarioForm ? 'Volver' : 'Ir al Cuestionario'}
        </button>
      </section>
    </div>
  );
};

export default App;
