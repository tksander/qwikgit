import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import NavButton from './NavButton'
import SearchBar from './SearchBar'

const FirstScreen = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Search for a Github User</Text>
      <SearchBar />
			<NavButton destLabel="Second" buttonHandler={props.onButtonPress} />
		</View>
	)
}

FirstScreen.propTypes = {
	onButtonPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: 'black',
		marginBottom: 30
	}
})

export default FirstScreen
