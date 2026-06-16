import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

const FormularioGasto = ({ handleGasto }) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');

    const agregarGasto = () => {
        if (nombre.trim() === '' || cantidad.trim() === '') {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        handleGasto({ nombre, cantidad });
        setNombre('');
        setCantidad('');
    }

    return (
        <View style={style.contenedor}>
            <Text style={style.titulo}>Nuevo Gasto</Text>

            <Text style={style.label}>Nombre Gasto</Text>
            <TextInput
                style={style.input}
                placeholder='Ej. Comida, Transporte, Ropa'
                placeholderTextColor={"#bababa"}
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={style.label}>Cantidad Gasto</Text>
            <TextInput
                style={style.input}
                keyboardType='numeric'
                placeholder='Ej. 300'
                placeholderTextColor={"#bababa"}
                value={cantidad}
                onChangeText={setCantidad}
            />

            <Pressable style={style.boton} onPress={agregarGasto}>
                <Text style={style.btnTexto}>Agregar Gasto</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    titulo: {
        textAlign: "center",
        fontSize: 32,
        color: "#3b82f6",
        fontWeight: "bold",
        marginBottom: 20
    },
    label: {
        color: "#3b82f6",
        fontWeight: "bold",
        fontSize: 13,
        textTransform: "uppercase",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#f5f5f5",
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    boton: {
        backgroundColor: "#1048A4",
        padding: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    btnTexto: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    }
})

export default FormularioGasto