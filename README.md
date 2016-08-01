# RN-NavigationExperimental-Redux-Example

A small demonstration app showing how to use Redux to manage navigation state in a React Native (>0.21) application using NavigationExperimental.

![Screencast of flipping through a few different screes](rn-ne-redux-demo.gif?raw=true "Screencast of functionality")

The key elements to note when trying to implement NavigationExperimental with Redux include the following:

* `<NavigationTransitioner>` is the base component upon which you can build many different navigation paradigms. It requires that you pass it, at minimum, the current state of the navigation (`navigationState`) and a method to render contents to the screen (`render`).
* Your navigation state as Redux will handle it must conform to the `NavigationState` type defined for NavigationExperimental, which is as simple as this:
    {
    	index: [number representing currently displayed screen],
    	routes: [
    		// Array of NavigationRoute objects, which must contain at minimum a `key` property:
    		{ key: 'MyScreen' }
    	]
    }
* This implementation uses `NavigationStateUtils` to do the dirty work when reducing state (see reducers.js)
* You can skip your own implementation of the reducers and use React Native's versions. See [this comment](https://github.com/jlyman/RN-NavigationExperimental-Redux-Example/issues/7#issuecomment-202385080) and the [pure-rn-reducers branch](https://github.com/jlyman/RN-NavigationExperimental-Redux-Example/tree/pure-rn-reducers).

Finally, this was just an attempt to figure out how to connect Redux and NavigationExperimental, and does not represent an ideal implementation. If you see room for improvement, please let me know.

## A note about branches

At this time, NavigationExperimental is moving quite quickly and the API is still a bit of a moving target. Master branch will attempt to follow the current stable release (this is a change from previous) since things are starting to quiet down. For version-specific implementations older than the current stable release, I'm creating a branch per RN version. For example, see the [0.23 branch](https://github.com/jlyman/RN-NavigationExperimental-Redux-Example/tree/0.23) of this repo to see how to implement against the NavigationExperimental API in RN 0.23.

* [/tree/master](current stable release)
* [/tree/0.28](0.28)
* [/tree/0.27](0.27)
* [/tree/0.26](0.26)
* [/tree/0.25](0.25)
* [/tree/0.24](0.24)
* [/tree/0.23](0.23)
* [/tree/0.22](0.22)
* [/tree/0.21](0.21)

In the future, when NavigationExperimental is changing little between versions, we'll switch to a tag-based approach instead of branches.
