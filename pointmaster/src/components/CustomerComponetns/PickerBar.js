import {DatePicker, Select, InputNumber} from 'antd';

const {RangePicker} = DatePicker;
const {Option} = Select;

const PickerBar = () => {

    const names = [
        {
            id: 1,
            name: "Jack",
        },
        {
            id: 2,
            name: "John",
        },
        {
            id: 3,
            name: "Jane",
        },
    ];
    
return (

<div style={pickerBarStyle}>
<Select
  showSearch
  style={{
    width: 200,
  }}
>
    {names.map((customer) => (
        <Option key={customer.id} value={customer.name}>
            {customer.name}
        </Option>
    ))}
</Select>
<DatePicker />
<InputNumber placeholder='points' />
   
<RangePicker />
</div>
);


}

const pickerBarStyle = {
    postion: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    height : 10,
    backgroundColor : "white",
    
};

export default PickerBar;