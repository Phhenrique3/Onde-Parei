import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, StyleSheet, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function VagaSreen({ navigation }) {
  const [Vaga, setVaga] = useState(null);

  useEffect(() => {
    carregarVaga();
  }, []);

  const carregarVaga = async () => {
    try {
      const vagaSalva = await AsyncStorage.getItem('vagaSalva');
      if (vagaSalva) {
        setVaga(JSON.parse(vagaSalva));
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a vaga.');
    }
  };
  
  const salvarVagaAtual = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o uso da localização para salvar a vaga.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const novaVaga = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        dataHora: new Date().toISOString(),
      };
      await AsyncStorage.setItem('vagaSalva', JSON.stringify(novaVaga));
      setVaga(novaVaga);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a vaga.');
    }
  };
  const limparVaga = async () => {
    try {
      await AsyncStorage.removeItem('vagaSalva');
      setVaga(null);
    } catch {
      Alert.alert('Erro', 'Não foi possível limpar a vaga.');
    }
  };

  const abrirNoMapa = () => {
    if (!Vaga) return;
    const url = `https://www.google.com/maps?q=${Vaga.latitude},${Vaga.longitude}`;
    Linking.openURL(url);
  };

  // Botão customizado com efeito pressionado
  const Botao = ({ onPress, title, color = '#0080ff' }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#005c99' : color,
          opacity: pressed ? 0.8 : 1,
        },
        styles.botao,
      ]}
    >
      <Text style={styles.textoBotao}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {Vaga ? (
        <>
          <Text style={styles.titulo}>🚗 Vaga salva em:</Text>
          <Text style={styles.dataHora}>{new Date(Vaga.dataHora).toLocaleString()}</Text>

          <Botao title="Ver no Mapa" onPress={abrirNoMapa} />

          <Botao title="Limpar Vaga" onPress={limparVaga} color="#d9534f" />
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Nenhuma vaga salva</Text>
          <Botao title="Salvar Vaga Atual" onPress={salvarVagaAtual} />
        </>
      )}
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  dataHora: {
    fontSize: 18,
    marginBottom: 40,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  botao: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
