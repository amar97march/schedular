import logo from "./logo.svg";
import Table from "react-bootstrap/Table";
import "./App.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/assets/asset_all/";

function App() {

  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      // Backend api call
      setAssets(response.data.data);
    });
  }, []);

  const theadData = [
    "Project ID",
    "Name",
    "Branch",
    "Experience",
    "Course",
    "Type of call",
  ];

  const handleVideoClick = (event) => {
    // handle onclick on video checkbox
    if (event.target.checked) {
      setShowVideoPopup(true)
    }
  };
  const getTypeData = (item, index) => {
    // render checkbox data
    return (
      <div className="call-type-outer">
        {item.video && (
          <div>
            <input
              type="checkbox"
              id="topping"
              name="topping"
              onClick={handleVideoClick}
            />&nbsp;
            Video Call
          </div>
        )}
        {item.email && (
          <div>
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value={`email-${index}`}
            />&nbsp;
            Email Call
          </div>
        )}
        {item.text && (
          <div>
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value={`text-${index}`}
            />&nbsp;
            Text Remainder
          </div>
        )}
      </div>
    );
  };

  const getRowColor = (data) => {
    // Get row color
    let count = 0;
    if (data[4] !== null) {
      count += 1;
    }
    if (data[5].video || data[5].email || data[5].text) {
      count += 1;
    }
    if (count === 0) {
      return { backgroundColor: "red", color: "white" };
    } else if (count === 1) {
      return { backgroundColor: "yellow" };
    } else {
      return { backgroundColor: "green", color: "white" };
    }
  };

  return (
    <div className="App">
      <div className="heading">Call Scheduler</div>
      <Table bordered className="table-class">
        <thead>
          <tr>
            {theadData.map((item, index) => {
              return (
                <td title={item} key={index} style={{ fontWeight: "bold" }}>
                  {item.toUpperCase()}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {assets.map((data, index) => {
            return (
              <tr key={index} style={getRowColor(data.items)}>
                {data.items.map((item, innerIndex) => {
                  console.log(typeof item);
                  if (item && typeof item === "object") {
                    console.log("Amar", item, index);
                    return (
                      <td key={innerIndex}>
                        {getTypeData(item, index)}
                      </td>
                    );
                  } else {
                    return <td key={innerIndex}>{item}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Popup modal open={showVideoPopup} onClose={()=> {
        setShowVideoPopup(false)
      }}>
        <div className="video-popup">
          <h3>Video Call Popup</h3>
          <div className="call-id">Call Id: 235235</div>
          <button className="join-btn">Join</button>
        </div>
      </Popup>
    </div>
  );
}

export default App;
