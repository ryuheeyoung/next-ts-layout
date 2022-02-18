import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
import MaterialDetail from "components/materials/detail";
import SoapLayout from "components/soap/layout";
import { getMaterials } from "fetches/material";
import { Material } from "interfaces";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

type TypeProps = {
  data: Material[];
};

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

const SoapMaterial = (props: TypeProps) => {
  const [selected, setSelected] = useState<Material>();
  const [open, setOpen] = useState(false);
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
      render: (record) => data!.findIndex((d) => d === record) + 1,
    },
    { key: "name", dataKey: "name", title: "재료명", align: "center" },
    {
      key: "amount",
      dataKey: "amount",
      title: "수량",
      align: "center",
      render: (record, id, data: Material) => `$${record} ${data.unit}`,
    },
  ];

  const onClose = () => {
    mutate();
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Material::HeeSoap</title>
      </Head>
      <Box component={Paper}>
        <Toolbar>
          <Typography variant="h6">보유재료 관리</Typography>
        </Toolbar>
        <Divider />
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
                    가지고있는 재료가 없네요.{" "}
                    <Button variant="text" onClick={() => setOpen(true)}>
                      추가하기
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <MaterialDetail
        data={selected}
        open={open}
        onCloseHandler={onClose}
      ></MaterialDetail>
    </>
  );
};

export async function getServerSideProps() {
  const data = await getMaterials();

  return { props: { data } };
}

export default SoapMaterial;
SoapMaterial.Layout = SoapLayout;
