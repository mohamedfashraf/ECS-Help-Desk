import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs using Axios when the component mounts
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/logs');
        console.log('Logs data:', response.data);
  
        // Parse JSON strings in logs data
        const parsedLogs = response.data.logs.map((log) => JSON.parse(log));
  
        setLogs(parsedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
  
    fetchLogs();
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
      { Header: 'Level', accessor: 'level' },
      { Header: 'Message', accessor: 'message' },
      // Add more columns as needed
    ],
    []
  );

  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: logs });

  return (
    <div className="flex h-screen ">
      <div className="flex flex-col flex-grow p-6">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-3xl font-semibold mb-4">Logs</h2>
          <div className="responsive-table">
            <table {...getTableProps()} className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="py-2 px-4 border-b">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="py-2 px-4 border-b">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
