import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface IMyComponentProps {
}

interface IMyComponentState {
  isLoading: boolean,
  dataSource?: string[],
}

export default class App extends React.Component<IMyComponentProps, IMyComponentState> {
  
  constructor(props: any) {
    super(props);
    this.state = { isLoading: true};
  }

  componentDidMount(){
    return axios.get('http://localhost:3000')
      .then((response) => response.data)
      .then((responseString) => {
        console.log(this);
        this.setState({
          isLoading: false,
          dataSource: responseString
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {this.state.dataSource.map(d => <Text>{d["title"]}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});