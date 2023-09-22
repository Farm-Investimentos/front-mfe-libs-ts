interface INotificationMessage {
	title: string
	message: string
}

type GTagEventParams = Gtag.EventNames | Gtag.ControlParams | Gtag.CustomParams

export interface INotificationSpecificEvents {
	'ANALYTICS_EVENT': { event: Gtag.EventNames | (string & {}), payload?: GTagEventParams },
	'HTTP_ERROR': GTagEventParams
}

export type BaseNotification = string | INotificationMessage

export type NotificationCategoryKeys = keyof INotificationSpecificEvents;