const GridItem = (props) => {
  const { className, title, controls, children, footer } = props;
  return (
      <div className={"burst-grid-item " + className}>
        <div className="burst-grid-item-header">
          <h3 className="burst-grid-title burst-h4">{title}</h3>
          <div className="burst-grid-item-controls">
            {controls}
          </div>
        </div>
        <div className="burst-grid-item-content">
          {children}
        </div>
        <div className="burst-grid-item-footer">
          {footer}
        </div>
      </div>
  )
}

export default GridItem;