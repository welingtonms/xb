import { html } from 'lit-html';

import '../box';
import './imposter';

export default {
	title: 'Foundation/Layouts/imposter',
	component: 'imposter',
	argTypes: {
		paddingless: {
			control: {
				type: 'select',
				options: [
					'none',
					'horizontal',
					'vertical',
					'top',
					'right',
					'bottom',
					'left',
				],
			},
		},
		borderless: {
			control: {
				type: 'select',
				options: [
					'none',
					'horizontal',
					'vertical',
					'top',
					'right',
					'bottom',
					'left',
				],
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

const style =
	'--xb-imposter-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<div style="position: relative; width: 100%;">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus
				pellentesque maximus. Etiam tempor massa ut ex lacinia, quis venenatis
				nisi sollicitudin. Nulla eu vulputate quam. Vivamus non ante id mi
				dapibus dapibus vitae eu quam. Donec lorem nibh, fringilla a mollis ac,
				mattis efficitur arcu. Integer sollicitudin laoreet aliquam. Suspendisse
				pretium ac purus sed tempus. Cras porttitor ipsum metus, ac vulputate
				neque ornare in. Aliquam sollicitudin tincidunt facilisis. Ut accumsan
				tempor fermentum. Mauris sed mauris ac nisi cursus elementum.
			</p>

			<p>
				Pellentesque ut urna ex. Fusce mattis sed quam fermentum feugiat. Sed
				enim magna, semper a porttitor non, lacinia nec turpis. Mauris massa
				leo, ultricies ac purus non, vulputate efficitur ex. In placerat ante
				risus. Ut lobortis rhoncus dolor eget commodo. Phasellus sed mollis
				dolor, sit amet aliquam nibh. Orci varius natoque penatibus et magnis
				dis parturient montes, nascetur ridiculus mus.
			</p>

			<p>
				In sit amet dui malesuada elit malesuada condimentum. Praesent cursus
				ipsum ut lorem elementum, sed euismod leo egestas. Curabitur facilisis
				gravida elit sit amet gravida. Vivamus ultrices rutrum luctus.
				Pellentesque sed iaculis purus. Sed ac risus at nisi dapibus tristique a
				et odio. Duis facilisis cursus tellus, a pretium massa sodales vel.
				Morbi hendrerit in tellus efficitur congue. Donec in ligula eget velit
				eleifend elementum interdum at dui. Morbi bibendum placerat justo a
				fringilla. In a enim odio. In lectus diam, ultricies sit amet erat
				rutrum, ultricies viverra enim. Nullam nibh mi, imperdiet vitae rhoncus
				vel, imperdiet non quam. Curabitur tincidunt accumsan rutrum. Quisque
				dapibus et metus eu fringilla. Phasellus in justo varius, tempor lorem
				non, aliquam ipsum.
			</p>

			<xb-imposter
				style=${ style }
				paddingless=${ args.paddingless }
				borderless=${ args.borderless }
			>
				<xb-box paddingless="none" borderless="none">
					Here goes the imposter content.
				</xb-box>
			</xb-imposter>
		</div>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
