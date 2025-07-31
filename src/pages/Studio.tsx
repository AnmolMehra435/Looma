import { useState, useEffect, useRef } from "react";
import { 
  Type, 
  Image, 
  Shapes, 
  Sparkles, 
  Users, 
  Undo, 
  Redo, 
  FileText,
  Palette,
  RotateCcw,
  RotateCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import TemplatesTool from "@/components/TemplatesTool";
import ImagesTool from "@/components/ImagesTool";
import IllustrationsTool from "@/components/IllustrationsTool";
import DesignCanvas, { CanvasElement } from "@/components/DesignCanvas";

const toolbarItems = [
  { id: "text", icon: Type, label: "Text Tool", type: "icon" as const },
  { id: "template", icon: FileText, label: "Templates", type: "icon" as const },
  { id: "illustration", icon: Shapes, label: "Illustrations", type: "icon" as const },
  { id: "image", icon: Image, label: "Images", type: "icon" as const },
  { id: "ai", icon: Sparkles, label: "AI Assistant", type: "icon" as const },
  { id: "refer", icon: Users, label: "Refer Friends", type: "icon" as const },
];

export default function Studio() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [background, setBackground] = useState("#f3f4f6");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { toast } = useToast();
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId && elements.find(el => el.id === selectedId && el.type === "text")) {
      controlsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast({
        title: "Undone",
        description: "Last action has been undone",
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast({
        title: "Redone",
        description: "Action has been redone",
      });
    }
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast({
      title: `${toolbarItems.find(t => t.id === toolId)?.label} Selected`,
      description: "Tool is now active",
    });
  };

  // Tool handlers
  const handleAddText = (text: string) => {
    setElements([
      ...elements,
      { id: Date.now() + "", type: "text", text, x: 80, y: 80, fontSize: 32, fill: "#000000" }
    ]);
  };
  const handleAddImage = (url: string) => {
    setElements([...elements, { id: Date.now() + "", type: "image", url, x: 60, y: 60, width: 120, height: 120 }]);
  };
  const handleAddShape = (shape: string) => {
    setElements([...elements, { id: Date.now() + "", type: "shape", shape, x: 100, y: 100, width: 60, height: 40, fill: color }]);
  };

  // Add font families
  const fontFamilies = [
    "Arial", "Roboto", "Georgia", "Comic Sans MS", "Impact", "Times New Roman", "Courier New"
  ];

  // Update selected text element
  const updateSelectedText = (updates: Partial<{ fontSize: number; fill: string; fontFamily: string }>) => {
    if (!selectedId) return;
    setElements(elements => elements.map(el => {
      if (el.id === selectedId && el.type === "text") {
        return { ...el, ...updates };
      }
      return el;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex flex-col md:flex-row h-screen">
        {/* Left Toolbar */}
        <div className="hidden md:flex w-20 bg-card border-r border-border shadow-creative flex-col items-center py-6 gap-4">
          {toolbarItems.map((tool) => (
            <div key={tool.id} className="relative group">
              <Button
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="icon"
                className={`w-12 h-12 rounded-xl transition-smooth hover-lift ${selectedTool === tool.id ? "gradient-primary text-primary-foreground shadow-glow" : "hover:bg-primary/10"}`}
                onClick={() => setSelectedTool(tool.id)}
              >
                {tool.icon && typeof tool.icon !== 'string' && (
                  <tool.icon className="h-6 w-6" />
                )}
              </Button>
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-50">
                {tool.label}
              </div>
            </div>
          ))}
        </div>
        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col pb-20 md:pb-16 items-center justify-center">
          <DesignCanvas
            elements={elements}
            setElements={setElements}
            background={background}
            setBackground={setBackground}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAddText={handleAddText}
            onAddImage={handleAddImage}
            onAddShape={handleAddShape}
            color={color}
            setColor={setColor}
          />
          {/* Tool controls below canvas */}
          <div className="mt-4 w-full max-w-md">
            {selectedTool === "text" && (
              <div>
                <label className="block mb-2 font-medium">Text</label>
                <input
                  className="border rounded px-2 py-1 mb-2 w-full text-black"
                  type="text"
                  placeholder="Enter your text"
                  style={{ color: "#000" }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleAddText(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <div className="text-xs text-muted-foreground">Press Enter to add to canvas</div>
              </div>
            )}

            {/* Controls for selected text, always visible when a text element is selected */}
            {selectedId && elements.find(el => el.id === selectedId && el.type === "text") && (
              <div ref={controlsRef} className="mt-4 p-4 border-2 border-primary rounded-lg bg-card shadow-lg">
                <div className="font-semibold mb-2 text-primary">Edit Selected Text</div>
                <div className="mb-2">
                  <label className="block text-xs mb-1">Font Size</label>
                  <input
                    type="range"
                    min={12}
                    max={96}
                    value={(() => {
                      const el = elements.find(el => el.id === selectedId && el.type === "text");
                      return el && el.type === "text" ? el.fontSize : 32;
                    })()}
                    onChange={e => updateSelectedText({ fontSize: Number(e.target.value) })}
                  />
                  <span className="ml-2 text-xs">
                    {(() => {
                      const el = elements.find(el => el.id === selectedId && el.type === "text");
                      return el && el.type === "text" ? el.fontSize : 32;
                    })()}
                  </span>
                </div>
                <div className="mb-2">
                  <label className="block text-xs mb-1">Font Family</label>
                  <select
                    className="border rounded px-1 py-0.5"
                    value={(() => {
                      const el = elements.find(el => el.id === selectedId && el.type === "text");
                      return el && el.type === "text" ? el.fontFamily || fontFamilies[0] : fontFamilies[0];
                    })()}
                    onChange={e => updateSelectedText({ fontFamily: e.target.value })}
                  >
                    {fontFamilies.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-xs mb-1">Color</label>
                  <div className="flex gap-1 flex-wrap">
                    {["#000000", "#ffffff", "#fbbf24", "#60a5fa", "#34d399", "#f472b6", "#e11d48", "#6366f1", "#f59e42", "#10b981"].map(c => (
                      <button
                        key={c}
                        className="w-5 h-5 rounded-full border-2 border-gray-300"
                        style={{ background: c, outline: (() => {
                          const el = elements.find(el => el.id === selectedId && el.type === "text");
                          return el && el.type === "text" && el.fill === c ? "2px solid #333" : undefined;
                        })() }}
                        onClick={() => updateSelectedText({ fill: c })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {selectedTool === "template" && (
              <div>
                <label className="block mb-2 font-medium">Choose a background color</label>
                <div className="flex gap-2">
                  {["#fbbf24", "#60a5fa", "#34d399", "#f472b6", "#e11d48", "#6366f1", "#f59e42", "#10b981", "#fff", "#000"].map(c => (
                    <button
                      key={c}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ background: c, outline: background === c ? "2px solid #333" : undefined }}
                      onClick={() => setBackground(c)}
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedTool === "image" && (
              <div>
                <label className="block mb-2 font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => handleAddImage(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="text-xs text-muted-foreground mt-1">Image will be added to canvas</div>
              </div>
            )}
            {selectedTool === "illustration" && (
              <div>
                <label className="block mb-2 font-medium">Add a shape</label>
                <div className="flex gap-2 flex-wrap">
                  {["rect", "circle", "ellipse", "triangle", "star", "line", "arrow", "pentagon", "hexagon", "heart"].map(shape => (
                    <button
                      key={shape}
                      className="px-2 py-1 border rounded text-xs"
                      onClick={() => handleAddShape(shape)}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Shape will be added to canvas. Select and use color palette to change color.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Toolbar - Bottom on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-creative">
        <div className="flex items-center justify-center px-2 py-4 gap-2 overflow-x-auto">
          {toolbarItems.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className={`shrink-0 h-10 transition-smooth hover-lift ${
                selectedTool === tool.id 
                  ? "gradient-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-primary/10"
              }`}
              onClick={() => handleToolSelect(tool.id)}
            >
              {tool.icon && typeof tool.icon !== 'string' && (
                <tool.icon className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Control Bar - Desktop */}
      <div className="hidden md:block fixed bottom-0 left-20 right-0 h-16 bg-card/95 backdrop-blur-sm border-t border-border shadow-creative">
        <div className="flex items-center justify-center h-full gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="hover-lift"
          >
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          
          <div className="h-6 w-px bg-border"></div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="hover-lift"
          >
            <Redo className="h-4 w-4 mr-2" />
            Redo
          </Button>

          <div className="flex items-center gap-2 ml-8">
            <Button variant="ghost" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}