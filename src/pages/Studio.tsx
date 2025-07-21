import { useState } from "react";
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

const toolbarItems = [
  { id: "logo", icon: "L", label: "Logo", type: "brand" as const },
  { id: "template", icon: FileText, label: "Templates", type: "icon" as const },
  { id: "text", icon: Type, label: "Text Tool", type: "icon" as const },
  { id: "illustration", icon: Shapes, label: "Illustrations", type: "icon" as const },
  { id: "image", icon: Image, label: "Images", type: "icon" as const },
  { id: "ai", icon: Sparkles, label: "AI Assistant", type: "icon" as const },
  { id: "refer", icon: Users, label: "Refer Friends", type: "icon" as const },
];

export default function Studio() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex flex-col md:flex-row h-screen">
        {/* Left Toolbar - Hidden on mobile, shown at bottom */}
        <div className="hidden md:flex w-20 bg-card border-r border-border shadow-creative flex-col items-center py-6 gap-4">
          {toolbarItems.map((tool) => (
            <div
              key={tool.id}
              className="relative group"
            >
              <Button
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="icon"
                className={`w-12 h-12 rounded-xl transition-smooth hover-lift ${
                  selectedTool === tool.id 
                    ? "gradient-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => handleToolSelect(tool.id)}
              >
                {tool.type === "brand" ? (
                  <span className="text-xl font-bold">{tool.icon as string}</span>
                ) : (
                  <>
                    {tool.icon && typeof tool.icon !== 'string' && (
                      <tool.icon className="h-6 w-6" />
                    )}
                  </>
                )}
              </Button>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-50">
                {tool.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col pb-20 md:pb-16">
          {/* Canvas Header */}
          <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="default" size="sm" className="gradient-primary">
                Save
              </Button>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Palette className="h-4 w-4 mr-2" />
                Color Palette
              </Button>
              <Button variant="outline" size="sm">
                <span className="hidden sm:inline">Export</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative bg-gradient-to-br from-muted/20 to-secondary/20 overflow-hidden">
            {/* 3D T-Shirt Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* T-Shirt SVG Placeholder */}
                <div className="w-80 h-96 bg-card rounded-2xl shadow-creative hover-glow transition-smooth p-8 flex items-center justify-center border">
                  <div className="text-center">
                    <div className="w-48 h-56 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                      <Shapes className="h-24 w-24 text-primary/50" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">3D T-Shirt Canvas</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a tool from the left to start designing
                    </p>
                  </div>
                </div>

                {/* Floating design elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/30 rounded-full animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>

            {/* Design overlay when tool is selected */}
            {selectedTool && (
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-creative">
                <h4 className="font-semibold mb-2">
                  {toolbarItems.find(t => t.id === selectedTool)?.label}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Tool controls and options will appear here
                </p>
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
              {tool.type === "brand" ? (
                <span className="text-sm font-bold">{tool.icon as string}</span>
              ) : (
                <>
                  {tool.icon && typeof tool.icon !== 'string' && (
                    <tool.icon className="h-4 w-4" />
                  )}
                </>
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