import Context from '../contexts/Context'
import { useContext } from 'react'

const Home = () => {
  const { developer } = useContext(Context)

  return (
    <div className='py-5'>
      <h1>
        Bienvenido a <span className='fw-bold'>Soft Jobs</span>
      </h1>
      <h4>
        El lugar donde todos los Juniors Developer <br /> podrán obtener
        experiencia
      </h4>
      
      {developer && (
        <div className="mt-4">
          <p>¡Hola de nuevo! Ya has iniciado sesión como {developer.email}</p>
        </div>
      )}
    </div>
  )
}

export default Home
