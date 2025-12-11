export default function DataTable({ columns, data }) {
  return (
    <table className="w-full border border-borderColor-light">
      <thead className="bg-secondary text-text-strong">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="p-3 border border-borderColor-light text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="odd:bg-white even:bg-bg-subtle">
            {columns.map((col, j) => (
              <td key={j} className="p-3 border border-borderColor-light">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
