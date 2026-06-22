import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Svg, { Circle } from 'react-native-svg'

const ControlPresupuesto = ({ presupuesto, gastos, reiniciarApp }) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
        const totalDisponible = Number(presupuesto) - totalGastado;
        const nuevoPorcentaje = presupuesto > 0 ? ((totalGastado / Number(presupuesto)) * 100).toFixed(0) : 0;
        setGastado(totalGastado);
        setDisponible(totalDisponible);
        setPorcentaje(nuevoPorcentaje);
    }, [gastos, presupuesto]);

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const radio = 60;
    const circunferencia = 2 * Math.PI * radio;
    const progreso = circunferencia - (porcentaje / 100) * circunferencia;
    const colorProgreso = porcentaje >= 90 ? '#ef4444' : porcentaje >= 70 ? '#f97316' : '#3b82f6';

    return (
        <View style={style.contenedor}>
            <View style={style.graficaContenedor}>
               
                <View style={style.textoCirculo}>
                    <Text style={[style.porcentajeText, { color: colorProgreso }]}>{porcentaje}%</Text>
                    <Text style={style.porcentajeLabel}>Gastado</Text>
                </View>
            </View>

            <Pressable style={style.btnReiniciar} onPress={reiniciarApp}>
                <Text style={style.btnReiniciarTexto}>Reiniciar App</Text>
            </Pressable>

            <View style={style.contenedorTexto}>
                <Text style={style.dato}><Text style={style.labelTexto}>Presupuesto: </Text>{formatearCantidad(presupuesto)}</Text>
                <Text style={style.dato}><Text style={style.labelTexto}>Disponible: </Text>{formatearCantidad(disponible)}</Text>
                <Text style={style.dato}><Text style={style.labelTexto}>Gastado: </Text>{formatearCantidad(gastado)}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: { backgroundColor: "#fff", borderRadius: 10, padding: 20, marginHorizontal: 20, elevation: 10 },
    graficaContenedor: { alignItems: 'center', justifyContent: 'center', marginVertical: 15 },
    textoCirculo: { position: 'absolute', alignItems: 'center' },
    porcentajeText: { fontSize: 32, fontWeight: 'bold' },
    porcentajeLabel: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
    btnReiniciar: { backgroundColor: '#db2777', padding: 10, borderRadius: 5, marginBottom: 15 },
    btnReiniciarTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' },
    dato: { fontSize: 18, marginBottom: 8, color: "#000" },
    labelTexto: { color: "#3b82f6", fontWeight: "bold" }
})

export default ControlPresupuesto