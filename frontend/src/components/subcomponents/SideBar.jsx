import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Home,
  Truck,
  BarChart,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModule, setOpenModule] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModule = (module) => setOpenModule(openModule === module ? null : module);

  const menuItems = [
    {
      title: 'Usuarios',
      icon: Users,
      module: 'usuarios',
      submenu: [
        { title: 'Administrar usuarios', link: '#usuarios-crud' },
        { title: 'Recuperación de contraseña', link: '#recuperacion-contrasena' }
      ]
    },
    {
      title: 'Solicitudes de Domicilio',
      icon: Home,
      module: 'solicitudes',
      submenu: [
        {
          title: 'Creación de solicitudes',
          link: '#creacion-solicitudes',
          subItems: [
            { title: 'Punto de recogida y entrega', link: '#punto-recogida' },
            { title: 'Horario de entrega', link: '#horario-entrega' },
            { title: 'Instrucciones adicionales', link: '#instrucciones-adicionales' }
          ]
        },
        {
          title: 'Asignación automática',
          link: '#asignacion-automatica',
          subItems: [
            { title: 'Asignación cercana', link: '#asignacion-cercano' },
            { title: 'Reasignación automática', link: '#reasignacion-automatica' }
          ]
        }
      ]
    },
    {
      title: 'Gestión de Domiciliarios',
      icon: Truck,
      module: 'domiciliarios',
      submenu: [
        {
          title: 'Gestión de disponibilidad',
          link: '#gestion-disponibilidad',
          subItems: [
            { title: 'Actualizar estado', link: '#actualizar-estado' },
            { title: 'Marcar inactivo', link: '#marcar-inactivo' }
          ]
        },
        {
          title: 'Reporte de novedades',
          link: '/novedades',
          subItems: [
            { title: 'Reportar problemas', link: '#reportar-problemas' },
            { title: 'Seguimiento de pedidos', link: '#seguimiento-pedidos' }
          ]
        }
      ]
    },
    {
      title: 'Reportes',
      icon: BarChart,
      module: 'reportes',
      submenu: [
        {
          title: 'Reportes de solicitudes',
          link: '#reportes-solicitudes',
          subItems: [
            { title: 'Solicitudes históricas', link: '#solicitudes-historicas' }
          ]
        },
        {
          title: 'Reportes de domiciliarios',
          link: '#reportes-domiciliarios',
          subItems: [
            { title: 'Rendir cuentas', link: '#rendir-cuentas' }
          ]
        }
      ]
    },
    {
      title: 'Administración Central',
      icon: Settings,
      module: 'configuracion',
      submenu: [
        {
          title: 'Configuración general',
          link: '#configuracion-general',
          subItems: [
            { title: 'Modificar permisos', link: '#modificar-permisos' },
            { title: 'Ajustes de notificaciones', link: '#ajustes-notificaciones' }
          ]
        }
      ]
    }
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = openModule === item.module;

    return (
      <div className="border-b border-gray-700 last:border-0">
        <div
          onClick={() => toggleModule(item.module)}
          className="flex justify-between items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {item.submenu && (
            isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </div>

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
                {submenuItem.subItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {submenuItem.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="text-gray-500 hover:text-gray-300 text-xs block py-1"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
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