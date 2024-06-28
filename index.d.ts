// index.d.ts
import { ReactNode } from "react"

declare module "@userflux/browser-js" {
	declare class UserFlux {
		static initialize(apiKey: string, options: object): void
		static identify(parameters: object): Promise<any>
		static track(parameters: object): Promise<any | null>
		static trackBatch(parameters: object[]): Promise<void>
		static reset(): Promise<void>
		static updateDefaultTrackingProperties(properties: object): void
		static getUserId(): string | null
		static getAnonymousId(): string | null
		static flush(): Promise<void>
		static trackPageView(): Promise<void>
	}

	interface UserFluxContextValue {
		identify: (parameters: object) => Promise<any>
		track: (parameters: object) => Promise<any | null>
		trackBatch: (events: object[]) => Promise<void>
		reset: () => Promise<void>
		updateDefaultTrackingProperties: (properties: object) => void
		getUserId: () => string | null
		getAnonymousId: () => string | null
		flush: () => Promise<void>
		trackPageView: () => Promise<void>
	}

	export function UserFluxProvider({
		writeKey,
		options,
		children,
	}: {
		writeKey: string
		options: object
		children: ReactNode
	}): JSX.Element

	export function useUserFlux(): UserFluxContextValue

	export { UserFlux }
}
