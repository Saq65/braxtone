'use client';

import React, { useState } from 'react';
import Packages, { PackageType } from '@/components/packages/Packages';  // Import Packages component
import Addons from '@/app/Addons/page';  // Import Addons component

const ParentComponent = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  // This function will handle the package selection
  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg);
  };

  return (
    <div>
      {/* Packages selection component */}
      <Packages onSelect={handlePackageSelect} />

      {/* Conditionally render Addons component if a package is selected */}
      {selectedPackage && (
        <Addons
          selectedPackageName={selectedPackage.packageName} // Pass the selected package name
          addons={selectedPackage.benefits} // Pass the benefits (addons) from the selected package
        />
      )}
    </div>
  );
};

export default ParentComponent;
