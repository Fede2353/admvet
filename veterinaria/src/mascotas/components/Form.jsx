import React, {Fragment, useState} from 'react';

const Form = ({agregarMascota}) => {

    // Crear State de Mascota
    const [mascota, setMascota] = useState({
        nombre: '',
        tipo: '',
        fechaDeNacimiento: '',
        peso: '',
        vacunas: '',
        nombreDueno: '',
        ciDueno: '',
        telefonoDueno: ''
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setMascota({
            ...mascota,
            [e.target.name]: e.target.value 
        })
    }

    // Extraer los valores del state
    const {nombre, tipo, fechaDeNacimiento, peso, vacunas, nombreDueno, ciDueno, telefonoDueno} = mascota;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar
        if(nombre.trim() === '' || tipo.trim() === '' || fechaDeNacimiento.trim() === '' || peso.trim() === '' ||
        vacunas.trim() === '' || nombreDueno.trim() === '' || ciDueno.trim() === '' || telefonoDueno.trim() === ''){
            setError(true);
            return;
        }

         // Agregar la nueva mascota
        agregarMascota(mascota);

        setMascota({
            nombre: '',
            tipo: '',
            fechaDeNacimiento: '',
            peso: '',
            vacunas: '',
            nombreDueno: '',
            ciDueno: '',
            telefonoDueno: ''
        });    
        
        setError(false);
    }

    return ( 
        <Fragment>
            <h2>Ingresar Mascota</h2>
            Versión test, inserta sólo datos ficticios/test version, insert only fake data
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
             : null}

            <form
                onSubmit={handleSubmit}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="nombre"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={nombre}
                />
                <label>Tipo</label>
                <input 
                    type="text"
                    name="tipo"
                    className="u-full-width"
                    placeholder="Tipo"
                    onChange={handleChange}
                    value={tipo}
                />
                <label>Fecha De Nacimiento</label>
                <input 
                    type="date"
                    name="fechaDeNacimiento"
                    className="u-full-width"
                    placeholder="Fecha de nacimiento de la mascota"
                    onChange={handleChange}
                    value={fechaDeNacimiento}
                />
                <label>Peso</label>
                <input 
                    type="text"
                    name="peso"
                    className="u-full-width"
                    placeholder="Peso"
                    onChange={handleChange}
                    value={peso}
                />
                <label>Feha de vacunas</label>
                <input 
                    type="date"
                    name="vacunas"
                    className="u-full-width"
                    placeholder="Vacunas anuales?"
                    onChange={handleChange}
                    value={vacunas}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="nombreDueno"
                    className="u-full-width"
                    placeholder="Nombre  Dueño de la mascota"
                    onChange={handleChange}
                    value={nombreDueno}
                />
                <label>Ci Dueño</label>
                <input 
                    type="text"
                    name="ciDueno"
                    className="u-full-width"
                    placeholder="Ci del dueño de la mascota"
                    onChange={handleChange}
                    value={ciDueno}
                />
                <label>Teléfono Dueño</label>
                <input 
                    type="text"
                    name="telefonoDueno"
                    className="u-full-width"
                    placeholder="Teléfono del dueño"
                    onChange={handleChange}
                    value={telefonoDueno}
                />
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Mascota</button>
            </form>
        </Fragment>
    );
}

export default Form;