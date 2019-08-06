import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dealers, setDealers] = useState([]);
  const [cars, setCars] = useState<Array<object>>([]);
  const getCars = (offset: number = 0) => {
    let amount: number = 20;
    let distance: number = 30;
    let headers = new Headers();
    headers.append("VCC-Api-Key", "2d3d92aed6ef4040b2f1c84dd0bec3d4");
    headers.append(
      "Accept",
      "application/vnd.volvocars.api.carinventory.inventorylist.v1+json"
    );

    let request = new Request(
      `https://gw.consumer.api.volvocars.com/americas/newcarinventory/inventories?marketid=en-us&zipcode=20148&latitude=39.0118703&longitude=-77.5275463&radius=${distance}&limit=${amount}&offset=${offset}&years=2019&models=XC60&drivetrains=AWD&trims=inscription&sort=ModelDesc&exteriorgroupcodes=&interiorgroupcodes=&dealers=&pageNo=0`,
      { headers: headers, mode: "cors" }
    );
    fetch(request).then(result => {
      result.json().then(jsonData => {
        console.log(jsonData);
        //add results to the cars list
        setCars([...cars, jsonData.data[0].inventoryList]);
        //if the total car count is less than the pagination total, then add the limit to the offset and try again
        if (
          cars.length + jsonData.data[0].inventoryList.length <=
          jsonData.pagination.total
        ) {
          console.log("load more");
          console.log(cars.length + jsonData.data[0].inventoryList.length);

          getCars(cars.length + jsonData.data[0].inventoryList.length);
        }
      });
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="App-link" onClick={() => getCars(0)}>
          Get Cars
        </button>
      </header>
    </div>
  );
}

export default App;
