import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputField from "../commons/forms/input-field";

const RecipeInput = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: 0,
        display: "flex",
        width: "100vw",
        height: "100vh",
        m: 0,
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          m: 0,
          p: ".25em",
          width: "50vw",
        }}
      >
        <InputField />
      </Box>
    </Container>
  );
};

export default RecipeInput;
