// src/__tests__/example.js
// query utilities:
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

function createDOM() {
  // Set up the initial DOM with custom vjs-accordion
  const main = document.createElement('main');
  main.innerHTML = `
    <vjs-accordion></vjs-accordion>
  `;
  const items = [
    {
      term: 'Quiénes somos',
      description:
        'Adevinta es un especialista en marketplaces. Ayudamos a prosperar a nuestros marketplaces locales mediante conexiones globales y redes de conocimiento. ',
    },
    {
      term: 'Nuestra estrategia',
      description:
        'La misión de Adevinta es establecer conexiones perfectas en los marketplaces más fiables del mundo.',
    },
    {
      term: 'El Consejo de administración',
      description:
        'Conforme al derecho de sociedades, el Consejo de Administración es responsable de la gestión general de la empresa, mientras que el CEO es responsable de la gestión diaria.',
    },
  ];
  const accordion = document.querySelector('vjs-accordion');
  accordion.items = items;

  return main;
}

test('examples of some things', async () => {
  const famousWomanInHistory = 'Ada Lovelace';
  const container = createDOM();

  // Get form elements by their label text.
  // An error will be thrown if one cannot be found (accessibility FTW!)
  const input = getByLabelText(container, 'Username');
  input.value = famousWomanInHistory;

  // Get elements by their text, just like a real user does.
  getByText(container, 'Print Username').click();

  await wait(() =>
    expect(queryByTestId(container, 'printed-username')).toBeTruthy(),
  );

  // getByTestId and queryByTestId are an escape hatch to get elements
  // by a test id (could also attempt to get this element by its text)
  expect(getByTestId(container, 'printed-username')).toHaveTextContent(
    famousWomanInHistory,
  );
  // jest snapshots work great with regular DOM nodes!
  expect(container).toMatchSnapshot();
});
