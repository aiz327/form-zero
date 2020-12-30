

const em = (str) => `<span className="hight">${str}</span>`;

export const highlight = ( text = "",keyWord = "",) => {
  const keyWordList = keyWord.split(' ');
  return  text.replace(new RegExp(keyWordList.join('|'), 'g'), em);
};
