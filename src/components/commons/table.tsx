import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableProps,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";

export interface Column extends TableCellProps {
  key: string;
  dataKey: string;
  title: string;
  width?: number | string | undefined;
  render?: (
    record?: unknown,
    idx?: number,
    data?: unknown
  ) => JSX.Element | unknown;
}

type TypeTableProps = TableProps & {
  columns: Column[];
  dataSource: any;
};

const CommTable = ({ columns, dataSource, ...props }: TypeTableProps) => {
  const count_w = useMemo(
    () => columns.filter((cw) => !cw.width).length,
    [columns]
  );

  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          {columns.map((c) => {
            let str_w;
            if (!c.width) {
              const calc_w = columns
                .filter((cw) => cw.width)
                .map((cw) =>
                  typeof cw.width === "string" ? cw.width : `${cw.width}px`
                );
              str_w = `calc((100% - ${calc_w.join("-") ?? 0})/${count_w ?? 1})`;
            } else {
              str_w = typeof c.width === "string" ? c.width : `${c.width}px`;
            }

            return (
              <TableCell
                key={c.key}
                align={c.align ?? "left"}
                style={{ width: str_w }}
              >
                {c.title}
              </TableCell>
            );
          })}
        </TableRow>
        <TableBody></TableBody>
      </TableHead>
    </Table>
  );
};

export default CommTable;
