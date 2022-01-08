import React from "react";

const Table = (props) => {
  const { headers, rows } = props;
  return (
    <div className="overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
              ID
            </th>
            {headers.map(({ title }, index) => (
              <th
                key={index}
                className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {index + 1}
              </th>
              {headers.map(({ label }, idx) => (
                <td
                  key={idx}
                  className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                >
                  {row[label]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  headers: [
    {
      label: "name",
      title: "Task Name",
    },
    {
      label: "users",
      title: "Total Users",
    },
    {
      label: "createdAt",
      title: "CreatedAt",
    },
    {
      label: "updatedAt",
      title: "UpdatedAt",
    },
  ],
  rows: [
    {
      name: "EMSOne Frontend",
      users: 2,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
    {
      name: "EMSOne Backend",
      users: 2,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
  ],
};

export default Table;
