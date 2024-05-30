document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener los datos de perfil (simulada con datos estáticos)
    function getProfileData() {
        return {
            username: "usuario123",
            email: "usuario@example.com",
            phone: "1234567890",
            profilePicture: "../PNG/profile.png"
        };
    }

    // Cargar los datos de perfil al cargar la página
    const profileData = getProfileData();
    document.getElementById('username').value = profileData.username;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('profile-picture').src = profileData.profilePicture;

    // Manejar el formulario de actualización de perfil
    const profileForm = document.getElementById('profile-form');
    const updateButton = document.getElementById('update-button');
    const showPasswordButton = document.getElementById('show-password-form');
    const passwordForm = document.getElementById('password-form');
    const passwordButton = document.getElementById('password-button');

    let isProfileFormDirty = false;
    let isPasswordFormVisible = false;

    function toggleUpdateButtonVisibility() {
        updateButton.style.display = isProfileFormDirty ? 'block' : 'none';
    }

    function togglePasswordFormVisibility() {
        passwordForm.style.display = isPasswordFormVisible ? 'block' : 'none';
    }

    profileForm.addEventListener('input', () => {
        isProfileFormDirty = true;
        toggleUpdateButtonVisibility();
    });

    showPasswordButton.addEventListener('click', () => {
        isPasswordFormVisible = !isPasswordFormVisible;
        togglePasswordFormVisibility();
        showPasswordButton.textContent = isPasswordFormVisible ? 'Ocultar Contraseña' : 'Mostrar Contraseña';
    });

    // Manejar el formulario de actualización de perfil
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Aquí agregarías la lógica para actualizar el perfil del usuario
        console.log(`Actualizar perfil: ${username}, ${email}, ${phone}`);
        alert('Perfil actualizado correctamente');
        isProfileFormDirty = false;
        toggleUpdateButtonVisibility();
    });

   // Manejar el formulario de cambio de contraseña
   passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword === confirmPassword) {
        // Aquí agregarías la lógica para cambiar la contraseña del usuario
        console.log(`Cambiar contraseña a: ${newPassword}`);
        alert('Contraseña cambiada correctamente');
        isPasswordFormVisible = false;
        togglePasswordFormVisibility();
    } else {
        alert('Las contraseñas no coinciden');
    }
});;
});

