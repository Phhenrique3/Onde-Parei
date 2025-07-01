import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function VagaScreen({ navigation }) {
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarVaga();
  }, []);

  const carregarVaga = async () => {
    try {
      const vagaSalva = await AsyncStorage.getItem('vagaSalva');
      if (vagaSalva) setVaga(JSON.parse(vagaSalva));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a vaga.');
    }
  };

  const salvarVagaAtual = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o uso da localização para salvar a vaga.');
        setLoading(false);
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
    setLoading(false);
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
    if (!vaga) return;
    if (navigation && navigation.navigate) {
      navigation.navigate('MapaScreen'); // Ajuste o nome se sua tela de mapa for diferente
    } else {
      const url = `https://www.google.com/maps?q=${vaga.latitude},${vaga.longitude}`;
      Linking.openURL(url);
    }
  };

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
      {vaga ? (
        <>
          <Text style={styles.titulo}>🚗 Vaga salva em:</Text>
          <Text style={styles.dataHora}>{new Date(vaga.dataHora).toLocaleString()}</Text>

          <View style={styles.mapaMini}>
            <MapView
              style={{ flex: 1, borderRadius: 15 }}
              initialRegion={{
                latitude: vaga.latitude,
                longitude: vaga.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={{ latitude: vaga.latitude, longitude: vaga.longitude }}>
                <Ionicons name="car-sport" size={20} color="red" />
              </Marker>
            </MapView>
          </View>

          {loading && <ActivityIndicator size="large" color="#0080ff" style={{ marginVertical: 20 }} />}

          <Botao title="Ver no Mapa" onPress={abrirNoMapa} />
          <Botao title="Limpar Vaga" onPress={limparVaga} color="#d9534f" />
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Nenhuma vaga salva</Text>
          {loading && <ActivityIndicator size="large" color="#0080ff" style={{ marginVertical: 20 }} />}
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
    marginBottom: 20,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  mapaMini: {
    width: '100%',
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
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
