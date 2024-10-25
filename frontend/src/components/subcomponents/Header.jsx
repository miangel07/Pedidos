// eslint-disable-next-line react/prop-types
export const Header = ({ contenido }) => {
  return (
    <header
      className={`inset-x-0 top-0 h-16 md:px-8 sm:px-8 max-sm:px-8 border z-50`}
    >
      <nav
        className="flex items-center justify-center  lg:px-8  h-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-green-600 tracking-wide">
            Orders
          </div>
        </div>
        {contenido}
      </nav>
    </header>
  );
};
