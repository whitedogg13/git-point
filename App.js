import React, { Component } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  LayoutAnimation,
} from 'react-native';
import { persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';
import codePush from 'react-native-code-push';

import { colors } from 'config';
import { GitPoint } from './routes';
import { configureStore } from './root.store';

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

if (console) {
  console.disableYellowBox = true; // eslint-disable-line no-console
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      rehydrated: false,
    };

    const networkInterface = createNetworkInterface({
      uri: 'https://api.github.com/graphql',
    });

    this.client = new ApolloClient({ networkInterface });
  }

  componentWillMount() {
    const encryptor = createEncryptor({
      secretKey: md5(DeviceInfo.getUniqueID()),
    });

    persistStore(
      configureStore(this.client),
      { storage: AsyncStorage, transforms: [encryptor] },
      () => {
        this.setState({ rehydrated: true });
      }
    );
  }

  componentDidMount() {
    if (!__DEV__) {
      codePush.sync({
        updateDialog: false,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./src/assets/logo-black.png')}
          />
        </View>
      );
    }

    return (
      <ApolloProvider store={configureStore(this.client)} client={this.client}>
        <GitPoint onNavigationStateChange={null} />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GitPoint', () => App);
