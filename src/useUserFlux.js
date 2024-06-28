import React, { createContext, useContext, useEffect, useCallback, useRef } from "react"
import { UserFlux } from "./index"

const UserFluxContext = createContext(null)

export function UserFluxProvider({ writeKey, options, children }) {
	const isInitialized = useRef(false)

	useEffect(() => {
		if (!isInitialized.current) {
			UserFlux.initialize(writeKey, options)
			isInitialized.current = true
		}

		return () => {
			// Clean up if necessary
		}
	}, [writeKey, options])

	const value = {
		identify: useCallback((parameters) => {
			return UserFlux.identify(parameters)
		}, []),

		track: useCallback((parameters) => {
			return UserFlux.track(parameters)
		}, []),

		trackBatch: useCallback((events) => {
			return UserFlux.trackBatch(events)
		}, []),

		reset: useCallback(() => {
			return UserFlux.reset()
		}, []),

		updateDefaultTrackingProperties: useCallback((properties) => {
			UserFlux.updateDefaultTrackingProperties(properties)
		}, []),

		getUserId: useCallback(() => {
			return UserFlux.getUserId()
		}, []),

		getAnonymousId: useCallback(() => {
			return UserFlux.getAnonymousId()
		}, []),

		flush: useCallback(() => {
			return UserFlux.flush()
		}, []),

		trackPageView: useCallback(() => {
			return UserFlux.trackPageView()
		}, []),
	}

	return <UserFluxContext.Provider value={value}>{children}</UserFluxContext.Provider>
}

export function useUserFlux() {
	const context = useContext(UserFluxContext)
	if (context === null) {
		throw new Error("useUserFlux must be used within a UserFluxProvider")
	}
	return context
}
