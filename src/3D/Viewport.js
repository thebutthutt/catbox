import React from "react";
import { mount } from "src/3D/ThreeScene.js";

export default function Viewport() {
  const containerRef = React.useCallback(mount, []);

  return <div className="viewport" ref={containerRef}></div>;
}
