import { useState } from "react";

export default function ImagesTool() {
  const [image, setImage] = useState<string | null>(null);
  return (
    <div>
      <label className="block mb-2 font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = ev => setImage(ev.target?.result as string);
            reader.readAsDataURL(file);
          }
        }}
      />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-xs max-h-64 rounded shadow" />
        </div>
      )}
    </div>
  );
} 