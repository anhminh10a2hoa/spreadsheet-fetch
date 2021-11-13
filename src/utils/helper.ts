import React from 'react';

export const getColumnName: (index: number) => string = (index) => {
  let subIndex = '';
  let i: number = index;
  if (index > 26) {
    i = index % 26;
    subIndex = Math.floor(index / 26).toString();
  }
  if (i === 0 && parseInt(subIndex) > 0) {
    return 'Z' + (parseInt(subIndex) - 1).toString();
  }
  console.log(String.fromCharCode('A'.charCodeAt(0) + i - 1) + subIndex)
  return String.fromCharCode('A'.charCodeAt(0) + i - 1) + subIndex;
};

export const getColumnIndex = (character: string): number => {
  let subIndex = 0;
  if (character.length > 1) {
    subIndex = parseInt(character.substr(1, character.length - 1));
  }
  return character.charCodeAt(0) - 64 + subIndex * 26;
};

export const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
};
