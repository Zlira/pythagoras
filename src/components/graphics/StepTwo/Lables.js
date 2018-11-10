import React from 'react'
// todo state is local to the left side of this step
// so I should really use local state instead of global
import { connect } from 'react-redux'

import colors from '../colors'


const pxPerUnit = 40
const signDigits = 2

function sumOfSquares(a, b) {
    return a ** 2 + b ** 2
}

function HypothenuseLabel({triangleWidth, triangleHeight}) {
    const hypothenuseLen = Math.sqrt(
        sumOfSquares(triangleHeight, triangleWidth)
    )
    // todo check if the rounding agrees with the cathetus label
    return (
      <span>
        <span style={{color: colors.red}} className="triangle-side">
          {hypothenuseLen.toFixed(signDigits)}
        </span><sup>2</sup> =
        {' ' + (hypothenuseLen ** 2).toFixed(signDigits)}
      </span>
    )
}


function CathetiLabel({triangleWidth, triangleHeight}) {
    const sumOSqrs = sumOfSquares(triangleHeight, triangleWidth).toFixed(signDigits)
    return (
      <span>
        <span style={{color: colors.green}} className="triangle-side">
          {triangleHeight}
        </span><sup>2</sup> +
        <span style={{color: colors.yellow}} className="triangle-side">
          {' ' + triangleWidth}
        </span><sup>2</sup> =
        {' ' + sumOSqrs}
      </span>
    )
}

function mapStateToProps(state) {
    return {
        triangleHeight: (state.triangleHeight / pxPerUnit).toFixed(signDigits),
        triangleWidth: (state.triangleWidth / pxPerUnit).toFixed(signDigits),
    }
}

export const Hypothenuse = connect(
    mapStateToProps
)(HypothenuseLabel)

export const Catheti = connect(
    mapStateToProps
)(CathetiLabel)