import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const codearray = {
  python3: "print('Hello World')",
  cpp: '#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<"Hello World";\n\treturn 0;\n}',
  c: '#include<stdio.h>\nint main(){\n\tprintf("%s","Hello World");\n\treturn(0);\n}',
  java: 'class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!"); \n\t}\n}',
  ruby: "",
  nodejs: "",
};
const Editor = () => {
  const [output, setoutput] = useState("");
  const [dis, setdis] = useState(true);
  const [lan, setlan] = useState("python3");
  const [code, setCode] = useState(codearray[lan]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setCode(codearray[lan]);
    setdis(false);
  }, [lan]);

  useEffect(() => {}, []);

  const getOutput = async () => {
    console.log(code + lan);
    const url = "https://online-code-compiler.p.rapidapi.com/v1/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "9f95586619mshde98c09704990f8p1a725ajsn38058181642a",
        "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: lan,
        version: "latest",
        code: code,
        input: input,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.output);
      setoutput(result.output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormControl
        sx={{
          marginTop: "1%",
          marginLeft: "5%",
          marginRight: "20%",
          marginBottom: "1%",
          width: "15%",
        }}
      >
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          label="Language"
          sx={{ color: "black" }}
          value={lan}
          onChange={(e) => {
            setlan(e.target.value);
            setoutput("");
          }}
        >
          <MenuItem value={"python3"}>Python</MenuItem>
          <MenuItem value={"cpp"}>C++</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"nodejs"}>NodeJS</MenuItem>
        </Select>
      </FormControl>
      <TextField
        minRows={19}
        value={code}
        disabled={dis}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        sx={{
          margin: "auto",
          width: "90%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
        label="Playground"
        multiline
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2vh auto 2vh auto",
          width: "90%",
        }}
      >
        <TextField
          minRows={5}
          value={input}
          disabled={dis}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          sx={{
            width: "60%",
          }}
          label="Input"
          multiline
        />
        <Button
          variant="contained"
          size="large"
          sx={{ margin: "auto 2vw auto auto", fontSize: "20px" }}
          onClick={getOutput}
        >
          Run
        </Button>
      </div>
      <h4 style={{ margin: "auto auto 0.5vh auto", width: "90%" }}>Output:-</h4>
      <div
        style={{
          margin: "auto auto 2vh auto",

          minHeight: "20vh",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          border: "1px solid rgb(196 196 196)",
          padding: "1%",
          width: "90%",
          boxSizing: "border-box",
        }}
      >
        {output}
      </div>
    </>
  );
};
export default Editor;
