import React from 'react';
import MultiOption from '../ui/MultiOption';
import { finance } from '@/data/multiOptionsData'; // Make sure the import path is correct

function FinanceType() {
  return (
    <div className="App">
      {/* Passing the finance data to MultiOption component */}
      <MultiOption data={finance} />
    </div>
  );
}

export default FinanceType;
