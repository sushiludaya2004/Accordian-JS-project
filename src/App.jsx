import { useState } from 'react';
import './App.css';
import data from './data';

function App() {
  const [selected, setSelected] = useState(0);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingle = (id) => {
    setSelected(id === selected ? 0 : id); 
  };

  const handleMulti = (id) => {
    let cpyMulti = [...multiple];
    const findIndexOfCurrentId = cpyMulti.indexOf(id);

    // Toggle the current id in the multi selection
    if (findIndexOfCurrentId === -1) {
      cpyMulti.push(id);
    } else {
      cpyMulti.splice(findIndexOfCurrentId, 1);
    }

    setMultiple(cpyMulti);
  };

  const toggleSelectionMode = () => {
    if (enableMultiSelection) {
      // Switching to single selection mode
      setEnableMultiSelection(false);
      setMultiple([]); // Clear multiple selections
      setSelected(0); // Clear single selected item
    } else {
      // Switching to multi-selection mode
      setEnableMultiSelection(true);
      setSelected(0); // Clear single selection when enabling multi
    }
  };

  return (
    <>
      <div className="wrapper">
        <button onClick={toggleSelectionMode}>
          {enableMultiSelection ? "Switch to Single Selection" : "Enable Multi Selection"}
        </button>
        <div className="accordian">
          {data && data.length >= 1 ? data.map((dataItem) => (
            <div className='item' key={dataItem.id}>
              <div onClick={() => enableMultiSelection ? handleMulti(dataItem.id) : handleSingle(dataItem.id)}>
                <h3>{dataItem.question}</h3>
                <span>+</span>
                {
                  selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                    <div className="content">{dataItem.answer}</div> : null
                }
              </div>
            </div>
          )) : ("Not having any data")}
        </div>
      </div>
    </>
  );
}

export default App;