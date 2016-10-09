import { connect } from 'react-redux'

import UserScreen from '../components/UserScreen'
import { navigateReset } from '../actions'


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonPress: () => {
			dispatch(navigateReset([{ key: 'First', title: 'First' }], 0))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserScreen)
