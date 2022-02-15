import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { Column } from "components/commons/table";
import SoapLayout from "components/soap/layout";
import { Material } from "interfaces";
import Head from "next/head";
import { useEffect } from "react";

type TypeProps = {
  data: Material[];
};

const SoapMaterial = ({ data }: TypeProps) => {
  const columns: Column[] = [
    {
      key: "id",
      dataKey: "id",
      title: "#",
      render: (record) => data.findIndex((d) => d === record) + 1,
    },
    { key: "name", dataKey: "name", title: "name" },
    {
      key: "amount",
      dataKey: "amount",
      title: "amount",
      render: (record, id, data: Material) => `$${record} ${data.unit}`,
    },
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>Material::HeeSoap</title>
      </Head>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key}>{c.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length ? (
              <TableRow></TableRow>
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
    </>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const data = await prisma.material.findMany();

  return { props: { data } };
}

export default SoapMaterial;
SoapMaterial.Layout = SoapLayout;
