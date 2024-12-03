import { CellText } from '@/components/Table/CellText.tsx'
import { TResponseHistory } from '@/types/user'

export const TableRow = ({
  taskNumber,
  row: { answer, score, textTask, time },
}: {
  taskNumber: number
  row: TResponseHistory['tasks'][number]
}) => {
  return (
    <tr>
      <td>{taskNumber}</td>
      <td><CellText text={textTask} /></td>

      <td>{answer}</td>
      <td>{score}</td>
      <td>{time}</td>
    </tr>
  )
}
