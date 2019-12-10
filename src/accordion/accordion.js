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

  selectElement(id) {
    const newSelected = this.shadowRoot.querySelector(
      `[data-description-id="${id}"]`,
    );
    if (this.selectedItem && this.selectedItem === id) {
      Accordion.collapseItem(newSelected);
      this.selectedItem = '';
      return;
    }
    if (this.selectedItem) {
      const currentExpanded = this.shadowRoot.querySelector(
        `[data-description-id="${this.selectedItem}"]`,
      );
      Accordion.collapseItem(currentExpanded);

      // Wait until collapse transition of latest item finishes
      setTimeout(() => {
        newSelected.classList.remove('Description--collapsed');
        Accordion.expandItem(newSelected);
        this.selectedItem = id;
      }, 300);
    } else {
      Accordion.expandItem(newSelected);
      this.selectedItem = id;
    }
  }

  /**
   * Collapse element by adding collapsed class
   * @param {HTMLElement} item
   */
  static collapseItem(item) {
    item.classList.add('Description--collapsed');
  }

  /**
   * Expand item by removing collapsed class
   * @param {HTMLElement} item
   */
  static expandItem(item) {
    item.classList.remove('Description--collapsed');
  }
}

customElements.define('vjs-accordion', Accordion);
