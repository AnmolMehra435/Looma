import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from "react-konva";

// Helper to load image from URL
function useImage(url: string | null) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  React.useEffect(() => {
    if (!url) return;
    const image = new window.Image();
    image.src = url;
    image.onload = () => setImg(image);
  }, [url]);
  return img;
}

const defaultShapes = [
  { type: "rect", width: 60, height: 40 },
  { type: "circle", radius: 30 },
  { type: "ellipse", radiusX: 40, radiusY: 20 },
  { type: "triangle" },
  { type: "star" },
  { type: "line" },
  { type: "arrow" },
  { type: "pentagon" },
  { type: "hexagon" },
  { type: "heart" },
];

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 400;

export type CanvasElement =
  | { id: string; type: "text"; text: string; x: number; y: number; fontSize: number; fill: string; fontFamily?: string }
  | { id: string; type: "image"; url: string; x: number; y: number; width: number; height: number }
  | { id: string; type: "shape"; shape: string; x: number; y: number; width?: number; height?: number; radius?: number; fill: string };

export default function DesignCanvas({
  elements,
  setElements,
  background,
  setBackground,
  selectedId,
  setSelectedId,
  onAddText,
  onAddImage,
  onAddShape,
  color,
  setColor,
}: {
  elements: CanvasElement[];
  setElements: (els: CanvasElement[]) => void;
  background: string;
  setBackground: (c: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onAddText: (text: string) => void;
  onAddImage: (url: string) => void;
  onAddShape: (shape: string) => void;
  color: string;
  setColor: (c: string) => void;
}) {
  // Drag/resize logic would go here (for brevity, only drag for now)
  return (
    <div>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px #0002" }}
        onMouseDown={e => {
          // Only clear selection if clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) setSelectedId(null);
        }}
      >
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill={background} />
          {/* Elements */}
          {elements.map((el, i) => {
            if (el.type === "text") {
              return (
                <Text
                  key={el.id}
                  text={el.text}
                  x={el.x}
                  y={el.y}
                  fontSize={el.fontSize}
                  fill={el.fill}
                  fontFamily={el.fontFamily || "Arial"}
                  draggable
                  onClick={e => {
                    e.cancelBubble = true;
                    setSelectedId(el.id);
                  }}
                  onDragEnd={e => {
                    const newEls = [...elements];
                    newEls[i] = { ...el, x: e.target.x(), y: e.target.y() };
                    setElements(newEls);
                  }}
                  stroke={selectedId === el.id ? "#333" : undefined}
                  strokeWidth={selectedId === el.id ? 1 : 0}
                />
              );
            }
            if (el.type === "image") {
              const img = useImage(el.url);
              return (
                <KonvaImage
                  key={el.id}
                  image={img}
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  draggable
                  onClick={() => setSelectedId(el.id)}
                  onDragEnd={e => {
                    const newEls = [...elements];
                    newEls[i] = { ...el, x: e.target.x(), y: e.target.y() };
                    setElements(newEls);
                  }}
                  stroke={selectedId === el.id ? "#333" : undefined}
                  strokeWidth={selectedId === el.id ? 2 : 0}
                />
              );
            }
            if (el.type === "shape") {
              // Only a few shapes for now, can expand
              if (el.shape === "rect") {
                return (
                  <Rect
                    key={el.id}
                    x={el.x}
                    y={el.y}
                    width={el.width || 60}
                    height={el.height || 40}
                    fill={el.fill}
                    draggable
                    onClick={() => setSelectedId(el.id)}
                    onDragEnd={e => {
                      const newEls = [...elements];
                      newEls[i] = { ...el, x: e.target.x(), y: e.target.y() };
                      setElements(newEls);
                    }}
                    stroke={selectedId === el.id ? "#333" : undefined}
                    strokeWidth={selectedId === el.id ? 2 : 0}
                  />
                );
              }
              if (el.shape === "circle") {
                return (
                  <Group key={el.id} onClick={() => setSelectedId(el.id)}>
                    <Rect
                      x={el.x}
                      y={el.y}
                      width={(el.radius || 30) * 2}
                      height={(el.radius || 30) * 2}
                      fill={"transparent"}
                    />
                    <KonvaImage
                      image={undefined}
                      x={el.x}
                      y={el.y}
                    />
                  </Group>
                );
              }
              // Add more shapes here...
            }
            return null;
          })}
        </Layer>
      </Stage>
      {/* Color palette */}
      <div className="flex gap-2 mt-2">
        {["#000000", "#ffffff", "#fbbf24", "#60a5fa", "#34d399", "#f472b6", "#e11d48", "#6366f1", "#f59e42", "#10b981"].map(c => (
          <button
            key={c}
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ background: c, outline: color === c ? "2px solid #333" : undefined }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </div>
  );
} 