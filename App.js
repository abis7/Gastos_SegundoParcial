import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Modal, Pressable, Text, Alert, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';

export default function App() {
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [disponible, setDisponible] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
    setDisponible(Number(presupuesto) - totalGastado);
  }, [gastos, presupuesto]);

  const handlePresupuesto = () => {
    setIsValidPresupuesto(true);
  };

  const handleGasto = (gasto) => {
    if(gasto.id && gastos.some(g => g.id === gasto.id)) {
       const gastosActualizados = gastos.map(g => g.id === gasto.id ? gasto : g);
       setGastos(gastosActualizados);
       setGastoEditar({});
    } else {
       setGastos([...gastos, gasto]);
    }
  };

  const eliminarGasto = (id) => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm("¿Deseas eliminar este gasto?");
      if (confirmar) ejecutarEliminar(id);
    } else {
      Alert.alert("¿Deseas eliminar este gasto?", [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => ejecutarEliminar(id) }
      ]);
    }
  }

  const ejecutarEliminar = (id) => {
    const gastosActualizados = gastos.filter(g => g.id !== id);
    setGastos(gastosActualizados);
    setModal(false);
    setGastoEditar({});
  }

  const reiniciarApp = () => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm("¿Deseas reiniciar la app?");
      if (confirmar) ejecutarReinicio();
    } else {
      Alert.alert("¿Deseas reiniciar la app?", [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', style: 'destructive', onPress: ejecutarReinicio }
      ]);
    }
  }

  const ejecutarReinicio = () => {
    setPresupuesto('');
    setGastos([]);
    setIsValidPresupuesto(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        {isValidPresupuesto ? (
          <ControlPresupuesto 
            presupuesto={presupuesto} 
            gastos={gastos} 
            reiniciarApp={reiniciarApp}
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handlePresupuesto={handlePresupuesto}
          />
        )}
      </View>

      {isValidPresupuesto ? (
        <View style={styles.body}>
          <ListadoGastos 
             gastos={gastos} 
             setGastoEditar={setGastoEditar}
             setModal={setModal}
          />
          
          <Pressable 
            style={styles.btnAgregarGasto} 
            onPress={() => {
              setGastoEditar({});
              setModal(true);
            }}
          >
            <Text style={styles.txtAgregarGasto}>+</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal animationType='slide' visible={modal}>
         <FormularioGasto 
            handleGasto={handleGasto} 
            setModal={setModal}
            gastoEditar={gastoEditar}
            eliminarGasto={eliminarGasto}
            disponible={disponible}
         />
      </Modal>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: "#3b82f6", paddingBottom: 40 },
  body: { flex: 1 },
  btnAgregarGasto: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00adef',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  txtAgregarGasto: { fontSize: 32, color: '#fff', fontWeight: 'bold', lineHeight: 35 }
});