import Drawer from "@mui/material/Drawer";

import { Material } from "interfaces";

type TypeProps = {
  data?: Material;
  open: boolean;
  onCloseHandler: () => void;
};

const MaterialDetail = ({ data, open = false, onCloseHandler }: TypeProps) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={onCloseHandler}>
      <pre>{`
          hi
          hello

          soap
          material
          
          `}</pre>
    </Drawer>
  );
};

export default MaterialDetail;
