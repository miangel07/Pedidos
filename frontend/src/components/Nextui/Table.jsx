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
        <div className="flex flex-col w-full bg-white shadow-lg rounded-lg">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <TableNext aria-label="Tabla de Datos Paginada" className="w-full">
                <TableHeader>
                  {columns?.map((column, index) => (
                      <TableColumn
                          key={index}
                          className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        {column}
                      </TableColumn>
                  ))}
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {data && data
                      .map((row, index) => (
                          <TableRow className="hover:bg-gray-50" key={index}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    className="px-2 sm:px-4 md:px-6 py-4 text-sm text-gray-900 break-words"
                                >
                                  <div className="max-w-[200px] sm:max-w-full overflow-hidden text-ellipsis">
                                    {cell}
                                  </div>
                                </TableCell>
                            ))}
                          </TableRow>
                      ))
                      .slice(firsIndex, lastIndex)}
                </TableBody>
              </TableNext>
            </div>
          </div>
          <div className="py-3 px-4 bg-gray-50 border-t">
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
                             // eslint-disable-next-line react/prop-types
                             personaPerPage,
                             // eslint-disable-next-line react/prop-types
                             currentPage,
                             // eslint-disable-next-line react/prop-types
                             setCurrentPage,
                             // eslint-disable-next-line react/prop-types
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
