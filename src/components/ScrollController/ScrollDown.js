import React from 'react'


export default function ScrollDown({allowed}) {
  const text = allowed
    ? "скроль донизу"
    : "розв'яжи завдання, щоб перейти до наступного кроку"
  return (
    <div className="scroller-indicator">
      <ScrollIcon allowed={allowed} />
      <span>{text}</span>
    </div>
  )
}

function DownArrown({height, translate, rotate=0}) {
  const points = [
    [0, 0], [height, height], [height * 2, 0]
  ]
  const poinstStr = points.map(el => `${el[0]}, ${el[1]}`).join(' ')
  return <polyline
           points={poinstStr}
           transform={
            `translate(${translate.x}, ${translate.y}) ` +
            `rotate(${rotate}, ${height}, ${height/2})`
          }/>
}


function ScrollIcon({allowed}) {
  const width = 20,
    arrowHeight = 7,
    arrowPadLeft = width/2 - arrowHeight,
    rotateLowerArrow = allowed? 0 : 180
  return (
    <svg width={width} height="40px">
      <rect x="4" y="2" width="12" height="17" rx="6" ry="6" />
      <circle cx={width/2} cy="8" r="3" />
      <g className="down-arrows"
        transform={`translate(${arrowPadLeft}, 22)`}
      >
        <DownArrown height={arrowHeight} translate={{x: 0, y: 0}}/>
        <DownArrown height={arrowHeight}
          translate={{x: 0, y: arrowHeight}} rotate={rotateLowerArrow}
        />
      </g>
   </svg>)
}