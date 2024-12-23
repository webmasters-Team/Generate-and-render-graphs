import mermaid from "https://cdn.skypack.dev/mermaid@8.12.0";
import format from "https://cdn.skypack.dev/xml-formatter";

mermaid.mermaidAPI.initialize({
	startOnLoad: false
});

const eleGraph = document.querySelector(".mermaid");
const eleSource = document.querySelector(".source");
const eleSvg = document.querySelector(".svg");
const eleTypes = document.querySelector(".types");

const insertSvg = (svgCode, bindFunctions) => {
	eleGraph.innerHTML = svgCode;
	eleSvg.value = format(svgCode);
};

const update = () => {
	var graphDefinition = eleSource.value;
	var graph = mermaid.mermaidAPI.render("mermaid", graphDefinition, insertSvg);
};
eleSource.addEventListener("input", update);
update();
const types = {
	sequenceDiagram: `sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?`,
	graph: `graph TD  
  A[Mermaid] --> C{"DO you like it?"}  
  C -->|Yes| D["Look inside the code 👏"]  
  C -->|No| E["Try looking at other pens then 🙃"]
  C -->|Maybe| F{"Think again"}
  F -->|Done| C
  F -->|No| G["Bye bye then"]`,
	classDiagram: `classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +Bigdecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdrawl(amount)`,
	stateDiagram: `stateDiagram-v2
    [*] --> First

    state First {
        [*] --> Second

        state Second {
            [*] --> second
            second --> Third

            state Third {
                [*] --> third
                third --> [*]
            }
        }
    }`,
	erDiagram: `erDiagram
    CAR ||--o{ NAMED-DRIVER : allows
    CAR {
        string registrationNumber
        string make
        string model
    }
    PERSON ||--o{ NAMED-DRIVER : is
    PERSON {
        string firstName
        string lastName
        int age
    }`,
	journey: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`,
	pie: `pie title Lines of code in a pen
    "HTML" : 10
    "CSS" : 20
    "JS" : 105`,
	requirement: `requirementDiagram

    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    element test_entity {
    type: simulation
    }

    test_entity - satisfies -> test_req`
};

Object.keys(types).forEach((typeOfMermaid) => {
	eleTypes.innerHTML += `<li class="type_${typeOfMermaid}" data-type="${typeOfMermaid}">${typeOfMermaid}</li>`;
});

eleTypes.addEventListener("click", (e) => {
	const t = e.srcElement.dataset.type;
	eleSource.value = types[t];
	update();
});

eleSvg.addEventListener("keyup", () => {
	eleGraph.innerHTML = eleSvg.value;
})