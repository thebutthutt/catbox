import React from "react";
import { mount, togglePerspectiveOrtho } from "src/3D/ThreeScene.js";

export default function Viewport() {
  const containerRef = React.useCallback(mount, []);

  return (
    <>
      <button
        onClick={() => {
          togglePerspectiveOrtho();
        }}
      >
        persp/ortho
      </button>
      <div className="viewport" ref={containerRef}></div>
    </>
  );
}
