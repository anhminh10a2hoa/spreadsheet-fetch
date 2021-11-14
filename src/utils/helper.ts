import React from 'react';

export const getColumnName: (index: number) => string = (index) => {
  let column = '';
  let i = 0;
  while(i < index) {
    if(index - i > 25) {
      column += 'A'
      i += 25
    } else {
      if(String.fromCharCode('A'.charCodeAt(0) + index % 25 - 1) === '@') {
        column += 'Y'
      } else {
        column += String.fromCharCode('A'.charCodeAt(0) + index % 25 - 1)
      }
      i = index
    }
  }
  return column
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
