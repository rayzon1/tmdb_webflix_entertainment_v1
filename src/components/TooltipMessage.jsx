import React from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

//TODO: CUSTOMIZE PROPS FOR SPECIFIC ERROR TOOLTIP.
export default function TooltipMessage({target, show, message}) {
    // const [show, setShow] = useState(false);
    // const target = useRef(null);
  
    return (
      <>
        <Overlay target={target.current} show={show} placement="right" >
          {props => (
            <Tooltip id="overlay-example" {...props} >
              <span style={{color: 'red'}}>{message}</span>
            </Tooltip>
          )}
        </Overlay>
      </>
    );
  }
  