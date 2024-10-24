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

// eslint-disable-next-line react/prop-types
export const Table = ({ columns, data, itemsPerPage = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line react/prop-types
  const totalPersonas = data.length;

  const lastIndex = currentPage * itemsPerPage; // 1 * 8 = 8
  const firsIndex = lastIndex - itemsPerPage; // 8 - 8 = 0

  return (
    <>
      <div className="flex flex-col w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <TableNext aria-label="Tabla de Datos Paginada" className="h-full">
          <TableHeader>
            {/*  eslint-disable-next-line react/prop-types */}
            {columns?.map((column, index) => (
              <TableColumn
                key={index}
                className="px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {column}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data && data
              /*  eslint-disable-next-line react/prop-types */
              .map((row, index) => (
                <TableRow className="hover:bg-gray-50 " key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
              .slice(firsIndex, lastIndex)}
          </TableBody>
        </TableNext>
        <div className="py-3 px-4 bg-gray-50">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={totalPersonas}
            personaPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
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
    <>
      <div className="flex justify-between items-center mt-4">
        <Paginacion
          total={pageNumbers}
          radius="sm"
          color="primary"
          onChange={(pageNumbers) => setCurrentPage(pageNumbers)}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            color="primary"
            isDisabled={currentPage === 1}
            onClick={previosPage}
          >
            Previous
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={onNextPage}
            isDisabled={currentPage >= pageNumbers}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
