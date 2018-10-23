import React from 'react'


function GlowFilter({ color='grey', stdDeviation=3, filterId }) {
    return (
        <filter id={filterId} filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation={stdDeviation} result="blur"/>
          <feFlood flood-color={color} />
          <feComposite in2="blur" operator="in" />
          <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
    )
}

export default GlowFilter