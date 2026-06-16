import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';

export default function App() {
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState([]);

  const handlePresupuesto = () => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert("Presupuesto inválido", "Ingresa un número mayor a 0");
    }
  };

  const handleGasto = (gasto) => {
    setGastos([...gastos, gasto]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        {isValidPresupuesto ? (
          <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handlePresupuesto={handlePresupuesto}
          />
        )}
      </View>

      {isValidPresupuesto && (
        <View style={styles.body}>
          <FormularioGasto handleGasto={handleGasto} />
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: "#3b82f6",
    paddingBottom: 30,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  }
});