import { obtenerLibros } from "../firebase.js";

document.addEventListener("DOMContentLoaded", function () {
  obtenerLibros((collection) => {
    let contenido = "";
    collection.forEach((doc) => {
      const item = doc.data();
      contenido += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${item.imagen}" class="card-img-top" alt="${item.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${item.titulo}</h5>
                        <p class="card-text">Autor: ${item.autor}</p>
                        <p class="card-text">Cantidad: ${item.cantidad}</p>
                    </div>
                </div>
            </div>
                    `;
    });
    document.getElementById("contenido").innerHTML = contenido;
  });
});
