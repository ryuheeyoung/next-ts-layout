import { TextFieldProps } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';

import InputField, { InputOptions } from '../commons/forms/input-field';

const RecipeInput = () => {
  const [opts, setOpts] = useState([]); // 검색 재료목록
  const [mats, setMats] = useState<Array<InputOptions>>([]); // 레시피속 재료목록

  const onChange = (val: InputOptions | null) => {
    const matList = [...mats];
    let newMat: InputOptions = {};
    if (typeof val === 'string') {
      if (!matList.find((mat) => mat.label === (val as string).trim())) {
        newMat = {
          id: matList.length + 1,
          label: (val as string).trim(),
        };
      }
      matList.push(newMat);
    } else if (val && val.inputValue) {
      if (
        !matList.find((mat) => mat.label === (val.inputValue as string).trim())
      ) {
        newMat = {
          id: matList.length + 1,
          label: val.inputValue.trim(),
        };
      }
      matList.push(newMat);
    } else {
      newMat = val as InputOptions;
    }

    setMats(matList);
  };

  useEffect(() => {
    setMats([{ id: 1, label: '히영', value: 28 }]);
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 0,
        display: 'inline-flex',
        width: '100vw',
        height: '100vh',
        m: 0,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      <Box
        sx={{
          m: 0,
          p: '.25em 0',
          width: '50vw',
          minWidth: 350,
        }}
      >
        {mats.map((mat) => (
          <InputField
            options={opts}
            selected={mat}
            onChangeHandler={onChange}
          />
        ))}
        <InputField options={opts} onChangeHandler={onChange} />
      </Box>
    </Container>
  );
};

export default RecipeInput;
