# Dropdown Component 
## Installation
After cloning or downloading the repository, run the following to initialize: 
```
npm install 
```

## Usage

import: 
```
import Dropdown from './component/Dropdown'
```

```
const cities = ['New York', 'San Francisco', 'San Diego', "Seattle", 
"Los Angeles", "Boston", "Atlanta", "Portland", "Phoenix", "Miami"];

<Dropdown options={cities}/>
```

If you need callback for the value and custom placeholder call onChange and placeholder in the props: 
```
const cities = ['New York', 'San Francisco', 'San Diego', "Seattle", 
"Los Angeles", "Boston", "Atlanta", "Portland", "Phoenix", "Miami"];

<Dropdown options={cities} multi isSearch placeholder={"Select Option(s)"} onChange={(value) => this.setValue(value)}/>
```
> `options` is minimum requirement 

## API 
| Props   | Type | Default | Description
| -------- | ------- | -------- | ------- |
| options  | array    | [] | Available options
| placeholder | string | "Select..." | Placeholder when no value selected
| multi | bool | false | "Allow multiple selections"
| isSearch | bool | false | "Search bar to filter options"
| onChange | func | | On value change callback, return array of values as String array
