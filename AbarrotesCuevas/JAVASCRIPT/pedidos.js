document.addEventListener('DOMContentLoaded', function() {
    const listaPendientes = document.getElementById('lista-pendientes');
    const listaEntrega = document.getElementById('lista-entrega');
    const listaEnviados = document.getElementById('lista-enviados');
    const listaCancelados = document.getElementById('lista-cancelados');

    // Simulación de lista de pedidos
    let pedidos = [
        { id: 1, estado: 'pendiente', productos: ['Producto 1', 'Producto 2'], total: 100, direccion: 'Calle 123, Ciudad' },
        { id: 2, estado: 'entrega', productos: ['Producto 3', 'Producto 4'], total: 150, direccion: 'Avenida XYZ, Pueblo' },
        { id: 3, estado: 'enviado', productos: ['Producto 5', 'Producto 6'], total: 200, direccion: 'Plaza Principal, Villa' },
        { id: 4, estado: 'cancelado', productos: ['Producto 7', 'Producto 8'], total: 50, direccion: 'Carretera ABC, Municipio' }
    ];

    // Función para renderizar los pedidos
    function renderizarPedidos() {
        listaPendientes.innerHTML = '';
        listaEntrega.innerHTML = '';
        listaEnviados.innerHTML = '';
        listaCancelados.innerHTML = '';

        pedidos.forEach(pedido => {
            const itemPedido = document.createElement('div');
            itemPedido.classList.add('pedido');
            itemPedido.innerHTML = `
                <div>ID: ${pedido.id}</div>
                <div>Número de productos: ${pedido.productos.length}</div>
                <div>Productos: ${pedido.productos.join(', ')}</div>
                <div>Total: ${pedido.total}</div>
            `;

            const botonCancelar = document.createElement('button');
            botonCancelar.textContent = 'Cancelar';
            botonCancelar.classList.add('cancelar');
            botonCancelar.addEventListener('click', () => {
                cancelarPedido(pedido);
            });
            itemPedido.appendChild(botonCancelar);

            if (pedido.estado === 'pendiente') {
                const botonModificar = document.createElement('button');
                botonModificar.textContent = 'Modificar';
                botonModificar.addEventListener('click', () => {
                    window.location.href = `../HTML/carrito.html?id=${pedido.id}&productos=${encodeURIComponent(JSON.stringify(pedido.productos))}`;
                });
                itemPedido.appendChild(botonModificar);
                listaPendientes.appendChild(itemPedido);
            } else if (pedido.estado === 'entrega') {
                const botonModificarDireccion = document.createElement('button');
                botonModificarDireccion.textContent = 'Modificar dirección';
                botonModificarDireccion.addEventListener('click', () => {
                    window.location.href = `../HTML/adress.html?id=${pedido.id}&direccion=${encodeURIComponent(pedido.direccion)}`;
                });
                itemPedido.appendChild(botonModificarDireccion);
                listaEntrega.appendChild(itemPedido);
            } else if (pedido.estado === 'enviado') {
                const botonComprarDeNuevo = document.createElement('button');
                botonComprarDeNuevo.textContent = 'Comprar de nuevo';
                botonComprarDeNuevo.addEventListener('click', () => {
                    comprarDeNuevo(pedido);
                });
                itemPedido.appendChild(botonComprarDeNuevo);
                listaEnviados.appendChild(itemPedido);
            } else if (pedido.estado === 'cancelado') {
                listaCancelados.appendChild(itemPedido);
            }
        });

        // Mostrar mensaje si no hay pedidos en una sección
        if (listaPendientes.childElementCount === 0) {
            listaPendientes.textContent = 'No hay información que mostrar en esta sección.';
        }
        if (listaEntrega.childElementCount === 0) {
            listaEntrega.textContent = 'No hay información que mostrar en esta sección.';
        }
        if (listaEnviados.childElementCount === 0) {
            listaEnviados.textContent = 'No hay información que mostrar en esta sección.';
        }
        if (listaCancelados.childElementCount === 0) {
            listaCancelados.textContent = 'No hay información que mostrar en esta sección.';
        }
    }

    // Funciones simuladas de acciones con pedidos
    function cancelarPedido(pedido) {
        console.log(`Pedido ${pedido.id} cancelado.`);
        pedido.estado = 'cancelado';
        renderizarPedidos();
    }

    function comprarDeNuevo(pedido) {
        console.log(`Comprando de nuevo el pedido ${pedido.id}.`);
        const nuevoPedido = {
            id: pedidos.length + 1,
            estado: 'pendiente',
            productos: pedido.productos,
            total: pedido.total
        };
        pedidos.push(nuevoPedido);
        renderizarPedidos();
    }

    // Renderizar los pedidos al cargar la página
    renderizarPedidos();
});
