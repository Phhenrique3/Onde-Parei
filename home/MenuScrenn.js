import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const botoes = [
    { title: "salva Vaga atual", icon: "save", tela: "salvaVaga" },
    {title: 'Ver vaga Salva', icon: "eye", tela: 'VerVaga'},
    {title: 'ver no mapa', icon: "car-sport", tela:"Mapa"},
    {title: "Limpar Vagar", icon:"trash", tela:"LimparVaga"}, 
];
export default function MenuSreen({ navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} > 🚗 Ondeu Estacionei ? </Text>
      <View style={styles.menu} >
        {botoes.map((botao, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.botao,
              { backgroundColor: pressed ? "#005c99" : "#0080ff" },
            ]}
            onPress={() => navigation.navigate(botao.tela)}
          >
            <FontAwesome5
              name={botao.icon}
              size={20}
              color="#fff"
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>{botao.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', backgroundColor: '#f2f2f2', paddingHorizontal: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#333' },
  menu: { width: '100%', gap: 15 },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#0080ff',
    elevation: 3,
  },
  textoBotao: { fontSize: 16, color: '#fff', fontWeight: '600' },
  icone: { marginRight: 12 },
})