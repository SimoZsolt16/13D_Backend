import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [szobak, setSzobak] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/szobak')
      .then((res) => res.json())
      .then((data) => setSzobak(data))
      .catch((err) => console.error('Hiba történt az adatok lekérésekor:', err));
  }, []);

  const[foglalasok, setFoglalasok] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/foglalasok')
      .then((res) => res.json())
      .then((data) => setFoglalasok(data))
      .catch((err) => console.error('Hiba történt az adatok lekérésekor:', err));
  }, []);

  const [szobaId, setSzobaId] = useState(-1);

  return (
    <>
      {szobaId == -1 ? (
        <>
          <h1>Szobák listája</h1>
          {szobak.map((szoba, index) => (
            <>
              <div key={index} className="szoba">
                <p><strong>Szoba neve:</strong> {szoba.sznev}</p>
                <p><strong>Összes ágy:</strong> {szoba.osszes_agy}</p>
                <button onClick={() => setSzobaId(index) }>Kiválasztás</button>
              </div>
              <br />
            </>
          ))}
        </>
      ) : (
        <>
          <div className="egyszoba">
            <p><strong>Szoba neve:</strong> {szobak[szobaId].sznev}</p>
            <p><strong>Összes ágy:</strong> {szobak[szobaId].osszes_agy}</p>
            <p><strong>Foglalások:</strong></p>
            <ul>           
              {foglalasok.filter(foglalo => foglalo.szoba === szobaId + 1).map((foglalo, i) => (
                <ul key={i}>
                  <li>Foglaló neve: {foglalo.vnev}</li>
                  <li>Személyek száma: {foglalo.fo}</li>
                  <li>Érkezés: {foglalo.erk}</li>
                  <li>Távozás: {foglalo.tav}</li>
                  <br />
                </ul>
              ))}
            </ul>
            <br />
            <button onClick={() => setSzobaId(-1)}>Bezárás</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;