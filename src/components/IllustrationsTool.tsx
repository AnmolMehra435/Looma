import { useState } from "react";

const illustrations = [
  { id: 1, svg: <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#60a5fa" /></svg> },
  { id: 2, svg: <svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" fill="#fbbf24" /></svg> },
  { id: 3, svg: <svg width="48" height="48" viewBox="0 0 48 48"><polygon points="24,8 40,40 8,40" fill="#34d399" /></svg> },
];

export default function IllustrationsTool() {
  const [selected, setSelected] = useState(illustrations[0].id);
  return (
    <div>
      <label className="block mb-2 font-medium">Choose an illustration</label>
      <div className="flex gap-4">
        {illustrations.map(i => (
          <button
            key={i.id}
            className={`p-2 rounded-lg border-2 ${selected === i.id ? 'border-primary' : 'border-gray-300'}`}
            onClick={() => setSelected(i.id)}
          >
            {i.svg}
          </button>
        ))}
      </div>
      <div className="mt-4">Selected:</div>
      <div>{illustrations.find(i => i.id === selected)?.svg}</div>
    </div>
  );
} 