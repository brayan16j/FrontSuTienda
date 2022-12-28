import React from 'react'; 

const Footer = () => {
    return <footer className='bg-gray-800 text-white'>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7 md'>
            <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
             md: w-2/5'
             >
                <span className='text-teal-400'>Nombre: </span> Brayan Granada</h1>
                <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
             md: w-2/5'
             >
                <span className='text-teal-400'>Correo: </span> brayan16j@gmail.com</h1>
                <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
             md: w-2/5'
             >
                <span className='text-teal-400'>GitHub: </span>github.com/brayan16j  </h1>

                <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
             md: w-2/5'
             >
                <span className='text-teal-400'> Celular: </span>3118850777</h1>
        </div>
    </footer>
};

export default Footer;