import "./App.css";
import MatrixPainter from "./Components/MatrixPainter/MatrixPainter";

function App() {
    let rows = 0;
    let columns = 0;
    let color = [0, 0, 0];
    return (
        <div className="App">
            <h1 style={{ paddingBottom: 0, marginBottom: 0 }}>
                FASTLED Matrix Selector
            </h1>
            <h5 style={{ paddingTop: 0, marginTop: 0 }}>
                Muhammad Faseeh Ud Din
            </h5>
            <MatrixPainter className="MatrixPainter" />
        </div>
    );
}

export default App;
