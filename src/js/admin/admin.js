import { obtenerLibros } from '../../firebase.js';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const db = getFirestore();

document.addEventListener('DOMContentLoaded', function() {
    obtenerLibros((collection) => {
        let contenido = '';
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
                            <div class="libro" id="libro_${doc.id}">
                                <button class="btn btn-primary btn-prestar" id="${doc.id}">Pedir Prestado</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('contenido').innerHTML = contenido;

        // Agregar evento click a cada botón
        document.querySelectorAll(".btn-prestar").forEach(btn => {
            btn.addEventListener('click', function() {
                const libroId = btn.id;
                prestarLibro(libroId); // Llamar a la función para prestar el libro con el ID correspondiente
            });
        });
    });
});

async function prestarLibro(libroId) {
    const userId = 'user123'; // Aquí deberías obtener dinámicamente el ID del usuario

    try {
        // Obtener la referencia al documento del libro
        const libroRef = doc(db, 'libros', libroId);
        const libroSnap = await getDoc(libroRef);

        if (libroSnap.exists()) {
            const libroData = libroSnap.data();

            // Comprobar si hay suficientes libros disponibles
            if (libroData.cantidad > 0) {
                // Crear el documento de préstamo
                const prestamoRef = doc(db, 'prestamos', `${userId}_${libroId}`);
                await setDoc(prestamoRef, {
                    userId,
                    libroId,
                    cantidad: 1,
                    fecha: new Date().toISOString()
                });

                // Actualizar la cantidad de libros
                await updateDoc(libroRef, {
                    cantidad: libroData.cantidad - 1
                });

                alert('Préstamo realizado con éxito');
            } else {
                alert('No hay suficientes libros disponibles');
            }
        } else {
            alert('Libro no encontrado');
        }
    } catch (error) {
        console.error('Error al pedir prestado el libro:', error);
        alert('Error al realizar el préstamo');
    }
}