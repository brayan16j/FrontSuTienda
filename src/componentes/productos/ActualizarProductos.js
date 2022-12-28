import React, { useEffect, useState }  from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

 const  ActualizarProductos= () => {
    
  const navigate = useNavigate(); 

  const {idProducto} = useParams();
    console.log(idProducto);
   
    const [producto, setProducto] = useState({
      nombre:'',
      descripcion:'',
      stock:'',
      precio:'',
      imagen:'',
      categoriaId:''
      })
      console.log(idProducto);
      
      const cargarProducto = async () =>{
        const response = await crud.GET(`/api/producto/productos/${idProducto}`);
        console.log(response);
        //Llenando las cajas
        setProducto(response.producto);
      }
      console.log(producto);
      const {nombre, descripcion, stock, precio, imagen} = producto;
      
      useEffect(() =>{ 
        cargarProducto();
      },[]);

      const onChange = (e) =>{
        setProducto({
          ...producto,
          [e.target.name]: e.target.value
        })
      }

      
      const actualizarProducto = async () =>{
        const data = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: producto.stock,
          precio: producto.precio,
          imagen: producto.imagen
        }
       
          const response = await crud.PUT(`/api/producto/${idProducto}`, data); // falta id
          console.log(response);
          const mensaje1 = "El Producto se actualizo correctamente";
          swal({
            title:'Información',
            text: mensaje1,
            icon: 'success',
            buttons:{
              confirm:{
                text: 'OK',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });
          navigate("/admin");
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarProducto();
      }

  return (
    
    <>
    <Header/>
    <div className='md:flex md:min-h-screen'>
      <Sidebar/>
      <main className='flex-1'>
      <div className='mt-10 flex justify-center'>
      <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
            Actualizar Producto
          </h1>
      </div>
        <div className='mt-10 flex justify-center' >
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
            >
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={nombre}
                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder='descripcion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={descripcion}
                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder='stock'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={stock}
                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder='precio'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={precio}
                  onChange={onChange}
                />

              <label className='uppercase text-gray-600 block text-xl font-bold' >Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={imagen}
                  onChange={onChange}
                />
              </div>
        
                <input
                  type="submit"
                  value="Actualizar Producto"
                  className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300 transition-colors"
                />
              
            </form>
        </div>          
      </main>
    </div> 
    </>
    );

}
export default ActualizarProductos;