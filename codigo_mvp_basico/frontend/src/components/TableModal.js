import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Creates a row with the label and the value
 * @param label: the label of the row
 * @param value: the value of the row
 * @returns the row with the label and the value
 * */
function createData(label, value) {
  return { label, value };
}

/**
 * The rows of the table
 * */
const rows = [
  createData('Onde recebe', 'Flexível'),
  createData('Quando recebe', 'Flexível'),
  createData('Perfil de contrato', '12 meses'),
  createData('Modelo de contratação', 'Mensalidade'),
];

/**
 * Table that shows the details of the Flex plan
 * */
export default function TableModal() {
  return (
    <TableContainer component={Paper} style={{ height: '100%', overflow: 'hidden' }}>
      <Table className="custom-table" aria-label="caption table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell>{row.label}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
