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
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  const { authData } = useContext(AuthContext);
  const userType = authData?.TipoUsuario?.toLowerCase();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModule = (module) => setOpenModule(openModule === module ? null : module);


  const HandleExit = () => {
    localStorage.removeItem('token');

  }


  const hasAccess = (roles) => {
    if (!roles || roles.length === 0) return false;
    return roles.includes(userType);
  };


  const filterSubmenuItems = (submenu) => {
    if (!submenu) return [];
    return submenu.filter(item => hasAccess(item.roles));
  };

  const menuItems = [
    {
      title: "Inicio",
      icon: Home,
      link: "/home",
      module: "home",
      roles: ["administrador", "domiciliario", "particular", "negocio"],
    },
    {
      title: "Usuarios",
      icon: Users,
      module: "usuarios",
      roles: ["administrador", "domiciliario", "particular", "negocio"],
      submenu: [
        {
          title: "Administrar usuarios",
          link: "/usuario",
          roles: ["administrador"],
        },
        {
          title: "Perfil del usuario",
          link: "/perfil",
          roles: ["administrador", "domiciliario", "particular", "negocio"]
        },
      ],
    },
    {
      title: "Solicitudes",
      icon: FileText,
      module: "solicitudes",
      link: "/creacion-solicitudes",
      roles: ["administrador", "domiciliario", "particular", "negocio"],
    },
    {
      title: "Gestión de Domicilios",
      icon: Truck,
      module: "domiciliarios",
      roles: ["administrador", "domiciliario", "particular", "negocio"],
      submenu: [
        {
          title: "Disponibilidad de domiciliarios",
          link: "/disponibilidad-domiciliarios",
          roles: ["administrador"]
        }, {
          title: "solicitudes",
          link: "/solicitudes",
          roles: ["administrador"]
        },
        {
          title: "Novedades e Incidencias",
          link: "/novedades",
          roles: ["administrador"]
        },
        {
          title: `Reportar ${authData?.TipoUsuario === "domiciliario" ? "Novedades" : "Incidencias"} `,
          link: "/reportar",
          roles: ["domiciliario", "particular", "negocio"]
        },
        {
          title: "Listar Solicitud - Domiciliario",
          link: "/solicitudes-domiciliario",
          roles: ["domiciliario"]
        },
      ],
    },
    {
      title: "Reportes",
      icon: BarChart,
      module: "reportes",
      roles: ["administrador"],
      submenu: [
        {
          title: "Reporte de novedades",
          link: "/NovedadesReporte",
          roles: ["administrador"]
        },
        {
          title: "Reporte de incidencias",
          link: "/IncidenciasReporte",
          roles: ["administrador"]
        },
      ],
    },
    {
      title: "Salir",
      icon: LogOut,
      module: "configuracion",
      roles: ["administrador", "domiciliario", "particular", "negocio"],
      link: "/",
      onClick: HandleExit,
    },
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = openModule === item.module;


    if (!hasAccess(item.roles)) return null;


    const filteredSubmenu = filterSubmenuItems(item.submenu);


    if (item.submenu && filteredSubmenu.length === 0) return null;

    return (
      <div className="border-b border-gray-700 last:border-0">
        <Link
          to={item.link}
          onClick={() => {

            if (item.onClick) {
              item.onClick();
            } else {
              toggleModule(item.module);
            }
          }}
          className="flex justify-between items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {filteredSubmenu && filteredSubmenu.length > 0 && (
            isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </Link>

        {isActive && filteredSubmenu && (
          <div className="bg-gray-900 overflow-hidden transition-all duration-200">
            {filteredSubmenu.map((submenuItem, index) => (
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
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>


      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden
          ${isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sidebar principal */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out 
          overflow-y-auto lg:translate-x-0 lg:static lg:h-screen z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header del Sidebar */}
        <div className="sticky top-0 bg-gray-800 z-10 p-4 border-b border-gray-700">
          <h1 className="text-white text-xl font-bold text-center ml-8">Orders</h1>
        </div>

        {/* Navegación */}
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