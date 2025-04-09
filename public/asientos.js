const filas = 10;
const columnas = 12;
const teatro = [];

for (let i = 0; i < filas; i++) {
  teatro[i] = [];
  for (let j = 0; j < columnas; j++) {
    teatro[i].push({
      id: i * columnas + j,
      estado: false, // false = libre
    });
  }
}

function suggest(cantidad) {
  if (cantidad > columnas) return new Set();

  const centro = Math.floor(filas / 2);
  const orden = [...Array(filas).keys()].sort(
    (a, b) => Math.abs(a - centro) - Math.abs(b - centro),
  );

  for (let fila of orden) {
    let consecutivos = [];

    for (let asiento of teatro[fila]) {
      if (!asiento.estado) {
        consecutivos.push(asiento.id);
        if (consecutivos.length === cantidad) return new Set(consecutivos);
      } else {
        consecutivos = [];
      }
    }
  }

  return new Set();
}

window.buscarAsientos = function () {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const sugerencia = suggest(cantidad);

  if (sugerencia.size === 0) {
    alert('No hay suficientes asientos disponibles juntos.');
    return;
  }

  // Cambiar estado y color
  sugerencia.forEach((id) => {
    const btn = document.querySelector(`.asiento[data-id="${id}"]`);
    if (btn) {
      btn.classList.remove('bg-green-300');
      btn.classList.add('bg-red-500');
      btn.dataset.ocupado = 'true';
      btn.disabled = true;
    }

    for (let fila of teatro) {
      for (let asiento of fila) {
        if (asiento.id === id) asiento.estado = true;
      }
    }
  });

  alert(`Se reservaron ${sugerencia.size} asiento(s).`);
};
