// multiSelectImproved.js
class MultiSelectImproved {
  constructor(selectId, dataSource, options = {}) {
    this.selectId = selectId;
    this.dataSource = dataSource;
    this.options = {
      placeholder: options.placeholder || 'Seleccione opciones...',
      search: options.search !== false,
      width: options.width || '100%',
      maxHeight: options.maxHeight || '300px'
    };
    
    this.init();
  }

  init() {
    const selectElement = document.getElementById(this.selectId);
    if (!selectElement) {
      console.error(`Elemento con ID ${this.selectId} no encontrado`);
      return;
    }
    
    selectElement.style.display = 'none';
    this.createImprovedComponent(selectElement);
    this.renderOptions();
    this.setupEvents();
  }

  createImprovedComponent(selectElement) {
    // Contenedor principal mejorado
    this.container = document.createElement('div');
    this.container.className = 'multi-select-improved position-relative';
    this.container.style.width = this.options.width;
    
    // Selector mejorado (contendrá los tags)
    this.selectBox = document.createElement('div');
    this.selectBox.className = 'form-select d-flex align-items-center flex-wrap gap-2';
    this.selectBox.style.minHeight = '38px';
    this.selectBox.style.cursor = 'pointer';
    this.selectBox.style.overflow = 'hidden';
    this.selectBox.setAttribute('data-bs-toggle', 'dropdown');
    
    // Span para placeholder/texto
    this.placeholderSpan = document.createElement('span');
    this.placeholderSpan.className = 'text-muted';
    this.placeholderSpan.textContent = this.options.placeholder;
    this.selectBox.appendChild(this.placeholderSpan);
    
    // Contenedor para tags (dentro del select)
    this.tagsContainer = document.createElement('div');
    this.tagsContainer.className = 'd-flex flex-wrap gap-2';
    this.tagsContainer.style.display = 'none'; // Oculto inicialmente
    this.selectBox.appendChild(this.tagsContainer);
    
    this.container.appendChild(this.selectBox);
    
    // Dropdown con opciones (igual que antes)
    this.dropdownMenu = document.createElement('div');
    this.dropdownMenu.className = 'dropdown-menu w-100 p-0';
    this.dropdownMenu.style.maxHeight = this.options.maxHeight;
    this.dropdownMenu.style.overflowY = 'auto';
    
    this.optionsList = document.createElement('div');
    this.optionsList.className = 'list-group list-group-flush';
    this.dropdownMenu.appendChild(this.optionsList);
    this.container.appendChild(this.dropdownMenu);
    
    // Campo de búsqueda (si está habilitado)
    if (this.options.search) {
      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.className = 'form-control mb-2';
      this.searchInput.placeholder = 'Buscar...';
      this.dropdownMenu.prepend(this.searchInput);
    }
    
    selectElement.parentNode.insertBefore(this.container, selectElement.nextSibling);
    new bootstrap.Dropdown(this.selectBox);
  }

  renderOptions(filter = '') {
    this.optionsList.innerHTML = '';
    
    const filteredData = this.dataSource.filter(item =>
      item.text.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredData.forEach(item => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'list-group-item list-group-item-action';
      option.innerHTML = `
        <div class="form-check d-flex align-items-center">
          <input type="checkbox" class="form-check-input me-2" id="opt_${this.selectId +"_"+ item.id}" value="${item.id}">
          <label class="form-check-label w-100" for="opt_${this.selectId +"_"+item.id}">${item.text}</label>
        </div>
      `;
      this.optionsList.appendChild(option);
    });
  }

  setupEvents() {
    if (this.options.search) {
      this.searchInput.addEventListener('input', (e) => {
        this.renderOptions(e.target.value);
      });
    }
    
    this.optionsList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        this.updateSelectedTags();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        bootstrap.Dropdown.getInstance(this.selectBox).hide();
      }
    });
  }

  updateSelectedTags() {
    const checkboxes = this.optionsList.querySelectorAll('input:checked');
    this.tagsContainer.innerHTML = '';
    
    if (checkboxes.length > 0) {
      this.placeholderSpan.style.display = 'none';
      this.tagsContainer.style.display = 'flex';
    } else {
      this.placeholderSpan.style.display = 'inline';
      this.tagsContainer.style.display = 'none';
    }
    
    checkboxes.forEach(checkbox => {
      const itemId = checkbox.value;
      const itemText = this.dataSource.find(item => item.id == itemId).text;
      
      const tag = document.createElement('span');
      tag.className = 'badge bg-primary rounded-pill d-flex align-items-center';
      tag.innerHTML = `
        ${itemText}
        <button type="button" class="btn-close btn-close-white ms-2" data-id="${itemId}"></button>
      `;
      this.tagsContainer.appendChild(tag);
      
      // Evento para eliminar tag
      tag.querySelector('.btn-close').addEventListener('click', (e) => {
        e.stopPropagation();
        const checkbox = this.optionsList.querySelector(`input[value="${itemId}"]`);
        if (checkbox) checkbox.checked = false;
        this.updateSelectedTags();
      });
    });
  }

  getSelectedValues() {
    const checkboxes = this.optionsList.querySelectorAll('input:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
  }

  getSelectedItems() {
    return this.getSelectedValues().map(id => 
      this.dataSource.find(item => item.id == id)
    );
  }

  setInitialSelection(selectedIds) {
    if (!Array.isArray(selectedIds)) return;
    
    // Limpiar selección actual
    this.optionsList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Marcar los nuevos seleccionados
    selectedIds.forEach(id => {
        const checkbox = this.optionsList.querySelector(`input[value="${id}"]`);
        if (checkbox) checkbox.checked = true;
    });
    
    // Actualizar tags
    this.updateSelectedTags();
    }
}