import React from 'react';
import {
  View, Button, Linking,
  StyleSheet, Text, TextInput,
} from 'react-native';

class LoginForm extends React.Component {

  constructor(){
    super();
    this.state = {
      email: '',
      subject: '',
      content: '',
    }
  }

  getInitialState = () => {
    this.setState({
      email: '',
      subject: '',
      content: '',
    })
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    input: {
      backgroundColor: '#ffffff',
      borderRadius: 2,
    },
  });

  handleEmailChange = email => {
    this.setState({
      email,
    });
  }

  handleContentChange = content => {
    this.setState({
      content,
    });
  }

  handleSubjectChange = subject => {
    this.setState({
      subject,
    });
  }

  renderForm = () => {
    return (
      <View style={this.styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={this.styles.input}
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <Text>Subject:</Text>
        <TextInput
          style={this.styles.input}
          value={this.state.subject}
          onChangeText={this.handleSubjectChange}
        />
        <Text>Content:</Text>
        <TextInput
          style={this.styles.input}
          value={this.state.content}
          onChangeText={this.handleContentChange}
          multiline
        />
      </View>
    )
  };

  render(){
    return(
      <View style={{flex: 1}}>
        {this.renderForm()}
        <Button
          title='Send Mail'
          onPress={() => {
            const subject = this.state.subject;
            const content = this.state.content;
            Linking.openURL(`mailto:iurisnit.robert@gmail.com?subject=${subject}&body=${content}`);
            this.getInitialState();
          }}
        />
      </View>
    );
  }
}

export default LoginForm;
