import React from 'react';

const styleLoading = {
  background: '#e9e9e9',
  display: 'inherit',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.5,
  zIndex: 100000,
};

const Loading = () => {
  return (
    <div>

      <div style={styleLoading} />
    </div>
  );
};

export default Loading;
