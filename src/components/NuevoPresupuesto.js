import { View, Text, Pressable, StyleSheet, TextInput, Alert, Platform } from 'react-native'
import React from 'react'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, handlePresupuesto }) => {

    const validarPresupuesto = () => {
        if (Number(presupuesto) <= 0 || isNaN(Number(presupuesto))) {
            if (Platform.OS === 'web') {
                window.alert('Error: El Presupuesto no puede ser 0 o menor');
            } else {
                Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor');
            }
            return;
        }
        handlePresupuesto();
    }

    return (
        <View style={style.contenedor}>
            <Text style={style.label}>Definir Presupuesto</Text>
            <TextInput
                style={style.input}
                keyboardType='numeric'
                placeholderTextColor={"#bababa"}
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />
            <Pressable style={style.boton} onPress={validarPresupuesto}>
                <Text style={style.btnTexto}>Agregar presupuesto</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 20, paddingVertical: 40, marginHorizontal: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
    label: { textAlign: "center", fontSize: 24, color: "#3b82f6", fontWeight: 'bold', marginBottom: 10 },
    input: { backgroundColor: "#f5f5f5", padding: 12, borderRadius: 10, textAlign: "center", marginTop: 10, fontSize: 18 },
    boton: { marginTop: 20, backgroundColor: "#1048A4", padding: 14, borderRadius: 10 },
    btnTexto: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }
})

export default NuevoPresupuesto