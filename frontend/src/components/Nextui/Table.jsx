import {
  Table as TableNext,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  TableRow,
  Button,
  Pagination as Paginacion,
} from "@nextui-org/react";

import { useState } from "react";

export const Table = ({ columns, data, itemsPerPage = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPersonas = data.length;
  const lastIndex = currentPage * itemsPerPage;
  const firsIndex = lastIndex - itemsPerPage;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Container principal con scroll horizontal en dispositivos pequeños */}
        <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white">
          <TableNext 
            aria-label="Tabla de Datos Paginada"
            classNames={{
              base: "min-w-full w-full",
              table: "min-w-full",
              thead: "bg-gray-50",
              tbody: "divide-y divide-gray-200",
            }}
          >
            <TableHeader>
              {columns?.map((column, index) => (
                <TableColumn
                  key={index}
                  className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider p-4"
                >
                  {column}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data && data
                .slice(firsIndex, lastIndex)
                .map((row, index) => (
                  <TableRow 
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="p-4 text-sm text-gray-900"
                      >
                        <div className="break-words">
                          {typeof cell === 'string' && cell.length > 100 
                            ? `${cell.substring(0, 100)}...`
                            : cell}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </TableNext>
        </div>

        {/* Paginación en un contenedor separado */}
        <div className="w-full px-4 py-3 bg-gray-50 border-t rounded-b-lg">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={totalPersonas}
            personaPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export const Pagination = ({
  personaPerPage,
  currentPage,
  setCurrentPage,
  total,
}) => {
  const pageNumbers = Math.ceil(total / personaPerPage);

  const previosPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <Paginacion
        total={pageNumbers}
        radius="sm"
        color="primary"
        onChange={(pageNumbers) => setCurrentPage(pageNumbers)}
        className="order-2 sm:order-1"
      />
      <div className="flex gap-2 order-1 sm:order-2">
        <Button
          size="sm"
          color="primary"
          isDisabled={currentPage === 1}
          onClick={previosPage}
          className="min-w-[80px]"
        >
          Previous
        </Button>
        <Button
          size="sm"
          color="primary"
          onClick={onNextPage}
          isDisabled={currentPage >= pageNumbers}
          className="min-w-[80px]"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Table;