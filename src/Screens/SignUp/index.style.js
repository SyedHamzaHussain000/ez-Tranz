import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 30,
  },
  screen_title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  createBtn: {
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  checkView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText:{
    fontSize:11,
   
  },
  termsTxt:{
    fontSize:11,
    textDecorationLine:'underline'
  }
});
