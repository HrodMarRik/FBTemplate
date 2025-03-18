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
    
    // Gestion des onglets du formulaire
    function showTab(tabId) {
        // Cacher tous les contenus d'onglets
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Désactiver tous les boutons d'onglets
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Afficher le contenu de l'onglet sélectionné
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.style.display = 'block';
        }
        
        // Activer le bouton d'onglet correspondant
        const tabButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (tabButton) {
            tabButton.classList.add('active');
        }
        
        // Mettre à jour l'indicateur
        updateTabIndicator();
    }
    
    // Mettre à jour l'indicateur d'onglet
    function updateTabIndicator() {
        const activeTab = document.querySelector('.tab-btn.active');
        const tabIndicator = document.querySelector('.tab-indicator');
        
        if (activeTab && tabIndicator) {
            tabIndicator.style.width = `${activeTab.offsetWidth}px`;
            tabIndicator.style.left = `${activeTab.offsetLeft}px`;
        }
    }
    
    // Initialiser l'indicateur d'onglet
    function initTabIndicator() {
        const tabsNavigation = document.querySelector('.tabs-navigation');
        if (!tabsNavigation) return;
        
        // Vérifier si l'indicateur existe déjà
        let tabIndicator = document.querySelector('.tab-indicator');
        
        // Créer l'indicateur s'il n'existe pas
        if (!tabIndicator) {
            tabIndicator = document.createElement('div');
            tabIndicator.className = 'tab-indicator';
            tabsNavigation.appendChild(tabIndicator);
        }
        
        // Positionner l'indicateur sous le premier onglet actif
        updateTabIndicator();
    }
    
    // Ajouter les écouteurs d'événements pour les onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // Initialiser l'indicateur d'onglet
    initTabIndicator();
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', updateTabIndicator);
    
    // Afficher le formulaire d'ajout d'ingrédient
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', function() {
            // Réinitialiser le formulaire
            crudIngredientForm.reset();
            document.getElementById('ingredientId').value = '';
            ingredientFormTitle.textContent = 'Ajouter une matière première';
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
            if (ingredientsList) {
                ingredientsList.innerHTML = `
                    <div class="ingredient-row">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="ingredient-1">Matière première</label>
                                <select id="ingredient-1" name="ingredients[]" required class="ingredient-select">
                                    <option value="" disabled selected>Sélectionner une matière première</option>
                                    <option value="FAR001">Farine de blé T65</option>
                                    <option value="FAR002">Farine de tradition française</option>
                                    <option value="BEU001">Beurre AOP Charentes-Poitou</option>
                                    <option value="SUC001">Sucre cristal</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="quantity-1">Quantité</label>
                                <input type="number" id="quantity-1" name="quantities[]" min="0.01" step="0.01" required class="ingredient-quantity">
                            </div>
                            
                            <div class="form-group">
                                <label for="unit-1">Unité</label>
                                <input type="text" id="unit-1" name="units[]" readonly class="ingredient-unit">
                            </div>
                            
                            <div class="form-group">
                                <label for="cost-1">Coût</label>
                                <input type="text" id="cost-1" name="costs[]" readonly class="ingredient-cost">
                            </div>
                            
                            <div class="form-group">
                                <label for="baker-percentage-1">% boulanger</label>
                                <input type="text" id="baker-percentage-1" name="bakerPercentages[]" readonly class="baker-percentage">
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
            }
            
            ingredientRowCounter = 1;
            productFormTitle.textContent = 'Créer une recette';
            productForm.style.display = 'block';
            
            // Afficher l'onglet "Informations de base" par défaut
            showTab('basic-info');
            
            window.scrollTo({ top: productForm.offsetTop - 20, behavior: 'smooth' });
            
            // Initialiser les écouteurs d'événements pour les ingrédients
            setupIngredientListeners();
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
            
            const newRow = document.createElement('div');
            newRow.className = 'ingredient-row';
            newRow.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ingredient-${ingredientRowCounter}">Matière première</label>
                        <select id="ingredient-${ingredientRowCounter}" name="ingredients[]" required class="ingredient-select">
                            <option value="" disabled selected>Sélectionner une matière première</option>
                            <option value="FAR001">Farine de blé T65</option>
                            <option value="FAR002">Farine de tradition française</option>
                            <option value="BEU001">Beurre AOP Charentes-Poitou</option>
                            <option value="SUC001">Sucre cristal</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="quantity-${ingredientRowCounter}">Quantité</label>
                        <input type="number" id="quantity-${ingredientRowCounter}" name="quantities[]" min="0.01" step="0.01" required class="ingredient-quantity">
                    </div>
                    
                    <div class="form-group">
                        <label for="unit-${ingredientRowCounter}">Unité</label>
                        <input type="text" id="unit-${ingredientRowCounter}" name="units[]" readonly class="ingredient-unit">
                    </div>
                    
                    <div class="form-group">
                        <label for="cost-${ingredientRowCounter}">Coût</label>
                        <input type="text" id="cost-${ingredientRowCounter}" name="costs[]" readonly class="ingredient-cost">
                    </div>
                    
                    <div class="form-group">
                        <label for="baker-percentage-${ingredientRowCounter}">% boulanger</label>
                        <input type="text" id="baker-percentage-${ingredientRowCounter}" name="bakerPercentages[]" readonly class="baker-percentage">
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
            
            // Activer le bouton de suppression pour les nouvelles lignes
            const removeButtons = document.querySelectorAll('.remove-ingredient');
            removeButtons.forEach(button => {
                button.style.display = 'block';
                button.addEventListener('click', function() {
                    this.closest('.ingredient-row').remove();
                    updateIngredientsSummary();
                    
                    // Si une seule ligne reste, cacher le bouton de suppression
                    if (document.querySelectorAll('.ingredient-row').length === 1) {
                        document.querySelector('.remove-ingredient').style.display = 'none';
                    }
                });
            });
            
            // Ajouter des écouteurs d'événements pour les nouveaux champs
            setupIngredientListeners();
        });
    }
    
    // Configurer les écouteurs d'événements pour les ingrédients
    function setupIngredientListeners() {
        // Écouter les changements sur les sélecteurs d'ingrédients
        document.querySelectorAll('.ingredient-select').forEach(select => {
            select.addEventListener('change', function() {
                const row = this.closest('.form-row');
                const unitField = row.querySelector('.ingredient-unit');
                const costField = row.querySelector('.ingredient-cost');
                
                // Simuler la récupération des données de l'ingrédient
                if (this.value) {
                    // Dans une application réelle, ces valeurs viendraient d'une API ou d'une base de données
                    const units = {
                        'FAR001': 'kg',
                        'FAR002': 'kg',
                        'BEU001': 'g',
                        'SUC001': 'kg'
                    };
                    
                    const costs = {
                        'FAR001': '0.85',
                        'FAR002': '1.20',
                        'BEU001': '0.012',
                        'SUC001': '1.50'
                    };
                    
                    unitField.value = units[this.value] || '';
                    costField.value = costs[this.value] ? costs[this.value] + ' €' : '';
                    
                    // Mettre à jour les calculs
                    updateIngredientsSummary();
                }
            });
        });
        
        // Écouter les changements sur les champs de quantité
        document.querySelectorAll('.ingredient-quantity').forEach(input => {
            input.addEventListener('input', function() {
                updateIngredientsSummary();
            });
        });
    }
    
    // Mettre à jour le résumé des ingrédients
    function updateIngredientsSummary() {
        let totalWeight = 0;
        let totalCost = 0;
        let potentialSavings = 0;
        let flourWeight = 0; // Pour le calcul du pourcentage boulanger
        
        // Parcourir tous les ingrédients
        document.querySelectorAll('.ingredient-row').forEach(row => {
            const select = row.querySelector('.ingredient-select');
            const quantity = parseFloat(row.querySelector('.ingredient-quantity').value) || 0;
            const unit = row.querySelector('.ingredient-unit').value;
            const costText = row.querySelector('.ingredient-cost').value;
            
            // Calculer le poids total (si l'unité est en g ou kg)
            if (unit === 'g') {
                totalWeight += quantity;
                
                // Si c'est de la farine, ajouter au poids de farine pour le % boulanger
                if (select.value && select.value.startsWith('FAR')) {
                    flourWeight += quantity;
                }
            } else if (unit === 'kg') {
                totalWeight += quantity * 1000;
                
                // Si c'est de la farine, ajouter au poids de farine pour le % boulanger
                if (select.value && select.value.startsWith('FAR')) {
                    flourWeight += quantity * 1000;
                }
            }
            
            // Calculer le coût total
            if (costText) {
                const cost = parseFloat(costText.replace(' €', '')) || 0;
                totalCost += quantity * cost;
                
                // Simuler les économies potentielles (20% de réduction)
                potentialSavings += quantity * cost * 0.2;
            }
        });
        
        // Mettre à jour l'affichage
        document.getElementById('total-weight').textContent = totalWeight.toFixed(0) + ' g';
        document.getElementById('ingredients-cost').textContent = totalCost.toFixed(2).replace('.', ',') + ' €';
        document.getElementById('potential-savings').textContent = potentialSavings.toFixed(2).replace('.', ',') + ' €';
        
        // Calculer et mettre à jour les pourcentages boulanger
        if (flourWeight > 0) {
            document.querySelectorAll('.ingredient-row').forEach(row => {
                const select = row.querySelector('.ingredient-select');
                const quantity = parseFloat(row.querySelector('.ingredient-quantity').value) || 0;
                const unit = row.querySelector('.ingredient-unit').value;
                const bakerPercentageField = row.querySelector('.baker-percentage');
                
                let ingredientWeight = 0;
                if (unit === 'g') {
                    ingredientWeight = quantity;
                } else if (unit === 'kg') {
                    ingredientWeight = quantity * 1000;
                }
                
                const bakerPercentage = (ingredientWeight / flourWeight) * 100;
                bakerPercentageField.value = bakerPercentage.toFixed(1) + '%';
            });
        }
        
        // Mettre à jour les coûts dans l'onglet "Coûts et prix"
        updateCostsSummary(totalCost);
    }
    
    // Mettre à jour le résumé des coûts
    function updateCostsSummary(ingredientsCost) {
        const laborTime = parseFloat(document.getElementById('productLaborTime').value) || 0;
        const laborCost = parseFloat(document.getElementById('productLaborCost').value) || 0;
        const quantity = parseFloat(document.getElementById('productQuantity').value) || 1;
        
        // Calculer le coût de main d'œuvre
        const totalLaborCost = (laborTime / 60) * laborCost;
        
        // Calculer le coût total par lot
        const totalBatchCost = ingredientsCost + totalLaborCost;
        
        // Calculer le coût par pièce
        const costPerPiece = totalBatchCost / quantity;
        
        // Mettre à jour l'affichage
        document.getElementById('total-batch-cost').textContent = totalBatchCost.toFixed(2).replace('.', ',') + ' €';
        document.getElementById('cost-per-piece').textContent = costPerPiece.toFixed(2).replace('.', ',') + ' €';
        
        // Calculer le prix de vente suggéré
        updatePricing(costPerPiece);
    }
    
    // Mettre à jour la tarification
    function updatePricing(costPerPiece) {
        const marginPercentage = parseFloat(document.getElementById('productMarginPercentage').value) || 0;
        
        // Calculer le prix de vente suggéré
        const sellingPrice = costPerPiece * (1 + marginPercentage / 100);
        document.getElementById('productSellingPrice').value = sellingPrice.toFixed(2);
        
        // Calculer la marge réelle si un prix de vente réel est spécifié
        const actualPrice = parseFloat(document.getElementById('productActualPrice').value);
        if (actualPrice) {
            const actualMargin = ((actualPrice - costPerPiece) / costPerPiece) * 100;
            document.getElementById('productActualMargin').value = actualMargin.toFixed(1) + '%';
        }
    }
    
    // Écouter les changements sur les champs de coûts
    document.getElementById('productLaborTime').addEventListener('input', function() {
        const ingredientsCost = parseFloat(document.getElementById('ingredients-cost').textContent.replace(',', '.')) || 0;
        updateCostsSummary(ingredientsCost);
    });
    
    document.getElementById('productLaborCost').addEventListener('input', function() {
        const ingredientsCost = parseFloat(document.getElementById('ingredients-cost').textContent.replace(',', '.')) || 0;
        updateCostsSummary(ingredientsCost);
    });
    
    document.getElementById('productQuantity').addEventListener('input', function() {
        const ingredientsCost = parseFloat(document.getElementById('ingredients-cost').textContent.replace(',', '.')) || 0;
        updateCostsSummary(ingredientsCost);
    });
    
    document.getElementById('productMarginPercentage').addEventListener('input', function() {
        const costPerPiece = parseFloat(document.getElementById('cost-per-piece').textContent.replace(',', '.')) || 0;
        updatePricing(costPerPiece);
    });
    
    document.getElementById('productActualPrice').addEventListener('input', function() {
        const costPerPiece = parseFloat(document.getElementById('cost-per-piece').textContent.replace(',', '.')) || 0;
        updatePricing(costPerPiece);
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
        alert(isEditing ? 'Matière première mise à jour avec succès!' : 'Matière première ajoutée avec succès!');
        ingredientForm.style.display = 'none';
    });
    
    // Soumission du formulaire de produit
    crudProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const isEditing = document.getElementById('productId').value !== '';
        alert(isEditing ? 'Recette mise à jour avec succès!' : 'Recette enregistrée avec succès!');
        productForm.style.display = 'none';
    });
    
    // Bouton pour calculer le pourcentage boulanger
    const calculateBakerPercentageBtn = document.getElementById('calculateBakerPercentage');
    if (calculateBakerPercentageBtn) {
        calculateBakerPercentageBtn.addEventListener('click', function() {
            updateIngredientsSummary();
            alert('Pourcentages boulanger calculés avec succès!');
        });
    }
    
    // Bouton pour ajuster les quantités
    const scaleRecipeBtn = document.getElementById('scaleRecipe');
    if (scaleRecipeBtn) {
        scaleRecipeBtn.addEventListener('click', function() {
            const scale = prompt('Entrez le facteur d\'échelle (ex: 2 pour doubler, 0.5 pour réduire de moitié):', '1');
            if (scale && !isNaN(scale)) {
                const factor = parseFloat(scale);
                document.querySelectorAll('.ingredient-quantity').forEach(input => {
                    const currentValue = parseFloat(input.value) || 0;
                    input.value = (currentValue * factor).toFixed(2);
                });
                updateIngredientsSummary();
            }
        });
    }
}); 