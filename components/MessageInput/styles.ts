import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
  root: {
    // flexDirection: "row",
    padding: 10
  },
  sendImageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  closeIcon: {
    margin: 5
  },
  row: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    padding: 5
  },
  input: {
    flex: 1,
    marginHorizontal: 5
  },
  icon: {
    marginHorizontal: 5
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#3777f0",
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 35
  },
})

export default styles