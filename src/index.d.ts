import { ReactNode, Context } from "react"

declare module "@userflux/browser-js-react" {
	export interface UserFluxOptions {
		autoCapture?: string[]
		allowCookies?: boolean
		autoEnrich?: boolean
		[key: string]: any
	}

	export interface UserFluxContextValue {
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

	export interface UserFluxProviderProps {
		writeKey: string
		options: UserFluxOptions
		children: ReactNode
	}

	export const UserFluxContext: Context<UserFluxContextValue>

	export function UserFluxProvider(props: UserFluxProviderProps): JSX.Element

	export function useUserFlux(): UserFluxContextValue

	export class UserFlux {
		static initialize(apiKey: string, options: UserFluxOptions): void
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
}
