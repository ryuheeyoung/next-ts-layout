import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Column } from "components/commons/table";
import RowField from "components/commons/row-field";
import SoapLayout from "components/soap/layout";

import { getMaterials } from "fetches/material";

import { Material } from "interfaces";

type TypeProps = {
  data: Material[];
};

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

const initRow: Material = {
  name: "",
  amount: 0,
  unit: "",
};

const SoapMaterial = (props: TypeProps) => {
  const [addRow, setAddRow] = useState<Material>({ ...initRow });
  const { isValidating, data, mutate } = useSWR<Material[]>("/api/material", {
    fetcher,
    fallbackData: props.data,
  });

  const columns: Column[] = [
    {
      key: "id",
      dataKey: "id",
      title: "#",
      align: "center",
      render: (record: number, idx: number) => idx! + 1,
    },
    { key: "name", dataKey: "name", title: "재료명", align: "center" },
    {
      key: "amount",
      dataKey: "amount",
      title: "수량",
      align: "center",
      render: (record: number, idx: number, data: Material) =>
        `${record} ${data.unit}`,
    },
    {
      key: "action",
      dataKey: "id",
      title: "처리",
      align: "center",
      render: (record: number, idx: number, data: Material) => (
        <Stack
          direction={"row"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent={"center"}
        >
          <Button onClick={() => onUpdate(data)} disabled>
            수정하기
          </Button>
          <Button onClick={() => onDelete(record)}>삭제하기</Button>
        </Stack>
      ),
    },
  ];

  /**
   * 입력전용 행 렌더 함수
   * @param column 테이블 컬럼 데이터
   * @returns input field
   */
  const addRowRender = (column: Column): JSX.Element | undefined => {
    const key = column.key;
    if (key === "amount") {
      return (
        <Stack direction="row" spacing={2}>
          <RowField
            width={"70%"}
            value={addRow["amount"]}
            type={"number"}
            onChange={({ target: { value } }) =>
              setAddRow({ ...addRow, amount: +value })
            }
          />
          <RowField
            width={"30%"}
            value={addRow["unit"]}
            onChange={({ target: { value } }) =>
              setAddRow({ ...addRow, unit: value })
            }
          />
        </Stack>
      );
    } else if (key === "name") {
      return (
        <RowField
          width={"100%"}
          value={addRow["name"]}
          onChange={({ target: { value } }) =>
            setAddRow({ ...addRow, name: value })
          }
        />
      );
    } else if (key === "action") {
      return <Button onClick={onSave}>추가하기</Button>;
    } else {
      return;
    }
  };

  /**
   * 재료 삭제 이벤트
   * @param id 재료 id
   */
  const onDelete = async (id: number) => {
    await fetch(`/api/material/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => mutate())
      .catch((e) => console.error(e.message));
  };

  /**
   * 재료 정보 수정 이벤트
   * @param value 재료 데이터
   */
  const onUpdate = async (value: Material) => {
    await fetch(`/api/material/${value.id}`, {
      method: "PUT",
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then(() => mutate())
      .catch((e) => console.error(e.message));
  };

  /**
   * 새로운 재료 저장 이벤트
   */
  const onSave = async () => {
    const data = {
      name: addRow.name,
      amount: addRow.amount,
      unit: addRow.unit,
    };
    await fetch("/api/material", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        mutate();
        setAddRow({ ...initRow });
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <Head>
        <title>Material::HeeSoap</title>
      </Head>
      <Toolbar>
        <Typography variant="h6">보유재료 관리</Typography>
      </Toolbar>
      <Divider />
      <Box
        component={Paper}
        sx={{ margin: ".5em 0 2em 0", maxHeight: "calc(100% - 2.5em - 55px)" }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={c.key} align="center">
                    {c.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={`new-${c.key}`} align="center">
                    {addRowRender(c)}
                  </TableCell>
                ))}
              </TableRow>
              {data && data.length ? (
                data.map((d, idx) => (
                  <TableRow key={d.id}>
                    {columns.map((c) => (
                      <TableCell
                        key={`${c.key}-${d.id}`}
                        align={c.align ?? "left"}
                      >
                        {c.render
                          ? c.render(d[c["dataKey"]], idx, d)
                          : d[c["dataKey"]]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    가지고있는 재료가 없네요.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export async function getStaticProps() {
  try {
    const records = await getMaterials();
    const data = records.map((r) => {
      return {
        ...r,
        createdAt: new Date(r.createdAt!).toString(),
        updatedAt: new Date(r.updatedAt!).toString(),
      };
    });

    return { props: { data } };
  } catch (e) {
    console.error(e.message);

    return { props: { error: e.message }, data: [] };
  }
}

export default SoapMaterial;
SoapMaterial.Layout = SoapLayout;
