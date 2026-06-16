import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, handlePresupuesto }) => {
    return (
        <View style={style.contenedor}>
            <Text style={style.label}>Agregar presupuesto</Text>
            <TextInput
                style={style.input}
                keyboardType='numeric'
                placeholder='Agrega un presupuesto'
                placeholderTextColor={"#bababa"}
                value={presupuesto}
                onChangeText={setPresupuesto}
            />
            <Pressable style={style.boton} onPress={handlePresupuesto}>
                <Text style={style.btnTexto}>Agregar presupuesto</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 40,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    label: {
        textAlign: "center",
        fontSize: 30,
        color: "#3b82f6",
        marginBottom: 10
    },
    input: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        marginTop: 30
    },
    boton: {
        marginTop: 30,
        backgroundColor: "#1048A4",
        padding: 10,
        borderRadius: 10,
    },
    btnTexto: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    }
})

export default NuevoPresupuesto