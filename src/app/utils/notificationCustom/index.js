/**
 * @param {String} placement ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
 * @param {Integer} duration
 * @param {String} type ['success', 'error', 'info', 'warning', 'warn', 'open', 'close', 'destroy']
 * @param {String} message
 * @param {String} description
 * @param {Object} styles
 * @param {String} classes
 */
const notificationCustom = (
	config = {
		placement: undefined,
		duration: undefined,
		type: undefined,
		message: undefined,
		description: undefined,
		styles: undefined
	}
) => {
	import('antd')
		.then(({ notification }) => {
			notification[
				['success', 'error', 'info', 'warning', 'warn', 'open', 'close', 'destroy'].includes(
					String(config.type).trim()
				)
					? config.type
					: 'error'
			]({
				placement: config.placement || 'topRight',
				duration: config.duration || 3,
				message: config.message,
				description: config.description,
				className: 'notification-custom',
				style: config.styles || ''
			});
		})
		.catch(error => {
			alert(error.message);
		});
};

export { notificationCustom };
