const socket = io();


socket.emit('msgKey2',"Hola soy el cliente2 enviando un mensaje ")

socket.on('products', productos => {
    products = productos
  const productList = document.getElementById('real-products')

  productList.innerHTML = products.map(product => `
  <li>
  <p>Título: ${product.title}</p>
  <p>Descripción: ${product.descriptions}</p>
  <p>Código: ${product.code}</p>
  <p>Precio: ${product.price}</p>
  <p>Estado: ${product.status}</p>
  <p>Stock: ${product.stock}</p>
  <p>Categoría: ${product.category}</p>
  <p>id: ${product.id}</p>
  </li>`).join('')
  })


  socket.on('new-product', (newProduct) => {
    const newProducts = [...products, newProduct];
    productList.innerHTML = newProducts.map(product => 
    `<li>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.descriptions}</p>
      <p>Código: ${product.code}</p>
      <p>Precio: ${product.price}</p>
      <p>Estado: ${product.status}</p>
      <p>Stock: ${product.stock}</p>
      <p>Categoría: ${product.category}</p>
      <p>id: ${product.id}</p>
    </li>`).join('');
  });

  const form = document.getElementById('new-product-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
  
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
  
    socket.emit('new-product', newProduct);

    // Limpiar los campos del formulario
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '';
  document.getElementById('thumbnail').value = '';
  document.getElementById('code').value = '';
  document.getElementById('stock').value = '';

  });
 
  