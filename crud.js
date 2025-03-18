document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM - Ingrédients
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const ingredientForm = document.getElementById('ingredientForm');
    const ingredientFormTitle = document.getElementById('ingredientFormTitle');
    const cancelIngredientBtn = document.getElementById('cancelIngredientBtn');
    const crudIngredientForm = document.getElementById('crudIngredientForm');
    
    // Éléments du DOM - Produits
    const addProductBtn = document.getElementById('addProductBtn');
    const productForm = document.getElementById('productForm');
    const productFormTitle = document.getElementById('productFormTitle');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const crudProductForm = document.getElementById('crudProductForm');
    const addIngredientRowBtn = document.getElementById('addIngredientRowBtn');
    const ingredientsList = document.getElementById('ingredientsList');
    
    // Éléments du DOM - Modals
    const deleteModal = document.getElementById('deleteModal');
    const productDetailsModal = document.getElementById('productDetailsModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Boutons d'action
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Compteur pour les nouvelles lignes d'ingrédients
    let ingredientRowCounter = 1;
    
    // Gestion des modales
    setupModals();
    
    // Gestion des formulaires
    setupForms();
    
    // Gestion des ingrédients dans le formulaire de produit
    setupIngredientRows();
    
    // Afficher le formulaire d'ajout d'ingrédient
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', function() {
            // Réinitialiser le formulaire
            crudIngredientForm.reset();
            document.getElementById('ingredientId').value = '';
            ingredientFormTitle.textContent = 'Ajouter un ingrédient';
            ingredientForm.style.display = 'block';
            window.scrollTo({ top: ingredientForm.offsetTop - 20, behavior: 'smooth' });
        });
    }
    
    // Annuler l'ajout/modification d'ingrédient
    if (cancelIngredientBtn) {
        cancelIngredientBtn.addEventListener('click', function() {
            ingredientForm.style.display = 'none';
        });
    }
    
    // Afficher le formulaire d'ajout de produit
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            // Réinitialiser le formulaire
            crudProductForm.reset();
            document.getElementById('productId').value = '';
            
            // Réinitialiser la liste d'ingrédients
            ingredientsList.innerHTML = `
                <div class="ingredient-row">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="ingredient-1">Ingrédient</label>
                            <select id="ingredient-1" name="ingredients[]" required>
                                <option value="" disabled selected>Sélectionner un ingrédient</option>
                                <option value="1">Farine de blé</option>
                                <option value="2">Sucre</option>
                                <option value="3">Lait entier</option>
                                <option value="4">Fraises</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="quantity-1">Quantité</label>
                            <input type="number" id="quantity-1" name="quantities[]" min="0.01" step="0.01" required>
                        </div>
                        
                        <div class="form-group ingredient-actions">
                            <button type="button" class="button button--icon remove-ingredient" style="display: none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            ingredientRowCounter = 1;
            productFormTitle.textContent = 'Ajouter un produit';
            productForm.style.display = 'block';
            window.scrollTo({ top: productForm.offsetTop - 20, behavior: 'smooth' });
        });
    }
    
    // Annuler l'ajout/modification de produit
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function() {
            productForm.style.display = 'none';
        });
    }
    
    // Ajouter une ligne d'ingrédient
    if (addIngredientRowBtn) {
        addIngredientRowBtn.addEventListener('click', function() {
            ingredientRowCounter++;
            
            // Afficher le bouton de suppression sur toutes les lignes
            document.querySelectorAll('.remove-ingredient').forEach(btn => {
                btn.style.display = 'block';
            });
            
            // Créer une nouvelle ligne
            const newRow = document.createElement('div');
            newRow.className = 'ingredient-row';
            newRow.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ingredient-${ingredientRowCounter}">Ingrédient</label>
                        <select id="ingredient-${ingredientRowCounter}" name="ingredients[]" required>
                            <option value="" disabled selected>Sélectionner un ingrédient</option>
                            <option value="1">Farine de blé</option>
                            <option value="2">Sucre</option>
                            <option value="3">Lait entier</option>
                            <option value="4">Fraises</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="quantity-${ingredientRowCounter}">Quantité</label>
                        <input type="number" id="quantity-${ingredientRowCounter}" name="quantities[]" min="0.01" step="0.01" required>
                    </div>
                    
                    <div class="form-group ingredient-actions">
                        <button type="button" class="button button--icon remove-ingredient">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            ingredientsList.appendChild(newRow);
            
            // Ajouter l'événement de suppression
            newRow.querySelector('.remove-ingredient').addEventListener('click', function() {
                newRow.remove();
                
                // Si une seule ligne reste, cacher le bouton de suppression
                if (document.querySelectorAll('.ingredient-row').length === 1) {
                    document.querySelector('.remove-ingredient').style.display = 'none';
                }
            });
        });
    }
    
    // Ajouter des événements de suppression aux boutons existants
    document.querySelectorAll('.remove-ingredient').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('.ingredient-row');
            row.remove();
            
            // Si une seule ligne reste, cacher le bouton de suppression
            if (document.querySelectorAll('.ingredient-row').length === 1) {
                document.querySelector('.remove-ingredient').style.display = 'none';
            }
        });
    });
    
    // Simuler l'édition d'un ingrédient
    document.querySelectorAll('#ingredients-section .edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const category = row.cells[2].textContent;
            const unit = row.cells[3].textContent;
            const standardPrice = parseFloat(row.cells[4].textContent);
            const memberPrice = row.cells[5].textContent !== '-' ? parseFloat(row.cells[5].textContent) : '';
            const isSystem = row.cells[6].querySelector('.status-badge').classList.contains('status-active');
            
            // Remplir le formulaire
            document.getElementById('ingredientId').value = id;
            document.getElementById('ingredientName').value = name;
            document.getElementById('ingredientStandardPrice').value = standardPrice;
            if (memberPrice) {
                document.getElementById('ingredientMemberPrice').value = memberPrice;
            }
            document.getElementById('ingredientIsSystem').checked = isSystem;
            
            // Sélectionner la catégorie
            const categorySelect = document.getElementById('ingredientCategory');
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].text === category) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
            
            // Sélectionner l'unité
            const unitSelect = document.getElementById('ingredientUnit');
            for (let i = 0; i < unitSelect.options.length; i++) {
                if (unitSelect.options[i].text.startsWith(unit)) {
                    unitSelect.selectedIndex = i;
                    break;
                }
            }
            
            ingredientFormTitle.textContent = 'Modifier l\'ingrédient';
            ingredientForm.style.display = 'block';
            window.scrollTo({ top: ingredientForm.offsetTop - 20, behavior: 'smooth' });
        });
    });
    
    // Simuler l'édition d'un produit
    document.querySelectorAll('#products-section .edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const description = row.cells[2].textContent;
            const quantity = parseInt(row.cells[3].textContent);
            const margin = parseInt(row.cells[6].textContent);
            
            // Remplir le formulaire
            document.getElementById('productId').value = id;
            document.getElementById('productName').value = name;
            document.getElementById('productDescription').value = description;
            document.getElementById('productQuantity').value = quantity;
            document.getElementById('productMarginPercentage').value = margin;
            
            // Valeurs fictives pour les autres champs
            document.getElementById('productLaborCost').value = '3.00';
            document.getElementById('productEnergyCost').value = '1.50';
            document.getElementById('productOtherCosts').value = '0.50';
            
            productFormTitle.textContent = 'Modifier le produit';
            productForm.style.display = 'block';
            window.scrollTo({ top: productForm.offsetTop - 20, behavior: 'smooth' });
        });
    });
    
    // Afficher les détails du produit
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            productDetailsModal.style.display = 'flex';
        });
    });
    
    // Afficher la modal de confirmation de suppression
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteModal.style.display = 'flex';
        });
    });
    
    // Fermer les modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteModal.style.display = 'none';
            productDetailsModal.style.display = 'none';
        });
    });
    
    // Simuler la suppression
    confirmDelete.addEventListener('click', function() {
        deleteModal.style.display = 'none';
        alert('Élément supprimé avec succès!');
    });
    
    // Soumission du formulaire d'ingrédient
    crudIngredientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const isEditing = document.getElementById('ingredientId').value !== '';
        alert(isEditing ? 'Ingrédient mis à jour avec succès!' : 'Ingrédient ajouté avec succès!');
        ingredientForm.style.display = 'none';
    });
    
    // Soumission du formulaire de produit
    crudProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const isEditing = document.getElementById('productId').value !== '';
        alert(isEditing ? 'Produit mis à jour avec succès!' : 'Produit ajouté avec succès!');
        productForm.style.display = 'none';
    });
});

// Configuration des modales
function setupModals() {
    // Récupération des éléments modaux
    const deleteModal = document.getElementById('deleteModal');
    const productDetailsModal = document.getElementById('productDetailsModal');
    
    // Boutons pour ouvrir les modales
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Boutons pour fermer les modales
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    const closeDetailsButton = document.querySelector('.close-details');
    
    // Gestionnaires d'événements pour les boutons de suppression
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteModal.style.display = 'flex';
        });
    });
    
    // Gestionnaires d'événements pour les boutons de visualisation
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            productDetailsModal.style.display = 'flex';
        });
    });
    
    // Gestionnaires d'événements pour les boutons de fermeture
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteModal.style.display = 'none';
            productDetailsModal.style.display = 'none';
        });
    });
    
    // Gestionnaire pour le bouton Annuler dans la modale de suppression
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }
    
    // Gestionnaire pour le bouton Fermer dans la modale de détails
    if (closeDetailsButton) {
        closeDetailsButton.addEventListener('click', function() {
            productDetailsModal.style.display = 'none';
        });
    }
    
    // Fermer les modales en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
        if (event.target === productDetailsModal) {
            productDetailsModal.style.display = 'none';
        }
    });
}

// Configuration des formulaires
function setupForms() {
    // Boutons pour afficher/masquer les formulaires
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const cancelIngredientBtn = document.getElementById('cancelIngredientBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    
    // Formulaires
    const ingredientForm = document.getElementById('ingredientForm');
    const productForm = document.getElementById('productForm');
    
    // Afficher le formulaire d'ingrédient
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', function() {
            ingredientForm.style.display = 'block';
            document.getElementById('ingredientFormTitle').textContent = 'Ajouter un ingrédient';
            document.getElementById('crudIngredientForm').reset();
        });
    }
    
    // Masquer le formulaire d'ingrédient
    if (cancelIngredientBtn) {
        cancelIngredientBtn.addEventListener('click', function() {
            ingredientForm.style.display = 'none';
        });
    }
    
    // Afficher le formulaire de produit
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            productForm.style.display = 'block';
            document.getElementById('productFormTitle').textContent = 'Ajouter un produit';
            document.getElementById('crudProductForm').reset();
        });
    }
    
    // Masquer le formulaire de produit
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function() {
            productForm.style.display = 'none';
        });
    }
    
    // Gestion des boutons d'édition
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const isIngredient = row.closest('#ingredients-section') !== null;
            
            if (isIngredient) {
                // Édition d'un ingrédient
                ingredientForm.style.display = 'block';
                document.getElementById('ingredientFormTitle').textContent = 'Modifier un ingrédient';
                // Ici, vous pourriez remplir le formulaire avec les données de la ligne
            } else {
                // Édition d'un produit
                productForm.style.display = 'block';
                document.getElementById('productFormTitle').textContent = 'Modifier un produit';
                // Ici, vous pourriez remplir le formulaire avec les données de la ligne
            }
        });
    });
}

// Configuration des lignes d'ingrédients dans le formulaire de produit
function setupIngredientRows() {
    const addIngredientRowBtn = document.getElementById('addIngredientRowBtn');
    const ingredientsList = document.getElementById('ingredientsList');
    
    if (addIngredientRowBtn && ingredientsList) {
        let rowCount = 1;
        
        // Afficher le bouton de suppression pour la première ligne si nécessaire
        const firstRemoveButton = document.querySelector('.remove-ingredient');
        if (firstRemoveButton) {
            firstRemoveButton.style.display = 'none';
        }
        
        // Ajouter une nouvelle ligne d'ingrédient
        addIngredientRowBtn.addEventListener('click', function() {
            rowCount++;
            
            // Créer une nouvelle ligne
            const newRow = document.createElement('div');
            newRow.className = 'ingredient-row';
            newRow.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ingredient-${rowCount}">Ingrédient</label>
                        <select id="ingredient-${rowCount}" name="ingredients[]" required>
                            <option value="" disabled selected>Sélectionner un ingrédient</option>
                            <option value="1">Farine de blé</option>
                            <option value="2">Sucre</option>
                            <option value="3">Lait entier</option>
                            <option value="4">Fraises</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="quantity-${rowCount}">Quantité</label>
                        <input type="number" id="quantity-${rowCount}" name="quantities[]" min="0.01" step="0.01" required>
                    </div>
                    
                    <div class="form-group ingredient-actions">
                        <button type="button" class="button button--icon remove-ingredient">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            ingredientsList.appendChild(newRow);
            
            // Afficher tous les boutons de suppression si plus d'une ligne
            if (rowCount > 1) {
                const removeButtons = document.querySelectorAll('.remove-ingredient');
                removeButtons.forEach(button => {
                    button.style.display = 'block';
                });
            }
            
            // Ajouter un gestionnaire d'événements pour le nouveau bouton de suppression
            const newRemoveButton = newRow.querySelector('.remove-ingredient');
            newRemoveButton.addEventListener('click', function() {
                newRow.remove();
                rowCount--;
                
                // Masquer le bouton de suppression de la première ligne s'il n'y a qu'une ligne
                if (rowCount === 1) {
                    const firstRemoveButton = document.querySelector('.remove-ingredient');
                    if (firstRemoveButton) {
                        firstRemoveButton.style.display = 'none';
                    }
                }
            });
        });
        
        // Ajouter des gestionnaires d'événements pour les boutons de suppression existants
        const removeButtons = document.querySelectorAll('.remove-ingredient');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.ingredient-row').remove();
                rowCount--;
                
                // Masquer le bouton de suppression de la première ligne s'il n'y a qu'une ligne
                if (rowCount === 1) {
                    const firstRemoveButton = document.querySelector('.remove-ingredient');
                    if (firstRemoveButton) {
                        firstRemoveButton.style.display = 'none';
                    }
                }
            });
        });
    }
} 