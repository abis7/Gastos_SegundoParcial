import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const ControlPresupuesto = ({ presupuesto, gastos }) => {
    const [disponible, setDisponible] = useState(presupuesto);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
        setGastado(totalGastado);
        setDisponible(Number(presupuesto) - totalGastado);
    }, [gastos]);

    return (
        <View style={style.contenedor}>
            <Text style={style.titulo}>Progreso de Gastos</Text>
            <Text style={style.dato}>
                <Text style={style.label}>Presupuesto: </Text>${presupuesto}
            </Text>
            <Text style={style.dato}>
                <Text style={style.label}>Disponible: </Text>${disponible}
            </Text>
            <Text style={style.dato}>
                <Text style={style.label}>Gastado: </Text>${gastado}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    titulo: {
        textAlign: "center",
        fontSize: 18,
        color: "#94a3b8",
        fontWeight: "bold",
        marginBottom: 20
    },
    dato: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 10,
        color: "#000"
    },
    label: {
        color: "#3b82f6",
        fontWeight: "bold",
    }
})

export default ControlPresupuesto