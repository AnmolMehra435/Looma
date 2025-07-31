import { useState } from "react";

export default function LogoTool() {
  const [logoText, setLogoText] = useState("");
  return (
    <div>
      <label className="block mb-2 font-medium">Logo Text</label>
      <input
        className="border rounded px-2 py-1 mb-4 w-full"
        type="text"
        value={logoText}
        onChange={e => setLogoText(e.target.value)}
        placeholder="Enter your logo text"
      />
      <div className="mt-4">
        <span className="text-2xl font-bold">Preview: </span>
        <span className="text-2xl font-bold text-primary">{logoText}</span>
      </div>
    </div>
  );
} 