// import React from 'react';
// import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';
// import { connect } from 'react-redux';
//
// import User from '../state/records/User';
//
// @connect()
// export default class AuthenticationScreen extends React.Component {
//
//   _continueAsGuest = () => {
//     this.props.dispatch(Actions.signIn(new User({ isGuest: true })));
//   };
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableNativeFeedback
//           onPress={this._continueAsGuest}
//           style={styles.guestButton}
//         >
//           <Text style={styles.guestButtonText}>
//             Continue as a guest
//           </Text>
//         </TouchableNativeFeedback>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   facebookButton: {
//     backgroundColor: '#3b5998',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     alignItems: 'center',
//     borderRadius: 5,
//     width: 250,
//   },
//   guestButton: {
//     marginTop: 15,
//     backgroundColor: '#eee',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: 250,
//   },
//   facebookButtonText: {
//     fontSize: 15,
//     color: '#fff',
//   },
//   guestButtonText: {
//     fontSize: 15,
//     color: 'rgba(0,0,0,0.9)',
//   },
// });
