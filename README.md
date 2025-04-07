# @userflux/browser-js-react

UserFlux's React SDK - send your frontend analytics data to the UserFlux platform.

# Getting Started

## 1. Install the package

```bash
npm i @userflux/browser-js-react
```

## 2. Initialise the SDK

```javascript
import { UserFluxProvider } from "@userflux/browser-js-react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<UserFluxProvider
			writeKey="YOUR WRITE ONLY API KEY"
			options={{
				autoCapture: ["page_views", "clicks"],
				allowCookies: true,
				autoEnrich: true,
				cookieSameSiteSetting: "Strict",
				cookieExpiryDays: 365,
				trackSession: true,
				defaultTrackingProperties: { project: "Web App" },
			}}
		>
			<App />
		</UserFluxProvider>
	</React.StrictMode>
)
```

The `initialize` method takes two arguments:

-   `writeKey` - Your UserFlux write key. You can find this in the UserFlux dashboard under `Management > Account Settings > Developers > Write Key`
-   `options` - An object containing the following optional properties:
    -   `autoCapture` - An array of strings used to define which events to automatically capture. Defaults to none. The following events are available:
        -   `page_views` - Capture page views
        -   `page_leaves` - Capture page leaves
        -   `clicks` - Capture clicks
        -   `all` - Capture all of the above events
    -   `allowCookies` - A boolean indicating whether or not to allow cookies. Defaults to `true`
    -   `cookieSameSiteSetting` - A string indicating what cookie same site setting to use. Defaults to `Strict`. Options available are: `Strict`, `Lax`
    -   `cookieExpiryDays` - A number indicating how many days a cookie should last. Defaults to `365`
    -   `autoEnrich` - A boolean indicating whether or not to automatically enrich events with location and device properties. Defaults to `true`
    -   `defaultTrackingProperties` - An object containing any default properties to be sent with every event. Defaults to an empty object
    -   `trackSession` - A boolean indicating whether or not to track sessions with an unique identifier. Defaults to `true`
    -   `customQueryParamsToCollect` - An array of strings used to define which custom query parameters to auto collect and include in event properties. Defaults to none.
    -   `disableUserIdStorage` - A boolean indicating whether or not to store the provided user id in storage. Defaults to `false`
    -   `blockCommonBots` - A boolean indicating whether or not to block common bots from being tracked. Defaults to `true`

## 3. Tracking events

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.track({
    event: 'event_name',
    properties: { ... },
    userId: '<USER_ID>',
    enrichDeviceData: true,
    enrichLocationData: true,
    enrichPageProperties: true,
    enrichReferrerProperties: true,
    enrichUTMProperties: true,
    enrichPaidAdProperties: true,
    addToQueue: false
})
```

The `track` method takes a single argument:

-   `parameters` - An object containing the following properties:
    -   `event` - (required) A string representing the name of the event
    -   `properties` - (optional) An object containing any properties to be sent with the event. Defaults to an empty object. Any `defaultTrackingProperties` provided in the global options will be merged with these properties
    -   `userId` - (optional) A string representing the user ID of the user you're identifying with attributes
    -   `externalId` - (optional) A string representing the external ID of the user you're identifying with attributes
    -   `enrichDeviceData` - (optional) A boolean indicating whether or not to enrich the event with device data. Defaults to the value of `autoEnrich` in the global options
    -   `enrichLocationData` - (optional) A boolean indicating whether or not to enrich the event with location data. Defaults to the value of `autoEnrich` in the global options
    -   `enrichPageProperties` - (optional) A boolean indicating whether or not to enrich the event with page properties. Defaults to `true`
    -   `enrichReferrerProperties` - (optional) A boolean indicating whether or not to enrich the event with referrer properties. Defaults to `true`
    -   `enrichUTMProperties` - (optional) A boolean indicating whether or not to enrich the event with UTM properties. Defaults to `true`
    -   `enrichPaidAdProperties` - (optional) A boolean indicating whether or not to enrich the event with paid advertisement properties (such as google and facebook ads). Defaults to `true`
    -   `addToQueue` - (optional) A boolean indicating whether or not to add the event to the queue. Defaults to `false`. If `false`, the event will be sent immediately

## 4. Identifying users

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.identify({
    properties: { ... },
    userId: '<USER_ID>',
    enrichDeviceData: true,
    enrichLocationData: true
})
```

The `identify` method takes a single argument:

-   `parameters` - An object containing the following properties:
    -   `properties` - (required) An object containing any attributes to be associated with the users profile
    -   `userId` - (optional) A string representing the user ID of the user you're identifying with attributes
    -   `externalId` - (optional) A string representing the external ID of the user you're identifying with attributes
    -   `enrichDeviceData` - (optional) A boolean indicating whether or not to enrich the event with device data. Defaults to the value of `autoEnrich` in the global options
    -   `enrichLocationData` - (optional) A boolean indicating whether or not to enrich the event with location data. Defaults to the value of `autoEnrich` in the global options

# Other Methods Available

## trackBatch

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.trackBatch([
    {
        event: 'event_name',
        properties: { ... },
        userId: '<USER_ID>',
        enrichDeviceData: true,
        enrichLocationData: true,
        enrichPageProperties: true,
        enrichReferrerProperties: true,
        enrichUTMProperties: true,
        enrichPaidAdProperties: true
    },
    {
        event: 'event_name',
        properties: { ... },
        userId: '<USER_ID>',
        enrichDeviceData: true,
        enrichLocationData: true,
        enrichPageProperties: true,
        enrichReferrerProperties: true,
        enrichUTMProperties: true,
        enrichPaidAdProperties: true
    }
])
```

The `trackBatch` method takes a single argument:

-   `events` - An array of objects. See the `track` method for details of the properties available for each object.

## updateDefaultTrackingProperties

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

userFlux.updateDefaultTrackingProperties({ ... })
```

If at any time you wish to update the default tracking properties, you can do so by calling the `updateDefaultTrackingProperties` method.

The `updateDefaultTrackingProperties` method takes one argument:

-   `defaultTrackingProperties` - An object containing any default properties to be sent with every event.

## reset

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.reset()
```

If at any time you wish to reset the SDK, you can do so by calling the `reset` method. This will flush any events, clear any cookies / local storage, and reset the SDK to its initial state.

## flush

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.flush()
```

This will flush any pending events and send them to the UserFlux platform.

## trackPageView

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

await userFlux.trackPageView()
```

If you have disabled `autoCapture` in the global options, you can manually capture page views by calling the `trackPageView` method.

## getUserId

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

userFlux.getUserId()
```

If you have provided a `userId` in the `identify` or `track` methods, you can retrieve this by calling the `getUserId` method.

## getAnonymousId

```javascript
import { useUserFlux } from "@userflux/browser-js-react"

const userFlux = useUserFlux()

userFlux.getAnonymousId()
```

You can retrieve the anonymous id by calling the `getAnonymousId` method. This is the id that will be used if no `userId` is provided in the `identify` or `track` methods.
