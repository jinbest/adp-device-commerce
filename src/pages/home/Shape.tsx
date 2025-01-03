import React from 'react'

/* eslint-disable */
type Props = {
  subDomain?: string;
}

const Shape = ({subDomain}: Props) => {
  const data = require(`../../assets/${subDomain}/Database`);
  return (
    <div>
      <div className='corner-shape' style={{width: data.shapeData.cornerShape.width}}>
        <img src={data.shapeData.cornerShape.img} />
      </div>
      <div className='mockup-shape'>
        {data.shapeData.mockupShape && <img src={data.shapeData.mockupShape.img} />}
      </div>
    </div>
  )
}

export default Shape
