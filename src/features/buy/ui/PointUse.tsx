'use client';

import {useState} from 'react';
import {CircleHelp} from 'lucide-react';

interface PointUseProps {
  userPoint: number;
  totalAmount: number;
  onPointChange: (usedPoint: number) => void;
  ready: boolean;
}

export function PointUse({
  userPoint,
  totalAmount,
  onPointChange,
  ready,
}: PointUseProps) {
  const [pointInput, setPointInput] = useState<string>('');
  const [isUsingPoint, setIsUsingPoint] = useState(false);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numberValue = Number(value);

    if (numberValue > userPoint) {
      setPointInput(userPoint.toString());
      onPointChange(userPoint);
      return;
    }

    if (numberValue > totalAmount) {
      setPointInput(totalAmount.toString());
      onPointChange(totalAmount);
      return;
    }

    setPointInput(value);
    onPointChange(numberValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUsingPoint(e.target.checked);
    if (!e.target.checked) {
      setPointInput('');
      onPointChange(0);
    }
  };

  return (
    <div className="mt-4 w-[700px] h-[145px] flex flex-col justify-between bg-white rounded-[10px] border p-4">
      <div>포인트</div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isUsingPoint}
          onChange={handleCheckboxChange}
          disabled={!ready || userPoint === 0}
        />
        <div className="w-[585px] h-9 border rounded-[10px] flex items-center px-2">
          <input
            type="text"
            value={pointInput}
            onChange={handlePointChange}
            disabled={!isUsingPoint || !ready}
            className="w-full outline-none"
            placeholder="0"
          />
          <span>P</span>
        </div>
      </div>
      <div className="flex items-center">
        <div>보유 포인트</div>
        <div className="ml-8 flex items-center">
          <CircleHelp size={20} color="#acacac" />
        </div>
        <div className="ml-2">{userPoint.toLocaleString()}P</div>
      </div>
    </div>
  );
}
