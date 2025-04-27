import Cookies, {
	type CookieSetOptions,
	type CookieGetOptions,
} from 'universal-cookie'

export function useCookie(options?: CookieSetOptions) {
	const cookies = new Cookies(null, {
		path: '/',
		...options,
	})

	const { get, set, remove } = cookies
	return {
		get: (name: string, options?: CookieGetOptions) =>
			get.bind(cookies)(name, options),
		set: (name: string, value: string, options?: CookieSetOptions) =>
			set.bind(cookies)(name, value, options),
		remove: (name: string, options?: CookieSetOptions) =>
			remove.bind(cookies)(name, options),
	}
}
