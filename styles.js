import {StyleSheet} from 'react-native'

const gstyles = StyleSheet.create({
  titleh1: {
    fontSize: 24,
    textAlign:'center',
    marginTop:20
  },
  cardTitleh1:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:15,
  },
  cardTitleh2:{
    fontSize:18,
    marginBottom:5,
    textAlign:'center'
  },
  cardTitle:{
    fontSize:14,
    fontWeight:'bold',
  },
  textCenter: {
    marginTop:5,
    textAlign:'center',
  },
  helperText: {
    fontSize:12,
    marginLeft:20,
    color: "#607D8B"
  },
  buttonStyle: {
    marginTop:25,
    backgroundColor:"#00B0FF",
  },
  trueButtonStyle: {
    marginTop:25,
    backgroundColor:"#2E7D32"
  },
  falseButtonStyle: {
    marginTop:25,
    backgroundColor:"#F50057"
  },
  flipCard : {
    width:'100%',
    height:'50%',
    backgroundColor:'red',
  }
});

export default gstyles
