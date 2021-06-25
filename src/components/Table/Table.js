import TableHeadItem from './TableHeadItem'
import TableRow from './TableRow'
export default function Table({ theadData, tbodyData }) {
  console.log(theadData, tbodyData)
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {theadData &&
            theadData.map((h) => {
              console.log(h)
              return <TableHeadItem key={h} item={h} />
            })}
        </tr>
      </thead>
      <tbody>
        {tbodyData &&
          tbodyData.map((item) => {
              console.log(item);
            return <td key={item}>{item}</td>
          })}
      </tbody>
    </table>
  )
}
