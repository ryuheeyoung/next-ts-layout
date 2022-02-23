import { Autocomplete, Box, Input } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import { Material } from "interfaces";
import { useEffect, useState } from "react";

type TypeProps = {
  data?: Material;
  open: boolean;
  onCloseHandler: () => void;
};

const MaterialDetail = ({ data, open = false, onCloseHandler }: TypeProps) => {
  const [mat, setMat] = useState<Material | undefined>();

  useEffect(() => {
    setMat(data);
  }, [data]);
  return (
    <Drawer anchor="right" open={open} onClose={onCloseHandler}>
      <Box sx={{ p: "2.5em" }}></Box>
    </Drawer>
  );
};

export default MaterialDetail;
