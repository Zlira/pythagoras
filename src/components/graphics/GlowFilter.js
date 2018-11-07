import React from 'react'


function GlowFilter({ color='#161b26', stdDeviation=3, filterId }) {
    return (
        <filter id={filterId} filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation={stdDeviation} result="blur"/>
          <feFlood floodColor={color} />
          <feComposite in2="blur" operator="in" />
          <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
    )
}

export default GlowFilter