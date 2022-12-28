import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert'; 

const Admin = () => {
  
  const navigate = useNavigate(); 

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect

  const [categoria, setCategorias] = useState([]);

   const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categoria`);
       console.log(response);
       setCategorias(response.categoria);
   }

   useEffect(() => {
       cargarCategorias();
   }, [])
   
   const borrarCategoria = async (idCategoria) => {
    swal({
      title: " Estas Seguro de eliminar la categoria?",
      text: "Una vez eliminada no se podra recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          const response = crud.DELETE(`/api/categoria/${idCategoria}`);
          const mensaje = response;
          if(response){
            swal("Tu Categoria a sido borrada correctamente ", {
              icon: "success",
            });
          }
         cargarCategorias();         
      } else {
        swal("Se cancelo la accion");
      }
    });
   }

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'flex-1 m-10' >
          
   <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-500 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10 mt-px-20 ">
    Listado de categorias
    </h1>
    <table className="table table-bordered border-4 mx-10 font-sans drop-shadow-lg">
        <thead className='bg-white border-4'>
            <tr>
            <th style={{ width: '15%' }}>Imagen</th>
              <th style={{ width: '60%' }}>Nombre</th>
              <th style={{ width: '30%' }}>Opciones</th>
            </tr>
        </thead>
                                
                               
        <tbody className="bg-white">
            {
                categoria.map(
                    item =>
                        <tr key={item._id}>        
                            <td><img src={item.imagen}/></td>
                            <td className='text-center'>{item.nombre}</td>
                            <td>
                            
                                <Link className='text-blue-700 font-bold' 
                                to={`/home-productos/${item._id}`}
                                > Crear producto </Link>&nbsp;&nbsp;
                                <Link className='font-bold'
                                to={`/actualizar-categoria/${item._id}`}
                                > Editar </Link>&nbsp;&nbsp;
                                <button className='text-red-700 font-bold'
                                    onClick={()=>borrarCategoria(item._id)}
                                > Eliminar </button>
                            </td>
                        </tr>
                       )
                    }             
        </tbody>
    </table>
</main>
</div>
        
      </>
    );
}

export default Admin;