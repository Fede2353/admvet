import React, {useState, useEffect } from 'react';
import { getPets, deletePet} from '../services/index.js';

const ListofPets = () => {

    const [mascotas, setMascotas] = useState([]);

    async function loadPets() {
        const response = await getPets()

        if (response.status === 200) {
            setMascotas(response.data.mascotas)
        }
    }

    useEffect(() => {       
          loadPets(); 
    }, [])

    const borrarMascota = async (id) => {
        await deletePet(id);
        loadPets();
    }

    /*const actualizarMascota = async (mascota) => {
        await updatePet(mascota)
        loadPets()
    }*/

    return (
        <div className="container">
            <h2>Administra tus mascotas</h2>
            {mascotas.length ===0 && 'No hay mascotas ingresadas'}
                {
                mascotas.map((mascota) => (    
                <div className="cita" key={mascota._id}> 
                    <p>Nombre: <span>{mascota.nombre}</span> </p>
                    <p>Tipo: <span>{mascota.tipo}</span> </p>
                    <p>Fecha de nacimiento: <span>{mascota.fechaDeNacimiento}</span> </p>
                    <p>Peso: <span>{mascota.peso}</span> </p>
                    <p>Vacunas anuales: <span>{mascota.vacunas}</span> </p>
                    <p>Nombre Dueño: <span>{mascota.nombreDueno}</span> </p>
                    <p>Ci Dueño: <span>{mascota.ciDueno}</span> </p>
                    <p>Teléfono Dueño: <span>{mascota.telefonoDueno}</span> </p>

                    <button className="button eliminar"
                        onClick={() => borrarMascota(mascota._id)}
                    >Borrar</button>
                    
                 </div>
                ))
                }   
        </div>
    )
}

export default ListofPets
