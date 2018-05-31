// @flow

// Code modified from https://github.com/chenglou/react-treeview
import React from 'react'
import { TreeViewProps } from '../../proptypes'

type Props = TreeViewType
type State = {
  collapsed?: boolean,
}

class TreeView extends React.PureComponent<Props, State> {
  constructor(props: TreeViewType) {
    super(props)

    this.state = {
      collapsed: props.defaultCollapsed,
    }
  }

  handleClick = (args: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ collapsed: !this.state.collapsed })
    if (this.props.onClick) {
      this.props.onClick(...args)
    }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      nodeLabel,
      children,
      defaultCollapsed,
      ...rest
    } = this.props

    let arrowClassName = 'tree-view_arrow'
    let containerClassName = 'tree-view_children'
    if (collapsed) {
      arrowClassName += ' tree-view_arrow-collapsed'
      containerClassName += ' tree-view_children-collapsed'
    }

    const arrow = (
      <div {...rest} className={arrowClassName} onClick={this.handleClick} />
    )

    return (
      <div className={'tree-view'}>
        <div className={'tree-view_item'}>
          {arrow}
          {nodeLabel}
        </div>
        <div className={containerClassName}>{collapsed ? null : children}</div>
      </div>
    )
  }
}

TreeView.propTypes = TreeViewProps

export default TreeView
