import { nanoid } from 'nanoid';

export const declarationTypes = [
	{ id: nanoid(2), checked: true, value: 'Bệnh nhân/Người nhà', text: 'Bệnh nhân/Người nhà' },
	{ id: nanoid(2), checked: false, value: 'Nhân viên bệnh viện', text: 'Nhân viên bệnh viện' },
	{
		id: nanoid(2),
		key: nanoid(2),
		value: 'Khách đến liên hệ công tác',
		text: 'Khách đến liên hệ công tác'
	},
	{ id: nanoid(2), checked: false, value: 'Tiêm chủng vắc xin', text: 'Tiêm chủng vắc xin' },
	{ id: nanoid(2), checked: false, value: 'Xét nghiệm Covid-19', text: 'Xét nghiệm Covid-19' },
	{
		id: nanoid(2),
		checked: false,
		value: 'Theo dõi sức khỏe tại nhà',
		text: 'Theo dõi sức khỏe tại nhà'
	}
];
