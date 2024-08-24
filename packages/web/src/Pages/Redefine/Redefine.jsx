import Logintitle from '../../Components/Logintitle/Logintitle';
import './Redefine.css'
import { useState } from 'react';



const Redefine = () => {
    const [username, setUsername] = useState("");;

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username)

        console.log("Envio");
    }

  return (
  <main>
    <div className='redefinePage'>
      <Logintitle />
      <div className='formRedefine'>
        <div className='containerRedefine'>
          <form onSubmit={handleSubmit}>
          <h2>REDEFINIÇÃO DE SENHA</h2>
          <div className='input-fieldRedefine'>
            <input type='email' placeholder='EMAIL' onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          <button>REDEFINIR</button>
          </form>
        </div>  
      </div>
    </div>
  </main>
  )
}

export default Redefine
