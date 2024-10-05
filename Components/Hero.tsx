import React from 'react'
import Image from 'next/image';

const Home = () => {
  return (
    <div> 
      <Image 
      src="./assets/livroheader.svg"
      width={40}
      height={45}
      alt='Livro'
      />
      <div className="flex font-bold p-2 text-black ">
        Bem vindo
      </div>
  </div>
  )
}

export default Home;