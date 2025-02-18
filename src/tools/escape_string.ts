export const escape_string = (text: string) => {
	return text? text.replace(/[&\/\\#+$~%'":*?<>{}|]/g, ''): '';
}
