import React from '@wordpress/element';
import * as TooltipUI from '@radix-ui/react-tooltip';

const Tooltip = ({
  children,
  content
}) => {
  if ( ! content ) {
    return <>{children}</>;
  }
  return (
      <TooltipUI.Provider>
        <TooltipUI.Root delayDuration={400} >
          <TooltipUI.Trigger asChild>
            {children}
          </TooltipUI.Trigger>
          <TooltipUI.Portal>
            <TooltipUI.Content className="burst-tooltip-content" sideOffset={5}>
              {content}
              <TooltipUI.Arrow className="burst-tooltip-arrow" />
            </TooltipUI.Content>
          </TooltipUI.Portal>
        </TooltipUI.Root>
      </TooltipUI.Provider>
  );
};

export default Tooltip;
