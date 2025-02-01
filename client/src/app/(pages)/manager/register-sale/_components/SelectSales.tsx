'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CompleteSaleLater = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleCheckedChange = (value: boolean | 'indeterminate') => {
    if (typeof value === 'boolean') {
      setChecked(value);
    }
  };

  return (
    <div className='flex items-center justify-start gap-3 space-x-2 rounded'>
      <Checkbox
        id='complete-later'
        checked={checked}
        onCheckedChange={handleCheckedChange}
        className='border-[0.5px] border-muted-foreground data-[state=checked]:bg-muted-foreground data-[state=checked]:text-card'
      />
      <Label
        htmlFor='complete-later'
        className='cursor-pointer text-[12px] font-normal caret-card-foreground'
      >
        Gostaria de concluir esta venda depois?
      </Label>
    </div>
  );
};
export default CompleteSaleLater;
