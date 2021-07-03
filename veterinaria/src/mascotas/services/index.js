import axios from 'axios'

const baseUrl =  'https://admvet.herokuapp.com/api/mascota' // if local: process.env.REACT_APP_BASE_URL 

export async function getLastPets () {
  try {
    const response = await axios({
      url: `${baseUrl}/mascotas/last`,
      method: 'GET'
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPets () {
  try {
    const response = await axios({
      url: `${baseUrl}/mascotas`,
      method: 'GET'
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function savePet (petData) {
  try {
   
    const response = await axios({
      url: `${baseUrl}/guardar-mascota`,
      method: 'POST',
      data: petData,
    })

    return response
  } catch (e) {
    console.log(e)
  }
}


export async function updatePet (updatedpet) {
  console.log(updatedpet)
  try {
    
    const response = await axios({
      url: `${baseUrl}/mascota` + updatedpet._id,
      method: 'PUT',
      data: updatedpet,
    })

    return response
  } catch (e) {
    console.log(e)
  }
}



export async function deletePet (id) {
  try {
    const response = await axios.delete(`${baseUrl}/mascota/` + id)
    return response
  } catch (e) {
    console.log(e)
  }
}


  