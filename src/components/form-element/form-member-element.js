import createLogger from '../../utils/logger';

const logger = createLogger( 'form-member' );

/**
 * Shared form behaviour for **Members** of **Composite controls**
 * (Radio, Toggle, Select option). Host re-initializes selection on reset.
 *
 * @template {!import('../../utils/prop-types.js').Constructable} T
 * @param {T} BaseClass
 */
export function FormMemberMixin( BaseClass ) {
	return class FormMemberElement extends BaseClass {
		/**
		 * Copy `name` from the composite group host on first activation.
		 * @param {string} hostTag e.g. `xb-radio-group`, `xb-select`
		 * @param {string} [memberLabel] for log messages
		 */
		ensureGroupName( hostTag, memberLabel = 'member' ) {
			if ( this.name ) {
				return;
			}

			const host = this.closest( hostTag );
			this.name = host?.name ?? '';

			logger.warn(
				`no name attribute set on the ${ memberLabel }. Is it intentionally? setting name to ${ host?.name }`
			);
		}

		/**
		 * @param {boolean} active
		 * @param {FormDataEntryValue | null | undefined} value
		 */
		setMemberFormValue( active, value ) {
			this.setFormValue( active ? value : null );
		}

		onFormReset() {
			// Composite host re-initializes selection.
		}
	};
}
