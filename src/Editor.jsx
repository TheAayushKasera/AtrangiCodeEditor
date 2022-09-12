import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const codearray = {
  PYTHON: "print('Hello World')",
  cpp: "#include<iostream.h>\n#include<conio.h>\nint main(){\n\tclrscr();\n\tcout<<'Hello World';\n\treturn 0;\n}",
  c: "#include<stdio.h>\n#include<conio.h>\nvoid main(){\n\tclrscr();\n\tprintf('Hello World');\n\tgetch();\n}",
  java: 'class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!"); \n\t}\n}',
  javascript: "",
  ruby: "",
};
const Editor = () => {
  const clientsecret = "50cc259290b8f66ec7260ebba9b575a2a33cf1e0";
  const [output, setoutput] = useState("");
  const [dis, setdis] = useState(true);
  const [lan, setlan] = useState("PYTHON");
  const [code, setCode] = useState(codearray[lan]);
  useEffect(() => {
    setCode(codearray[lan]);
    setdis(false);
  }, [lan]);

  const fetchapi = () => {
    fetch(
      "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "client-secret": clientsecret,
        },
        body: {
          lang: lan,
          source: code,
          input: "",
          memory_limit: 243232,
          time_limit: 5,
          id: "5caf2715dbc97e5c0df95787ba48b799c9b64a0a27eb.api.hackerearth.com",
          context: "{'id': 213121}",
          callback: "https://client.com/callback/",
        },
      }
    ).then((result) => {
      console.log("result", result);
      result.json().then((resp) => {
        setoutput(resp);
        console.log(resp);
      });
    });
  };

  useEffect(() => {
    fetchapi();
  }, []);
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
          }}
        >
          <MenuItem value={"PYTHON"}>Python</MenuItem>
          <MenuItem value={"cpp"}>C++</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"javascript"}>JavaScript</MenuItem>
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
      <Button
        variant="contained"
        size="large"
        sx={{ margin: "2%", marginLeft: "89%", fontSize: "20px" }}
        onClick={() => {
          console.log(code);
        }}
      >
        Run
      </Button>
    </>
  );
};
export default Editor;
