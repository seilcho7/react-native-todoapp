import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: '',
      todos: [
        { id: 0, title: 'Take out the trash', done: false },
        { id: 1, title: 'Cook dinner', done: false }
      ]
    }
  }

  render() {
    // console.log(this.state);
    const statusBar = (Platform.OS === 'ios') ? <View style={styles.statusBar}></View> : <View></View>;
    return (
      <View style={styles.container}>
        {statusBar}
        <Header title="To Do App"/>
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
    backgroundColor: '#FFCE00',
    height: 20
  }
});
