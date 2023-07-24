import {StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/theme';

export const styles = StyleSheet.create({
  main_container: {
    marginHorizontal: 25,
    paddingBottom:200
  },
  screen_title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  Search_field: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.text_white,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  flatlist_container: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.text_white,
    height: 110,
    width: 135,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
  flag_container: {
    height: 80,
    width: 80,
  },
});
