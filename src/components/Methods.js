import React from 'react'

import { Button } from 'react-bootstrap'

class Methods extends React.PureComponent {
  render() {
    const { methods, handleClick } = this.props
    if (!methods) return <div />

    const statistics = methods.algorithms.filter(a =>
      a.type.includes('statistics')
    )

    const extraction = methods.algorithms.filter(a =>
      a.type.includes('features_extraction')
    )
    const predictive = methods.algorithms.filter(a =>
      a.type.includes('predictive_model')
    )

    return (
      <React.Fragment>
        <h4>Statistics</h4>
        {statistics.map(method => (
          <Button
            onClick={ev => handleClick(method, ev)}
            key={method.code}
            bsSize="xsmall"
          >
            {method.label}
          </Button>
        ))}

        <h4>Extraction</h4>
        {extraction.map(method => (
          <Button
            onClick={ev => handleClick(method, ev)}
            key={method.code}
            bsSize="xsmall"
          >
            {method.label}
          </Button>
        ))}

        <h4>Predictive</h4>
        {predictive.map(method => (
          <Button
            onClick={ev => handleClick(method, ev)}
            key={method.code}
            bsSize="xsmall"
          >
            {method.label}
          </Button>
        ))}
      </React.Fragment>
    )
  }
}

export default Methods
