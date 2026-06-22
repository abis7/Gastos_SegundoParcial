import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const ListadoGastos = ({ gastos, setGastoEditar, setModal }) => {
    
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
            renderIcon: () => <MaterialCommunityIcons name="apple" size={32} color="white" /> // Icono de la manzana idéntico
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
            <Text style={styles.titulo}>Gastos</Text>
            {gastos.length === 0 ? (
                <Text style={styles.noGastos}>No Hay Gastos</Text>
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
    titulo: { color: '#64748b', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
    noGastos: { textAlign: 'center', fontSize: 18, color: '#94a3b8', marginTop: 40 },
    gastoCard: { 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2
    },
    contenido: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    iconoCirculo: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    textoContenedor: { justifyContent: 'center', flex: 1 },
    categoriaText: { color: '#94a3b8', fontSize: 13, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 3 },
    nombreText: { color: '#334155', fontSize: 20, fontWeight: 'bold', marginBottom: 3 },
    fechaText: { color: '#db2777', fontSize: 14, fontWeight: '600' },
    gastoCantidadText: { fontSize: 20, fontWeight: 'bold', color: '#334155', marginLeft: 10 }
});

export default ListadoGastos;