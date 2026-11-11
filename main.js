
const Proyecto = "Mi Control de Gastos";

// VARIABLES
let presupuesto = 0;
let saldoPresupuesto = 0;
let gasto = 0;
let opc = 0;

const moneda = "AR$";
const gastosRegistrados = [];

// FUNCIONES

function mostrarSaldo(saldo) {
    console.log("\nSaldo restante: " + moneda + saldo);
}

function calcularSaldo(presupuesto, gasto) {
    return presupuesto - gasto;
}

function mostrarGastos(gastos) {
    if (gastos.length === 0) {
        console.log("Todavía no hay gastos registrados.");
        return;
    }

    console.log("\n--- GASTOS REGISTRADOS ---");

    for (const gasto of gastos) {
        console.log("Gasto: " + moneda + gasto);
    }
}

function registrarGasto() {
    const nuevoGasto = Number(prompt("Ingresá el importe del gasto:"));

    if (isNaN(nuevoGasto) || nuevoGasto <= 0) {
        alert("Ingresá un importe válido.");
        return;
    }

    if (nuevoGasto > saldoPresupuesto) {
        alert("ADVERTENCIA: El gasto supera el presupuesto disponible.");
        return;
    }

    saldoPresupuesto = calcularSaldo(saldoPresupuesto, nuevoGasto);
    gastosRegistrados.push(nuevoGasto);

    console.log("Gasto registrado correctamente: " + moneda + nuevoGasto);
    mostrarSaldo(saldoPresupuesto);
}

function buscarGasto() {
    const gastoABuscar = Number(prompt("¿Qué importe querés buscar?"));

    if (gastosRegistrados.includes(gastoABuscar)) {
        const posicion = gastosRegistrados.indexOf(gastoABuscar);

        console.log(
            "El gasto de " + moneda + gastoABuscar +
            " está registrado en la posición " + posicion
        );
    } else {
        console.log("Ese gasto no está registrado.");
    }
}

function modificarGasto() {
    const gastoAnterior = Number(prompt("¿Qué gasto querés modificar?"));

    if (!gastosRegistrados.includes(gastoAnterior)) {
        console.log("Ese gasto no está registrado.");
        return;
    }

    const posicion = gastosRegistrados.indexOf(gastoAnterior);
    const gastoNuevo = Number(prompt("Ingresá el nuevo importe:"));

    const saldoDisponible = saldoPresupuesto + gastoAnterior;

    if (isNaN(gastoNuevo) || gastoNuevo <= 0 || gastoNuevo > saldoDisponible) {
        console.log("El nuevo importe no es válido o supera el presupuesto disponible.");
        return;
    }

    gastosRegistrados.splice(posicion, 1, gastoNuevo);

    saldoPresupuesto = saldoDisponible - gastoNuevo;

    console.log("Gasto actualizado correctamente.");
    mostrarSaldo(saldoPresupuesto);
}

function eliminarGasto() {
    if (gastosRegistrados.length === 0) {
        console.log("Todavía no hay gastos para eliminar.");
        return;
    }

    const gastoEliminado = gastosRegistrados.pop();

    saldoPresupuesto = saldoPresupuesto + gastoEliminado;

    console.log("Se eliminó el gasto de " + moneda + gastoEliminado);
    mostrarSaldo(saldoPresupuesto);
}

function registrarGastoInicial() {
    const gastoInicial = Number(prompt("Ingresá el importe del gasto:"));

    if (isNaN(gastoInicial) || gastoInicial <= 0 || gastoInicial > saldoPresupuesto) {
        alert("El importe no es válido o supera el saldo disponible.");
        return;
    }

    gastosRegistrados.unshift(gastoInicial);

    saldoPresupuesto = calcularSaldo(saldoPresupuesto, gastoInicial);

    console.log("Gasto agregado al principio del listado.");
    mostrarSaldo(saldoPresupuesto);
}

// INICIO DEL PROGRAMA

alert("¡HOLA!\nBienvenido a " + Proyecto);

presupuesto = Number(prompt("¿Cuánto dinero dispondrás en el presupuesto?"));

while (isNaN(presupuesto) || presupuesto <= 0) {
    presupuesto = Number(prompt("Ingresá un presupuesto válido mayor a cero:"));
}

saldoPresupuesto = presupuesto;

console.log("Se estableció el presupuesto: " + moneda + presupuesto);

// MENÚ PRINCIPAL

do {
    opc = Number(prompt(
        "INGRESÁ UNA OPCIÓN:\n" +
        "1. Registrar gasto.\n" +
        "2. Consultar saldo.\n" +
        "3. Mostrar gastos registrados.\n" +
        "4. Buscar un gasto.\n" +
        "5. Modificar un gasto.\n" +
        "6. Eliminar último gasto.\n" +
        "7. Registrar gasto al principio.\n" +
        "8. Salir."
    ));

    switch (opc) {
        case 1:
            registrarGasto();
            break;

        case 2:
            mostrarSaldo(saldoPresupuesto);
            break;

        case 3:
            mostrarGastos(gastosRegistrados);
            break;

        case 4:
            buscarGasto();
            break;

        case 5:
            modificarGasto();
            break;

        case 6:
            eliminarGasto();
            break;

        case 7:
            registrarGastoInicial();
            break;

        case 8:
            console.log("Gracias por utilizar " + Proyecto + ".");
            break;

        default:
            alert("Opción no válida. Intentá nuevamente.");
    }

} while (opc !== 8);
