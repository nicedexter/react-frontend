// @flow

// Code modified from https://github.com/chenglou/react-treeview
import React from 'react'
import { TreeViewProps } from '../proptypes'
import './TreeView.css'

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

  handleCollapseClick = (args: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ collapsed: !this.state.collapsed })
    // if (this.props.onClick) {
    //   this.props.onClick(...args)
    // }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      nodeTitle,
      nodeDescription,
      nodeIcon,
      nodeActions,
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
      <div
        {...rest}
        className={arrowClassName}
        onClick={this.handleCollapseClick}
      />
    )

    const title = (
      <span className="title" onClick={this.handleCollapseClick}>
        {nodeTitle}
      </span>
    )

    return (
      <div className={'tree-view'}>
        <div className={'tree-view_item'}>
          {arrow}
          {nodeIcon} {title} 
          <p className="description">
            {nodeDescription} 
          </p>
          {nodeActions}
        </div>
        <div className={containerClassName}>{collapsed ? null : children}</div>
      </div>
    )
  }
}

TreeView.propTypes = TreeViewProps

export default TreeView
