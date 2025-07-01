# Onde Parei

Aplicativo React Native para salvar e visualizar a localização onde você estacionou seu carro.

## Funcionalidades

- **Salvar vaga atual:** Salve a localização GPS do seu estacionamento com um toque.
- **Ver vaga salva:** Veja os detalhes da última vaga salva (data, hora e localização).
- **Ver no mapa:** Visualize a vaga salva em um mapa interativo.
- **Limpar vaga:** Remova a vaga salva do histórico.

## Telas

- **Menu:** Tela inicial com navegação para todas as funções principais.
- **Salvar/Ver/Limpar Vaga:** Tela para salvar, visualizar ou limpar a vaga estacionada.
- **Mapa:** Mostra a localização salva em um mapa.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd onde-Parei
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Inicie o projeto:
   ```bash
   npm start
   # ou
   yarn start
   ```
4. Siga as instruções do Expo para rodar no seu dispositivo ou emulador.

## Estrutura de Pastas

- `App.js` — Arquivo principal, configura a navegação.
- `home/` — Telas do app:
  - `MenuScrenn.js` — Menu principal.
  - `VagaScreen.js` — Salvar, ver e limpar vaga.
  - `MapaScreen.js` — Visualização no mapa.
- `assets/` — Ícones e imagens.

## Observações
- O app solicita permissão de localização para salvar a vaga.
- A localização é salva localmente no dispositivo.

## Licença

Este projeto é livre para uso educacional.
