import React from 'react';
import { Cascader } from 'antd';

const AmountSpentThirdForm = ({ form }) => {
  const options = [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            { label: 'Toy Fish', value: 'fish' },
            { label: 'Toy Cards', value: 'cards' },
            { label: 'Toy Bird', value: 'bird' },
          ],
        },
      ],
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <Cascader
      style={{ width: '100%' }}
      options={options}
      onChange={onChange}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={Cascader.SHOW_CHILD}
      defaultValue={[
        ['bamboo', 'little', 'fish'],
        ['bamboo', 'little', 'cards'],
        ['bamboo', 'little', 'bird'],
      ]}
    />
  );
};

export default AmountSpentThirdForm;
