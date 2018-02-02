# js-ui-generate
Generate reusable UI components (input, select, textarea) in HTML from JSON
Purpose:
  To generate consistant UI components
  less code writing
  simplier version of json2html
Every component has a JSON definition
e.g. simple input:
<label id='label_name' for='name'>Name:</label><input id='name' type='text' /></input>
in JSON:
{
  "component": {
    "id": "name",
    "type":"input",
    "properties":[
      {"style":""},
      {"class":""},
    ]
    "label": { //optional
      "properties":[
        {"style":""},
        {"class":""},
      ]
    }
}

