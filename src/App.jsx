import { useState } from 'react';
import './App.css'
import Dropdown from './component/Dropdown'

function App() {
  const [value, setValue] = useState([]);
  const cities = ['New York', 'San Francisco', 'San Diego', "Seattle", "Los Angeles", "Boston", "Atlanta", "Portland", "Phoenix", "Miami"];
  const age = [...Array(101).keys()];
  
  return (
    <div className='home'>
      <div className='dropdowns'>
        <div>
          <label> Multi-Select (Cities): </label> <br/>
          <Dropdown options={cities} multi isSearch values={["New York", "Boston"]} placeholder={"Select Option(s)"} onChange={(value) => setValue(value)}/><br/>
          Selcted Values: {value.join(', ')}
        </div>
        <div>
          <label> Single-Select (Age): </label> <br/>
          <Dropdown options={age} isSearch/>
        </div>
        
      </div>
    </div>
  )
}

export default App
