import { connect } from 'react-redux'

import ThirdScreen from '../components/ThirdScreen'
import { navigateReset } from '../actions'


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onButtonPress: () => {
			// Note: Scene resets are broken in the current version of NavigationExperimental
			dispatch(navigateReset([{ key: 'First', title: 'First' }], 0))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThirdScreen)