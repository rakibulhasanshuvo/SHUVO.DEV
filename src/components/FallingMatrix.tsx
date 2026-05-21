import React from 'react';
import styles from './FallingMatrix.module.css';

const FallingMatrix = () => {
  // Generate 40 columns per pattern group, repeated for 5 groups
  const columnCount = 40;
  const groupCount = 5;

  return (
    <div className={styles.matrixContainer}>
      {Array.from({ length: groupCount }).map((_, gIndex) => (
        <div className={styles.matrixPattern} key={gIndex}>
          {Array.from({ length: columnCount }).map((_, cIndex) => (
            <div 
              className={styles.matrixColumn} 
              key={cIndex}
              style={{
                // Pass indices as CSS variables or just handle in CSS
                // But the original had hardcoded styles for 40 columns.
                // We can use data attributes or just rely on CSS nth-child as in the original!
                // The original had nth-child rules for all 40 columns.
                // So we don't need inline styles if we keep the CSS nth-child rules!
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default FallingMatrix;
