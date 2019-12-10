import styleText from './accordion.scss';

class Accordion extends HTMLElement {
  constructor() {
    super();
    this.items = '';
    this.selectedItem = '';
    this.itemsList = document.createElement('dl');
    this.itemsList.id = 'list';
    this.itemsList.classList.add('List');
    const style = document.createElement('style');
    style.innerHTML = styleText;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(this.itemsList);
    }
  }

  get items() {
    return this.getAttribute('items');
  }

  set items(value) {
    if (value) {
      this.selectedItem = '';
      this.getTemplate(value);
    }
  }

  connectedCallback() {
    this.upgradeProperty('items');
  }

  /**
   * Function to handle property lazy loading
   * @param {*} prop
   */
  upgradeProperty(prop) {
    const hasItemsProperty = Object.prototype.hasOwnProperty.call(
      this,
      'items',
    );
    if (hasItemsProperty) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * Generate accordion items
   * @param {Array} newItems
   */
  getTemplate(newItems) {
    let items = newItems;
    items = typeof items === 'string' ? JSON.parse(items) : items;
    let template = '';
    items.forEach((item, index) => {
      if (item.term && item.description) {
        template = `${template}<dt data-term-id=${index} class="Term">${item.term}</dt>
          <dd data-description-id=${index} class="Description Description--collapsed">
              <p class="Description-text">${item.description}</p>
          </dd>`;
      }
    });
    this.itemsList.innerHTML = template;
    const selectable = Array.from(
      this.shadowRoot.querySelectorAll('[data-term-id]'),
    );
    selectable.forEach((item) => {
      const element = item;
      const { termId } = element.dataset;
      element.onclick = () => this.selectElement(termId);
    });
  }

  /**
   * Function to handle which elements have to modify their styles
   * @param {number} id
   */
  selectElement(id) {
    if (this.selectedItem && this.selectedItem === id) {
      this.modifyItem(id, 'collapse');
      this.selectedItem = '';
      return;
    }
    if (this.selectedItem) {
      this.modifyItem(this.selectedItem, 'collapse');

      // Wait until collapse transition of latest item finishes
      this.modifyItem(id, 'expand', true);
      this.selectedItem = id;
    } else {
      this.modifyItem(id, 'expand');
      this.selectedItem = id;
    }
  }

  /**
   * Collapse element by adding collapsed class
   * @param {HTMLElement} item
   */
  modifyItem(id, modifier, wait = false) {
    const descriptionEl = this.shadowRoot.querySelector(
      `[data-description-id="${id}"]`,
    );
    const termEl = this.shadowRoot.querySelector(`[data-term-id="${id}"]`);
    if (modifier === 'collapse') {
      descriptionEl.classList.add('Description--collapsed');
      termEl.classList.remove('Term--selected');
    } else {
      if (wait) {
        setTimeout(() => {
          descriptionEl.classList.remove('Description--collapsed');
        }, 300);
      } else {
        descriptionEl.classList.remove('Description--collapsed');
      }
      termEl.classList.add('Term--selected');
    }
  }
}

customElements.define('vjs-accordion', Accordion);
