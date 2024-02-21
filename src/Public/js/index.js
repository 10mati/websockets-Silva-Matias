
// configuracion de socket del lado del cliente

const socket = io();


socket.emit('msgKey',"Hola soy el cliente enviando un mensaje ")

socket.on('products', products => {
  console.log(products);
const productList = document.getElementById('product-list')

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