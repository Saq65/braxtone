'use client';

import { useState } from 'react';
import { Drawer } from 'antd';
import CarStepForm from '../cars/CarStepForm';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

type Props = {
  onComplete: (car: { [key: string]: string }) => void;
};

export default function CarstepMob({ onComplete }: Props) {
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  if (!isMobile) return null;

  return (
    <div className='block lg:hidden'>
      <button
        onClick={() => setOpen(true)}
        className="ml-0 border border-dashed p-6 rounded text-center text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer w-full"
      >
        + Add info
      </button>

      <Drawer
        placement="bottom"
        closable={false}
        open={open && isMobile}
        height="98.6%"
        style={{
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          width: 'calc(100% - 2px)',
          margin: '0 auto',
        }}
        styles={{ body: { padding: 0 } }}


      >
        <CarStepForm
          onCancel={() => setOpen(false)}
          onComplete={(car) => {
            onComplete(car);
            setOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
}
