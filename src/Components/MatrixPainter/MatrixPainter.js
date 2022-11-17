import React, { useState } from "react";
let data = [];
export default function MatrixPainter() {
    // leds[112] = CRGB(0, 255, 255); //R
    // FastLED.show();
    const [rows, setRows] = useState(7);
    const [columns, setColumns] = useState(17);
    const [serpent, setSerpent] = useState(true);
    let matrix = [];
    let counter = 0;
    const [r, setR] = useState(244);
    const [g, setG] = useState(244);
    const [b, setB] = useState(244);
    for (let row = 0; row < rows; row++) {
        let rowArray = [];
        for (let column = 0; column < columns; column++) {
            rowArray.push(counter);
            counter++;
        }
        if (row % 2 === 1 && serpent) {
            rowArray.reverse();
        }
        matrix.push(rowArray);
    }

    console.table(matrix);

    function handleClick(e) {
        console.log("clicked: " + e.target.id);
        if (data.filter((d) => d.id === e.target.id).length === 0) {
            let currentData = {
                id: e.target.id,
                clicked: true,
                color: `(${r},${g},${b})`,
                code: `leds[${e.target.id}] = CRGB(${r},${g},${b});`,
            };
            data.push(currentData);
            document.getElementById(
                e.target.id
            ).style.backgroundColor = `rgb${currentData.color}`;
            document.getElementById(
                e.target.id
            ).style.border = `0.5px black solid`;
        } else {
            data = data.filter((d) => d.id !== e.target.id);
            document.getElementById(
                e.target.id
            ).style.border = `0px black solid`;
            document.getElementById(
                e.target.id
            ).style.backgroundColor = `rgb(244,244,244)`;
        }

        //update text area
        document.getElementById("code").value = "";
        for (let selectedLED = 0; selectedLED < data.length; selectedLED++) {
            document.getElementById("code").value +=
                "\n" + data[selectedLED].code + "\nFastLED.show(); \n";
        }

        console.log(data);
    }
    function formChange(e) {
        setRows(document.getElementById("rows").value);
        setColumns(document.getElementById("columns").value);
        setR(document.getElementById("r").value);
        setG(document.getElementById("g").value);
        setB(document.getElementById("b").value);
        setSerpent(document.getElementById("serpent").checked);
        document.getElementById(
            "currentColor"
        ).style.backgroundColor = `rgb(${r},${g},${b})`;
    }

    return (
        <div>
            {matrix.map((row) => (
                <div
                    key={row[0]}
                    className="row"
                    style={{
                        display: "flex",
                        margin: "1px",
                        justifyContent: "center",
                    }}
                >
                    {row.map((column) => (
                        <div
                            key={column}
                            className="column"
                            id={column}
                            style={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: "rgb(244,244,244)",
                                padding: "10px",
                                margin: "1px",
                                display: "flex",
                                justifyItems: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: "100",
                            }}
                            onClick={(e) => {
                                handleClick(e);
                            }}
                        >
                            {column}
                        </div>
                    ))}
                </div>
            ))}
            <div>
                <br />
                <form
                    onChange={(e) => {
                        formChange(e);
                    }}
                >
                    <label>rows:</label>
                    <input
                        placeholder="rows"
                        type="number"
                        id="rows"
                        defaultValue={rows}
                    />
                    <label>--columns:</label>
                    <input
                        placeholder="columns"
                        type="number"
                        id="columns"
                        defaultValue={columns}
                    />  

                    <label>--serpent:</label>
                    <input
                        type="checkbox"
                        id="serpent"
                        defaultChecked={serpent}
                    />


                    <br />
                    <label>r:</label>
                    <input
                        placeholder="r"
                        type="number"
                        id="r"
                        defaultValue={r}
                    />
                    <label>--g:</label>
                    <input
                        placeholder="g"
                        type="number"
                        id="g"
                        defaultValue={g}
                    />
                    <label>--b:</label>
                    <input
                        placeholder="b"
                        type="number"
                        id="b"
                        defaultValue={b}
                    />
                    <div
                        id="currentColor"
                        style={{
                            height: "30px",
                            width: "100%",
                            backgroundColor: `rgb(${r},${g},${b})`,
                            justifyContent: "center",
                        }}
                    ></div>
                </form>
                <textarea id="code" cols="70" rows="40" />
            </div>
        </div>
    );
}
