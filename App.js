import React from 'react';
import { Platform, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';
import Weather from './components/Weather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: '',
      todos: []
    }
  }

  render() {
    const statusBar = (Platform.OS === 'ios') ? <View style={styles.statusBar}></View> : <View></View>;
    return (
      // <SafeAreaView>
      <View style={styles.container}>
        {statusBar}
        <Header title="Open First"/>
        <Weather />
        <InputBar 
          textChange={todoInput => this.setState({ todoInput })}
          addNewTodo={() => {this._addNewTodo()}}
          todoInput={this.state.todoInput}
        />
        <FlatList 
          data={this.state.todos} 
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem 
                todoItem={item}
                toggleDone={() => {
                  this._toggleDone(item)
                }}
                removeTodo={() => {
                  this._removeTodo(item)
                }}
              />
            )
          }}
        />
      </View>
      // </SafeAreaView>
    );
  }

  _addNewTodo = () => {
    let todos = this.state.todos;
    todos.unshift({
      id: todos.length,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    });
  }

  _toggleDone = (item) => {
    let todos = this.state.todos;
    todos = todos.map((todo) => {
      if (todo.id === item.id) {
        todo.done = !todo.done;
      };
      return todo;
    })
    this.setState({
      todos
    })
  }

  _removeTodo = (item) => {
    let todos = this.state.todos;
    todos = todos.filter((todo) => 
      item.id !== todo.id
    );
    this.setState({
      todos
    });
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 20
  }
});
