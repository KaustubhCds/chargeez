import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PortalPopup.css";

const PortalPopup = ({
  children,
  overlayColor,
  placement = "Centered",
  onOutsideClick,
  zIndex = 100,
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  relativeLayerRef,
}) => {
  const relContainerRef = useRef(null);
  const [relativeStyle, setRelativeStyle] = useState({
    opacity: 0,
  });

  const popupStyle = useMemo(() => {
    const style = { zIndex };

    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }

    if (!relativeLayerRef?.current) {
      switch (placement) {
        case "Centered":
          style.display = "flex";
          style.alignItems = "center";
          style.justifyContent = "center";
          break;
        case "Top left":
          style.display = "flex";
          style.alignItems = "flex-start";
          break;
        case "Top center":
          style.display = "flex";
          style.alignItems = "center";
          break;
        case "Top right":
          style.display = "flex";
          style.alignItems = "flex-end";
          break;
        case "Bottom left":
          style.display = "flex";
          style.alignItems = "flex-start";
          style.justifyContent = "flex-end";
          break;
        case "Bottom center":
          style.display = "flex";
          style.alignItems = "center";
          style.justifyContent = "flex-end";
          break;
        case "Bottom right":
          style.display = "flex";
          style.alignItems = "flex-end";
          style.justifyContent = "flex-end";
          break;
        default:
          break;
      }
    }

    return style;
  }, [placement, overlayColor, zIndex, relativeLayerRef]);

  const setPosition = useCallback(() => {
    if (relativeLayerRef?.current && relContainerRef?.current) {
      const relativeItem = relativeLayerRef.current.getBoundingClientRect();
      const containerItem = relContainerRef.current.getBoundingClientRect();
      const style = { opacity: 1, position: "absolute" };

      const { x: relativeX, y: relativeY, width: relativeW, height: relativeH } = relativeItem;
      const { width: containerW, height: containerH } = containerItem;

      switch (placement) {
        case "Top left":
          style.top = relativeY - containerH - top;
          style.left = relativeX + left;
          break;
        case "Top right":
          style.top = relativeY - containerH - top;
          style.left = relativeX + relativeW - containerW - right;
          break;
        case "Bottom left":
          style.top = relativeY + relativeH + bottom;
          style.left = relativeX + left;
          break;
        case "Bottom right":
          style.top = relativeY + relativeH + bottom;
          style.left = relativeX + relativeW - containerW - right;
          break;
        default:
          break;
      }

      setRelativeStyle(style);
    } else {
      setRelativeStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 1,
        maxWidth: "90%",
        maxHeight: "90%",
      }));
    }
  }, [left, right, top, bottom, placement, relativeLayerRef]);

  useEffect(() => {
    setPosition();

    window.addEventListener("resize", setPosition);
    window.addEventListener("scroll", setPosition, true);

    return () => {
      window.removeEventListener("resize", setPosition);
      window.removeEventListener("scroll", setPosition, true);
    };
  }, [setPosition]);

  const onOverlayClick = useCallback(
    (e) => {
      if (onOutsideClick && e.target.classList.contains("portalPopupOverlay")) {
        onOutsideClick();
      }
      e.stopPropagation();
    },
    [onOutsideClick]
  );

  return (
    <Portal>
      <div
        className="portalPopupOverlay"
        style={popupStyle}
        onClick={onOverlayClick}
      >
        <div ref={relContainerRef} style={relativeStyle}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export const Portal = ({ children, containerId = "portals" }) => {
  let portalsDiv = document.getElementById(containerId);
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", containerId);
    document.body.appendChild(portalsDiv);
  }

  return createPortal(children, portalsDiv);
};

export default PortalPopup;
