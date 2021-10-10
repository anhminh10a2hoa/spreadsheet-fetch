export const getColumnName: (index: number) => string = (index) => {
  let subIndex: string = ''
  let i: number = index
  if(index > 26) {
    i = index % 26;
    subIndex = Math.floor(index / 26).toString();
  }
  return String.fromCharCode("A".charCodeAt(0) + i - 1) + subIndex;
}

export const getColumnIndex: (character: string) => number = (character) => {
  return character.charCodeAt(0)
}