import React, { useState } from "react";

import {
  MessageProvider,
  MessageTemplate,
} from "@sendbird/react-uikit-message-template-view";
import type { Template } from "@sendbird/uikit-message-template";

import template0 from "./templateSamples/t0.json";
import template1 from "./templateSamples/t1.json";
import template2 from "./templateSamples/t2.json";
import template3 from "./templateSamples/t3.json";

const templateList = [
  {
    name: "템플릿 1",
    template: template0,
  },
  {
    name: "템플릿 2",
    template: template1,
  },
  {
    name: "템플릿 3",
    template: template2,
  },
  {
    name: "템플릿 4",
    template: template3,
  },
];

const defaultJSON = { version: 1, body: { items: [] } };
const placeHolderText = JSON.stringify(defaultJSON, null, 2);

const Title = ({ children }: React.PropsWithChildren) => (
  <h2 style={{ fontSize: 22, fontWeight: "bold" }}>{children}</h2>
);
const App = () => {
  const [theme, setTheme] = useState("light");

  const [jsonText, setJsonText] = useState("");
  const [selected, setSelected] = useState("");
  const [json, setJson] = useState<object>({
    version: 1,
    body: { items: [] },
  });

  const onSelectChange = (value: string) => {
    setSelected(value);
    try {
      const template = templateList[Number(value)].template;
      setJsonText(JSON.stringify(template, null, 2));
      setJson(template);
    } catch {
      console.warn("cannot parse json");
      setJson(defaultJSON);
    }
  };

  const onChangeText = (text: string) => {
    setJsonText(text);

    try {
      const parsedJson = JSON.parse(text);
      setJson(parsedJson);
    } catch {
      console.warn("cannot parse json");
      setJson(defaultJSON);
    }
  };

  return (
    <div>
      <Title>{"Message Template Playground"}</Title>
      <select onChange={(e) => onSelectChange(e.target.value)} value={selected}>
        {templateList.map(({ name }, index) => (
          <option value={index} key={index}>
            {name}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="editor-holder">
            <ul className="toolbar">
              <li>
                <i className="fa fa-indent">JSON</i>
              </li>
            </ul>
            <textarea
              id="json"
              className="editor"
              placeholder={placeHolderText}
              value={jsonText}
              onChange={(e) => onChangeText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 300,
          }}
          className={`${theme === "dark" ? "sendbird-theme--dark" : "sendbird-theme--light"}`}
        >
          <div style={{ display: "flex", marginBottom: 8 }}>
            <div>Result</div>
            <button
              style={{ marginLeft: 8, flex: 1 }}
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              switch theme
            </button>
          </div>
          <MessageProvider message={{} as never}>
            <MessageTemplate templateItems={(json as Template).body.items} />
          </MessageProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
