import React, { Fragment, useEffect, useState} from 'react';
import Form from './Form';
import { getLastPets, savePet, deletePet} from '../services/index.js';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [mascotas, setMascotas] = useState([]);

    async function loadLastPets() {
        const response = await getLastPets()

        if (response.status === 200) {
            setMascotas(response.data.mascotas)
        }
    }

    useEffect(() => {
        loadLastPets()
    }, [])

    //función que agregue la nueva mascota
    const agregarMascota = async (mascota) => {
        await savePet(mascota)
        loadLastPets()
    }

    const borrarMascota = async (id) => {
        await deletePet(id);
        loadLastPets();
    }

    /*const actualizarMascota = async (mascota) => {
        await updatePet(mascota)
        loadLastPets()
    }*/

    return (
        <Fragment>
            <h1>Administrador Vet</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Form agregarMascota={agregarMascota} />
                    </div>
                    <div className="one-half column">
                        <h2>Administra tus mascotas</h2>
                        {mascotas.length === 0 && 'No hay mascotas ingresadas'}
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
                        {mascotas.length !== 0 && 
                            <NavLink to="/mascotas" className="button navegar">Ver todas las mascotas</NavLink>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
