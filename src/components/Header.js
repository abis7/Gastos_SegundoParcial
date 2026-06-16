import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={style.texto}>Planificador</Text>
    </View>
  )
}

const style= StyleSheet.create({
    texto:{
        textAlign: 'center',
        fontSize:20,
        color: "#fff",
        textTransform:'uppercase',
        fontWeight: 'bold',
        paddingTop:20,
    }

})
export default Header