// src/__tests__/accordion.js
// query utilities:
import { queryAllByAttribute } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

function createDOM() {
  // Set up the initial DOM with custom vjs-accordion
  const head = document.querySelector('head');
  head.innerHTML = '<script src="../accordion.js"></script>';
  const main = document.createElement('main');
  main.innerHTML = `
    <vjs-accordion></vjs-accordion>
  `;
  const items = [
    {
      term: 'Term 1',
      description: 'Description 1',
    },
    {
      term: 'Term 2',
      description: 'Description 2',
    },
    {
      term: 'Term 3',
      description: 'Description 3',
    },
  ];
  document.body.appendChild(main);
  const accordion = document.querySelector('vjs-accordion');
  accordion.items = items;
  return main;
}

test('List items displayed', () => {
  const main = createDOM();
  const terms = queryAllByAttribute('data-term-id', main);
  terms.forEach((term, index) => {
    expect(term).toHaveTextContent(`Term ${index + 1}`);
  });
  const descriptions = queryAllByAttribute('data-description-id', main);
  descriptions.forEach((description, index) => {
    expect(description).toHaveTextContent(`Description ${index + 1}`);
  });
});
