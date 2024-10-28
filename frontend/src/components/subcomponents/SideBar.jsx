import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Home,
  Truck,
  BarChart,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModule, setOpenModule] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModule = (module) => setOpenModule(openModule === module ? null : module);
  const navigate = useNavigate();
const HandleExit=()=>{

  localStorage.removeItem('token');
  navigate("/")
}
  const menuItems = [
    {
      title: "Inicio",
      icon: Home,
      link: "/home",
      module: "home",
    },
    {
      title: "Usuarios",
      icon: Users,
      module: "usuarios",
      submenu: [
        { title: "Administrar usuarios", link: "/usuario" },
        {
          title: "Recuperación de contraseña",
          link: "#Cambiar-contrasena",
        },
      ],
    },
    {
      title: "Solicitudes de Domicilio",
      icon: FileText,
      module: "solicitudes",
      submenu: [
        {
          title: "Creación de solicitudes",
          link: "#creacion-solicitudes",
        },
        {
          title: "Listar Solicitudes",
          link: "#creacion-solicitudes",
        },
              
      ],
    },
    {
      title: "Gestión de Domiciliarios",
      icon: Truck,
      module: "domiciliarios",
      submenu: [
        {
          title: "Gestión de disponibilidad",
          link: "#gestion-disponibilidad",
         
        },
        {
          title: "Reporte de novedades",
          link: "/novedades",
        },
        {
          title: "Reportar novedades e incidencias",
          link: "/reportarnovedad",
        },
        {
          title: "Listar Solicitud - Domiciliario",
          link: "#creacion-solicitudes",
        },
       
      ],
    },
    {
      title: "Reportes",
      icon: BarChart,
      module: "reportes",
      submenu: [
        {
          title: "Reporte de novedades",
          link: "/NovedadesReporte",
        },
        {
          title: "Reporte de incidencias",
          link: "/IncidenciasReporte",
        },
      ],
    },
    {
      title: "Salir",
      icon: LogOut,
      module: "configuracion",
      onClick:HandleExit,
    },
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = openModule === item.module;

    return (
      <div className="border-b border-gray-700 last:border-0">
        <Link
          to={item.link}
          onClick={(e) => {
            e.preventDefault();
            toggleModule(item.module);
            if (item.onClick) item.onClick();
          }}
          className="flex justify-between items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3"onClick={item.onClick} >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {item.submenu && (
            isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </Link>
    
        {isActive && item.submenu && (
          <div className="bg-gray-900 overflow-hidden transition-all duration-200">
            {item.submenu.map((submenuItem, index) => (
              <div key={index} className="px-4 py-2">
                <Link
                  to={submenuItem.link}
                  className="text-gray-400 hover:text-white text-sm block py-1"
                >
                  {submenuItem.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2  rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>


      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden
          ${isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'}`}
      />


      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out 
          overflow-y-auto lg:translate-x-0 lg:static lg:h-screen z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="sticky top-0 bg-gray-800 z-10 p-4 border-b border-gray-700">
          <h1 className="text-white text-xl font-bold text-center ml-8">Orders</h1>
        </div>

        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;