import React, { useEffect } from 'react';
import { DefaultEditor } from '../DefaultEditor/DefaultEditor';
import {
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
} from 'lodash';
import TextField from "@mui/material/TextField";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";



export const StringUtilities = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState('Replace');
  const [searchWord, setSearchWord] = React.useState('');
  const [replaceWord, setReplaceWord] = React.useState('');
  const [checkRegexp, setCheckRegexp] = React.useState(false);
  const sample = [
    'requestURLDecoder',
    'HTTP_CLIENT_FACTORY',
    'generic_activity',
    'WeirdActivity',
    'kebab-is-good',
    'Normal text',
  ].join('\n');

  useEffect(() => {
    let strings = input.split('\n');
    switch (mode) {
      default:
      case 'Replace':
        if (!checkRegexp) {
          strings = [input.replaceAll(searchWord, replaceWord)]
          break;
        }
        try {
          strings = [input.replace(new RegExp(searchWord, 'g'), replaceWord)]
          break;
        } catch (e) {
          setOutput(e);
          return;
        }
      case 'Camel':
        strings = strings.map(camelCase);
        break;
      case 'Snake':
        strings = strings.map(snakeCase);
        break;
      case 'Kebab':
        strings = strings.map(kebabCase);
        break;
      case 'Upper':
        strings = strings.map(upperCase);
        break;
      case 'Lower':
        strings = strings.map(lowerCase);
        break;
      case 'Capitalize':
        strings = strings.map(capitalize);
        break;
    }
    setOutput(strings.join('\n'));
  }, [input, mode, searchWord, replaceWord, checkRegexp]);

  const leftContent = (mode === 'Replace') ?
    (
      <Box display="flex" style={{alignItems: 'center', padding: '8px 0 0 8px'}}>
        <TextField label="search" onChange={(event) => setSearchWord(event.target.value)} variant="outlined" />
        <Box style={{paddingLeft: "16px"}}>
          <FormControlLabel
            control={<CheckBox checked={checkRegexp} onClick={() => setCheckRegexp(!checkRegexp)}/>}
            label="Regexp"/>
        </Box>
        <TextField label="replace" onChange={(event) => setReplaceWord(event.target.value)}/>
      </Box> ) : undefined;

  return (
    <DefaultEditor
      input={input}
      mode={mode}
      setInput={setInput}
      setMode={setMode}
      output={output}
      modes={['Replace', 'Camel', 'Snake', 'Kebab', 'Upper', 'Lower', 'Capitalize']}
      sample={sample}
      extraLeftContent={leftContent}
    />
  );
};

export default StringUtilities;
