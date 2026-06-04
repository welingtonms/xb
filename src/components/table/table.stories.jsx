import { faker } from '@faker-js/faker';
import React from 'react';

import '../badge/badge.define';
import '../button/button.define';
import '../dropdown/dropdown.define';
import '../icon/icon.define';
import '../layout';
import '../text/text.define';
import './table.define';

/** Number of generated data rows in the Playground story (colspan example row is always appended). */
const PLAYGROUND_ROW_COUNT = 15;

faker.seed( 42 );

function formatRowId( index ) {
	const n = index + 1;
	// Reserve 004 for the colspan example row appended below generated rows.
	return String( n >= 4 ? n + 1 : n ).padStart( 3, '0' );
}

function generatePlaygroundRows( count ) {
	return Array.from( { length: count }, ( _, index ) => {
		const isActive = faker.datatype.boolean();

		return {
			id: formatRowId( index ),
			name: faker.person.fullName(),
			role: faker.person.jobTitle(),
			status: isActive ? 'Active' : 'Inactive',
			statusColor: isActive ? 'success' : 'warning',
			statusIcon: isActive ? 'circle-fill' : 'circle',
			projects: faker.helpers.multiple( () => faker.commerce.productName(), {
				count: { min: 2, max: 4 },
			} ),
			skills: faker.helpers.multiple( () => faker.hacker.ingverb(), {
				count: { min: 3, max: 5 },
			} ),
		};
	} );
}

const playgroundRows = generatePlaygroundRows( PLAYGROUND_ROW_COUNT );

function RowActions() {
	return (
		<xb-table-cell>
			<xb-dropdown>
				<xb-button variant="icon" aria-haspopup="true" aria-label="Row actions">
					<xb-icon name="dots-three-vertical" size={ 16 }></xb-icon>
				</xb-button>

				<xb-dropdown-menu>
					<xb-dropdown-item icon="trash">Remove</xb-dropdown-item>
					<xb-dropdown-item icon="pencil">Edit</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		</xb-table-cell>
	);
}

function PlaygroundDataRow( { row } ) {
	return (
		<xb-table-row value={ row.id }>
			<xb-table-row-select></xb-table-row-select>
			<xb-table-row-expand></xb-table-row-expand>

			<xb-table-cell>{ row.id }</xb-table-cell>
			<xb-table-cell>
				<xb-text ellipsize>{ row.name }</xb-text>
			</xb-table-cell>
			<xb-table-cell>{ row.role }</xb-table-cell>
			<xb-table-cell>
				<xb-badge color={ row.statusColor } icon={ row.statusIcon }>
					{ row.status }
				</xb-badge>
			</xb-table-cell>
			<RowActions />

			<xb-table-cell slot="expansion" colspan={ 3 }>
				<h4>Current Projects</h4>
				<ul>
					{ row.projects.map( ( project ) => (
						<li key={ project }>{ project }</li>
					) ) }
				</ul>
			</xb-table-cell>
			<xb-table-cell slot="expansion" colspan={ 2 }>
				<h4>Skills</h4>
				<ul>
					{ row.skills.map( ( skill ) => (
						<li key={ skill }>{ skill }</li>
					) ) }
				</ul>
			</xb-table-cell>
		</xb-table-row>
	);
}

function ColspanExampleRow() {
	return (
		<xb-table-row value="004">
			<xb-table-row-select></xb-table-row-select>
			<xb-table-row-expand></xb-table-row-expand>

			<xb-table-cell colspan={ 4 }>
				This cell spans the entire width of the table.
			</xb-table-cell>

			<RowActions />

			<xb-table-cell slot="expansion">004</xb-table-cell>
			<xb-table-cell slot="expansion">Mary Poppins</xb-table-cell>
			<xb-table-cell slot="expansion">Designer</xb-table-cell>
			<xb-table-cell slot="expansion">Active</xb-table-cell>
		</xb-table-row>
	);
}

export default {
	title: 'Components/Table',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		expandable: {
			control: 'boolean',
		},
		selectable: {
			control: 'boolean',
		},
	},
	tags: [ 'autodocs' ],
};

export const Playground = {
	args: {
		expandable: true,
		selectable: true,
	},
	render: ( args ) => (
		<xb-table
			expandable={ args.expandable }
			selectable={ args.selectable }
			onchange={ ( e ) => console.log( 'change', e.target.value ) }
		>
			<xb-table-header>
				<xb-table-row>
					<xb-table-row-select></xb-table-row-select>

					<xb-table-cell width="10rem">Order</xb-table-cell>
					<xb-table-cell>Name</xb-table-cell>
					<xb-table-cell width="1fr">Role</xb-table-cell>
					<xb-table-cell width="120">Status</xb-table-cell>
					<xb-table-cell width="72"></xb-table-cell>
				</xb-table-row>
			</xb-table-header>

			<xb-table-body>
				{ playgroundRows.map( ( row ) => (
					<PlaygroundDataRow key={ row.id } row={ row } />
				) ) }
				<ColspanExampleRow />
			</xb-table-body>
		</xb-table>
	),
};

export const ColumnWidths = {
	render: () => (
		<xb-stack>
			<h3>Fixed and Flexible, Mixed Widths</h3>
			<xb-table>
				<xb-table-header>
					<xb-table-row>
						<xb-table-cell width="80">ID</xb-table-cell>
						<xb-table-cell width="200">Name (200px)</xb-table-cell>
						<xb-table-cell width="1fr">Role (1fr)</xb-table-cell>
						<xb-table-cell width="10%">Status</xb-table-cell>
					</xb-table-row>
				</xb-table-header>
				<xb-table-body>
					<xb-table-row>
						<xb-table-cell>001</xb-table-cell>
						<xb-table-cell>John Doe</xb-table-cell>
						<xb-table-cell>Developer</xb-table-cell>
						<xb-table-cell>Active</xb-table-cell>
					</xb-table-row>

					<xb-table-row>
						<xb-table-cell>002</xb-table-cell>
						<xb-table-cell>Jane Smith</xb-table-cell>
						<xb-table-cell>Designer</xb-table-cell>
						<xb-table-cell>Active</xb-table-cell>
					</xb-table-row>

					<xb-table-row>
						<xb-table-cell>003</xb-table-cell>
						<xb-table-cell>Bob Johnson</xb-table-cell>
						<xb-table-cell>Manager</xb-table-cell>
						<xb-table-cell>Active</xb-table-cell>
					</xb-table-row>
				</xb-table-body>
			</xb-table>
		</xb-stack>
	),
};

export const ScrollableTable = {
	render: () => (
		<xb-stack>
			<h3>Resizable Container with Horizontal Scroll</h3>
			<xb-box
				style={ {
					resize: 'horizontal',
					overflow: 'auto',
					boxSizing: 'content-box',
					minWidth: '600px',
					maxWidth: 'calc(100% - 48px)',
					border: '1px dashed #ccc',
				} }
			>
				<xb-stack>
					<p>
						This container is resizable (drag the bottom-right corner). The table has fixed-width
						columns that sum up to 800px, causing horizontal scroll.
					</p>
					<xb-table expandable>
						<xb-table-header>
							<xb-table-row>
								<xb-table-cell width="200">ID</xb-table-cell>
								<xb-table-cell width="250">Name</xb-table-cell>
								<xb-table-cell width="250">Role</xb-table-cell>
								<xb-table-cell width="250">Department</xb-table-cell>
								<xb-table-cell width="250">Location</xb-table-cell>
								<xb-table-cell width="200">Status</xb-table-cell>
							</xb-table-row>
						</xb-table-header>
						<xb-table-body>
							<xb-table-row>
								<xb-table-row-expand></xb-table-row-expand>

								<xb-table-cell>001</xb-table-cell>
								<xb-table-cell>John Doe</xb-table-cell>
								<xb-table-cell>Developer</xb-table-cell>
								<xb-table-cell>Engineering</xb-table-cell>
								<xb-table-cell>New York</xb-table-cell>
								<xb-table-cell></xb-table-cell>

								<xb-table-cell slot="expansion" colspan={ 6 }>
									<p>This is an expandable row within a scrollable container!</p>
									<div style={ { display: 'flex', gap: '20px', marginTop: '1rem' } }>
										<div>
											<h5>Current Projects</h5>
											<ul>
												<li>Project Alpha</li>
												<li>Project Beta</li>
											</ul>
										</div>
										<div>
											<h5>Skills</h5>
											<ul>
												<li>JavaScript</li>
												<li>React</li>
												<li>Node.js</li>
											</ul>
										</div>
									</div>
								</xb-table-cell>
							</xb-table-row>
							<xb-table-row>
								<xb-table-cell>002</xb-table-cell>
								<xb-table-cell>Jane Smith</xb-table-cell>
								<xb-table-cell>Designer</xb-table-cell>
								<xb-table-cell>Product</xb-table-cell>
								<xb-table-cell>San Francisco</xb-table-cell>
								<xb-table-cell>Active</xb-table-cell>
							</xb-table-row>
							<xb-table-row>
								<xb-table-cell>003</xb-table-cell>
								<xb-table-cell>Bob Johnson</xb-table-cell>
								<xb-table-cell>Manager</xb-table-cell>
								<xb-table-cell>Engineering</xb-table-cell>
								<xb-table-cell>London</xb-table-cell>
								<xb-table-cell>Active</xb-table-cell>
							</xb-table-row>
							<xb-table-row>
								<xb-table-row-expand></xb-table-row-expand>
								<xb-table-cell colspan={ 6 }>
									This cell spans the entire width of the table.
								</xb-table-cell>

								<xb-table-cell slot="expansion">004</xb-table-cell>
								<xb-table-cell slot="expansion">Mary Poppins</xb-table-cell>
								<xb-table-cell slot="expansion">Designer</xb-table-cell>
								<xb-table-cell slot="expansion">Product</xb-table-cell>
								<xb-table-cell slot="expansion">San Francisco</xb-table-cell>
								<xb-table-cell slot="expansion">Active</xb-table-cell>
							</xb-table-row>
						</xb-table-body>
					</xb-table>
				</xb-stack>
			</xb-box>

			<h3>Fixed Container with Horizontal Scroll</h3>
			<div style={ { width: '600px', border: '1px dashed #ccc', padding: '1rem' } }>
				<p style={ { marginBottom: '1rem' } }>
					This container has a fixed width of 600px. The table below has the same column
					configuration, demonstrating consistent horizontal scroll behavior.
				</p>
				<xb-table>
					<xb-table-header>
						<xb-table-row>
							<xb-table-cell width="200">ID</xb-table-cell>
							<xb-table-cell width="250">Name</xb-table-cell>
							<xb-table-cell width="250">Role</xb-table-cell>
							<xb-table-cell width="250">Department</xb-table-cell>
							<xb-table-cell width="250">Location</xb-table-cell>
							<xb-table-cell width="200">Status</xb-table-cell>
						</xb-table-row>
					</xb-table-header>
					<xb-table-body>
						<xb-table-row>
							<xb-table-cell>001</xb-table-cell>
							<xb-table-cell>John Doe</xb-table-cell>
							<xb-table-cell>Developer</xb-table-cell>
							<xb-table-cell>Engineering</xb-table-cell>
							<xb-table-cell>New York</xb-table-cell>
							<xb-table-cell>Active</xb-table-cell>
						</xb-table-row>
						<xb-table-row>
							<xb-table-cell>002</xb-table-cell>
							<xb-table-cell>Jane Smith</xb-table-cell>
							<xb-table-cell>Designer</xb-table-cell>
							<xb-table-cell>Product</xb-table-cell>
							<xb-table-cell>San Francisco</xb-table-cell>
							<xb-table-cell>Active</xb-table-cell>
						</xb-table-row>
					</xb-table-body>
				</xb-table>
			</div>
		</xb-stack>
	),
};
