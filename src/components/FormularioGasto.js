import { View, Text, Pressable, StyleSheet, TextInput, Alert, Platform, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

const CATEGORIAS = [
    { label: 'Suscripciones', value: 'suscripciones' },
    { label: 'Salud', value: 'salud' },
    { label: 'Ocio', value: 'ocio' },
    { label: 'Ahorro', value: 'ahorro' },
    { label: 'Comida', value: 'comida' },
    { label: 'Casa', value: 'casa' },
    { label: 'Gastos Varios', value: 'gastos' },
];

const FormularioGasto = ({ handleGasto, setModal, gastoEditar, eliminarGasto, disponible }) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState(null);
    const [modalCategoria, setModalCategoria] = useState(false);

    useEffect(() => {
        if(gastoEditar?.nombre) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad.toString());
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
        }
    }, [gastoEditar]);

    const handleFormulario = () => {
        if ([nombre, cantidad, categoria].includes('') || categoria === '') {
            lanzarAlerta("Error", "Todos los campos son obligatorios");
            return;
        }
        const cantidadNumerica = Number(cantidad);
        if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
            lanzarAlerta("Error", "La cantidad debe ser mayor a 0");
            return;
        }
        const cantidadAnterior = gastoEditar?.cantidad ? Number(gastoEditar.cantidad) : 0;
        const disponibleReal = disponible + cantidadAnterior;
        if (cantidadNumerica > disponibleReal) {
            lanzarAlerta("Error", `Fondos insuficientes. Solo te quedan $${disponibleReal}`);
            return;
        }
        handleGasto({ nombre, cantidad: cantidadNumerica, categoria, id: id || Date.now(), fecha: gastoEditar?.fecha || Date.now() });
        setModal(false);
    }

    const lanzarAlerta = (titulo, mensaje) => {
        if (Platform.OS === 'web') {
            window.alert(`${titulo}: ${mensaje}`);
        } else {
            Alert.alert(titulo, mensaje);
        }
    }

    const labelCategoria = CATEGORIAS.find(c => c.value === categoria)?.label || 'Seleccione';

    return (
        <View style={style.contenedor}>
            <View style={style.btnContenedorHeader}>
                <Pressable style={style.btnCancelar} onPress={() => setModal(false)}>
                    <Text style={style.btnTexto}>CANCELAR</Text>
                </Pressable>
                {id ? (
                    <Pressable style={style.btnEliminar} onPress={() => eliminarGasto(id)}>
                        <Text style={style.btnTexto}>ELIMINAR</Text>
                    </Pressable>
                ) : null}
            </View>

            <Text style={style.titulo}>{id ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

            <Text style={style.label}>Nombre Gasto</Text>
            <TextInput
                style={style.input}
                placeholderTextColor={"#bababa"}
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={style.label}>Cantidad Gasto</Text>
            <TextInput
                style={style.input}
                keyboardType='numeric'
                placeholderTextColor={"#bababa"}
                value={cantidad}
                onChangeText={setCantidad}
            />

            <Text style={style.label}>Categoría Gasto</Text>

            <Pressable style={style.selectorBtn} onPress={() => setModalCategoria(true)}>
                <Text style={categoria ? style.selectorTexto : style.selectorPlaceholder}>
                    {labelCategoria}
                </Text>
                <Text style={style.flecha}>▼</Text>
            </Pressable>

            <Modal visible={modalCategoria} transparent animationType='slide'>
                <TouchableOpacity style={style.overlay} onPress={() => setModalCategoria(false)} />
                <View style={style.modalSheet}>
                    <View style={style.modalHeader}>
                        <Text style={style.modalTitulo}>Selecciona categoría</Text>
                        <Pressable onPress={() => setModalCategoria(false)}>
                            <Text style={style.modalCerrar}>✕</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        {CATEGORIAS.map((cat) => (
                            <Pressable
                                key={cat.value}
                                style={[style.opcion, categoria === cat.value && style.opcionSeleccionada]}
                                onPress={() => {
                                    setCategoria(cat.value);
                                    setModalCategoria(false);
                                }}
                            >
                                <Text style={[style.opcionTexto, categoria === cat.value && style.opcionTextoSeleccionado]}>
                                    {cat.label}
                                </Text>
                                {categoria === cat.value && <Text style={style.check}>✓</Text>}
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <Pressable style={style.boton} onPress={handleFormulario}>
                <Text style={style.btnTexto}>{id ? 'GUARDAR CAMBIOS GASTO' : 'AGREGAR GASTO'}</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: { backgroundColor: '#fff', flex: 1, paddingHorizontal: 20, paddingTop: 40 },
    btnContenedorHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    btnCancelar: { backgroundColor: "#db2777", padding: 12, borderRadius: 5, flex: 1, marginRight: 5 },
    btnEliminar: { backgroundColor: "red", padding: 12, borderRadius: 5, flex: 1, marginLeft: 5 },
    titulo: { textAlign: "center", fontSize: 32, color: "#64748b", fontWeight: "bold", marginBottom: 30 },
    label: { color: "#64748b", fontWeight: "bold", fontSize: 16, textTransform: "uppercase", marginBottom: 10 },
    input: { backgroundColor: "#f5f5f5", padding: 14, borderRadius: 10, marginBottom: 25, fontSize: 16 },
    selectorBtn: { backgroundColor: "#f5f5f5", padding: 14, borderRadius: 10, marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    selectorTexto: { fontSize: 16, color: '#333' },
    selectorPlaceholder: { fontSize: 16, color: '#bababa' },
    flecha: { color: '#64748b', fontSize: 14 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
    modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 40, maxHeight: '60%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    modalTitulo: { fontSize: 18, fontWeight: 'bold', color: '#334155' },
    modalCerrar: { fontSize: 18, color: '#94a3b8' },
    opcion: { padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    opcionSeleccionada: { backgroundColor: '#eff6ff' },
    opcionTexto: { fontSize: 16, color: '#334155' },
    opcionTextoSeleccionado: { color: '#3b82f6', fontWeight: 'bold' },
    check: { color: '#3b82f6', fontSize: 18, fontWeight: 'bold' },
    boton: { backgroundColor: "#3b82f6", padding: 16, borderRadius: 5, marginTop: 10 },
    btnTexto: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }
})

export default FormularioGasto