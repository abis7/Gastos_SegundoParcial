import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const CATEGORIAS = [
    { label: 'Todas', value: '' },
    { label: 'Suscripciones', value: 'suscripciones' },
    { label: 'Salud', value: 'salud' },
    { label: 'Ocio', value: 'ocio' },
    { label: 'Ahorro', value: 'ahorro' },
    { label: 'Comida', value: 'comida' },
    { label: 'Casa', value: 'casa' },
    { label: 'Gastos Varios', value: 'gastos' },
];

const ListadoGastos = ({ gastos, setGastoEditar, setModal, filtro, setFiltro }) => {
    const [modalFiltro, setModalFiltro] = useState(false);

    const configCategorias = {
        suscripciones: { 
            color: '#8b5cf6', 
            label: 'Suscripciones',
            renderIcon: () => <MaterialCommunityIcons name="play-circle-outline" size={35} color="white" />
        },
        salud: { 
            color: '#ef4444', 
            label: 'Salud',
            renderIcon: () => <FontAwesome5 name="plus" size={25} color="white" />
        },
        ocio: { 
            color: '#eab308', 
            label: 'Ocio',
            renderIcon: () => <MaterialCommunityIcons name="gamepad-variant-outline" size={35} color="white" />
        },
        ahorro: { 
            color: '#10b981', 
            label: 'Ahorro',
            renderIcon: () => <MaterialCommunityIcons name="piggy-bank-outline" size={32} color="white" />
        },
        comida: { 
            color: '#ec4899', 
            label: 'Comida',
            renderIcon: () => <MaterialCommunityIcons name="apple" size={32} color="white" />
        },
        casa: { 
            color: '#f97316', 
            label: 'Casa',
            renderIcon: () => <MaterialCommunityIcons name="home-outline" size={35} color="white" />
        },
        gastos: { 
            color: '#6b7280', 
            label: 'Gastos Varios',
            renderIcon: () => <MaterialCommunityIcons name="cash-multiple" size={32} color="white" />
        }
    };

    const formatearFecha = (fechaMS) => {
        const fecha = new Date(fechaMS);
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        return fecha.toLocaleDateString('es-ES', opciones);
    }

    const labelFiltro = CATEGORIAS.find(c => c.value === filtro)?.label || 'Todas';

    const renderGastoItem = ({ item }) => {
        const config = configCategorias[item.categoria] || { 
            color: '#3b82f6', 
            label: item.categoria,
            renderIcon: () => <MaterialCommunityIcons name="bookmark-outline" size={30} color="white" />
        };

        return (
            <Pressable 
                style={styles.gastoCard} 
                onPress={() => {
                    setGastoEditar(item);
                    setModal(true);
                }}
            >
                <View style={styles.contenido}>
                    <View style={[styles.iconoCirculo, { backgroundColor: config.color }]}>
                        {config.renderIcon()}
                    </View>
                    <View style={styles.textoContenedor}>
                        <Text style={styles.categoriaText}>{config.label}</Text>
                        <Text style={styles.nombreText}>{item.nombre}</Text>
                        <Text style={styles.fechaText}>{formatearFecha(item.fecha)}</Text>
                    </View>
                </View>
                <Text style={styles.gastoCantidadText}>${item.cantidad.toFixed(2)}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.filtroContenedor}>
                <Text style={styles.filtroTitulo}>Filtrar Gastos</Text>
                <Pressable style={styles.filtroBtn} onPress={() => setModalFiltro(true)}>
                    <Text style={filtro ? styles.filtroTextoActivo : styles.filtroTexto}>{labelFiltro}</Text>
                    <Text style={styles.flecha}>▼</Text>
                </Pressable>
                {filtro ? (
                    <Pressable style={styles.btnLimpiar} onPress={() => setFiltro('')}>
                        <Text style={styles.btnLimpiarTexto}>✕ Limpiar filtro</Text>
                    </Pressable>
                ) : null}
            </View>

            <Modal visible={modalFiltro} transparent animationType='slide'>
                <TouchableOpacity style={styles.overlay} onPress={() => setModalFiltro(false)} />
                <View style={styles.modalSheet}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitulo}>Filtrar por categoría</Text>
                        <Pressable onPress={() => setModalFiltro(false)}>
                            <Text style={styles.modalCerrar}>✕</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        {CATEGORIAS.map((cat) => (
                            <Pressable
                                key={cat.value}
                                style={[styles.opcion, filtro === cat.value && styles.opcionSeleccionada]}
                                onPress={() => {
                                    setFiltro(cat.value);
                                    setModalFiltro(false);
                                }}
                            >
                                <Text style={[styles.opcionTexto, filtro === cat.value && styles.opcionTextoSeleccionado]}>
                                    {cat.label}
                                </Text>
                                {filtro === cat.value && <Text style={styles.check}>✓</Text>}
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <Text style={styles.titulo}>Gastos</Text>
            {gastos.length === 0 ? (
                <Text style={styles.noGastos}>{filtro ? 'No hay gastos en esta categoría' : 'No Hay Gastos'}</Text>
            ) : (
                <FlatList
                    data={gastos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderGastoItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: { marginHorizontal: 20, marginTop: 20, flex: 1, paddingBottom: 40 },
    filtroContenedor: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 5, elevation: 2 },
    filtroTitulo: { color: '#64748b', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    filtroBtn: { backgroundColor: '#f5f5f5', padding: 14, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    filtroTexto: { fontSize: 16, color: '#bababa' },
    filtroTextoActivo: { fontSize: 16, color: '#3b82f6', fontWeight: 'bold' },
    flecha: { color: '#64748b', fontSize: 14 },
    btnLimpiar: { marginTop: 10, alignItems: 'center' },
    btnLimpiarTexto: { color: '#db2777', fontWeight: 'bold', fontSize: 14 },
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
    titulo: { color: '#64748b', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
    noGastos: { textAlign: 'center', fontSize: 18, color: '#94a3b8', marginTop: 40 },
    gastoCard: { backgroundColor: '#fff', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 5, elevation: 2 },
    contenido: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    iconoCirculo: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    textoContenedor: { justifyContent: 'center', flex: 1 },
    categoriaText: { color: '#94a3b8', fontSize: 13, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 3 },
    nombreText: { color: '#334155', fontSize: 20, fontWeight: 'bold', marginBottom: 3 },
    fechaText: { color: '#db2777', fontSize: 14, fontWeight: '600' },
    gastoCantidadText: { fontSize: 20, fontWeight: 'bold', color: '#334155', marginLeft: 10 }
});

export default ListadoGastos;