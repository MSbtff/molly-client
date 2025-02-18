'use client';

import {useState} from 'react';

export default function useImageAdd({id}: {id: string}) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <input type="file" name="image" />
    </div>
  );
}
