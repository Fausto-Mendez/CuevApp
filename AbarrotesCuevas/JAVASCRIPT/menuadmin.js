document.addEventListener('DOMContentLoaded', function () {
    const fragmentContainer = document.getElementById('fragment-container');
    const buttons = document.querySelectorAll('.action-admin-button-usuario, .action-admin-button-sucursal, .action-admin-button-producto');
    
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const fragmentId = this.id.replace('button', 'fragment');
            loadFragment(fragmentId);
        });
    });

    function loadFragment(fragmentId) {
        const fragment = document.getElementById(fragmentId);
        fragmentContainer.innerHTML = fragment.innerHTML;
        
        if (fragmentId === 'fragment1') {
            loadComboBoxOptions('cargo', 'https://api.example.com/cargos');
            loadComboBoxOptions('sucursal', 'https://api.example.com/sucursales');
        }
    }
});