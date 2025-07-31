import { useState } from "react";

const templates = [
  { id: 1, color: "#fbbf24" },
  { id: 2, color: "#60a5fa" },
  { id: 3, color: "#34d399" },
  { id: 4, color: "#f472b6" },
];

export default function TemplatesTool() {
  const [selected, setSelected] = useState(templates[0].id);
  return (
    <div>
      <label className="block mb-2 font-medium">Choose a template</label>
      <div className="flex gap-4">
        {templates.map(t => (
          <button
            key={t.id}
            className={`w-12 h-12 rounded-lg border-2 ${selected === t.id ? 'border-primary' : 'border-gray-300'}`}
            style={{ background: t.color }}
            onClick={() => setSelected(t.id)}
          />
        ))}
      </div>
      <div className="mt-4">Selected color: <span style={{ color: templates.find(t => t.id === selected)?.color }}>{templates.find(t => t.id === selected)?.color}</span></div>
    </div>
  );
} 