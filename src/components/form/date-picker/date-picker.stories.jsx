import './date-picker.define';
import '../../i18n/i18n.provider';

export default {
	title: 'Components/Form/Picker/Date Picker',
	component: 'xb-date-picker',
	argTypes: {
		locale: {
			control: 'select',
			options: [ 'en-US', 'pt-BR', 'es-MX', 'ja-JP' ],
		},
		value: { control: 'text' },
	},
};

const Template = ( { locale = 'en-US', value = '' } ) => {
	return (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker clearable value={ value }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};

export const Default = Template.bind( {} );
Default.args = {
	locale: 'en-US',
	value: null,
};

export const Internationalization = ( { value } ) => {
	return (
		<div style={ { display: 'flex', gap: '2rem', flexWrap: 'wrap' } }>
			<xb-i18n-provider locale="en-US">
				<h4>en-US (Sunday Start)</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>

			<xb-i18n-provider locale="pt-BR">
				<h4>pt-BR (Monday Start? Verify)</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>

			<xb-i18n-provider locale="ja-JP">
				<h4>ja-JP</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};

Internationalization.args = {
	value: '2023-10-27',
};

export const WithPresets = ( { locale = 'en-US' } ) => {
	const presets = [
		'today',
		'yesterday',
		'tomorrow',
		{ label: 'Start of Week', prompt: 'week' },
		{ label: 'Start of Month', prompt: 'month' },
		{ label: 'Start of Year', prompt: 'year' },
		{ label: '1 Week Ago', prompt: '1 week ago' },
		{ label: 'In 2 Months', prompt: 'in 2 months' },
		{ label: 'My Birthday', prompt: '2023-01-24' },
	];

	return (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker clearable presets={ presets }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};
WithPresets.args = {
	locale: 'en-US',
};

export const WithConstraints = ( { locale = 'en-US' } ) => {
	// 1. Block weekends (Function constraint)
	const blockWeekends = ( date ) => {
		const day = date.getDay();
		return day === 0 || day === 6;
	};

	// 2. Block specific dates (String constraint)
	const blockHolidays = [ '2023-12-25', '2024-01-01' ];

	// 3. Block range (Array constraint)
	// Block first 10 days of January 2024
	const blockRange = [ '2024-01-01', '2024-01-10' ];

	const constraints = [ blockWeekends, ...blockHolidays, blockRange ];

	return (
		<div style={ { padding: '2rem' } }>
			<p>Constraints: Block weekends, Xmas, New Year, and Jan 1-10, 2024.</p>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker clearable constraints={ constraints } value="2023-12-20"></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};
WithConstraints.args = {
	locale: 'en-US',
};
