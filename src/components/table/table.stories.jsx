import React from 'react';

import '../layout';
import './table.define';
import '../badge/badge.define';
import '../icon/icon.define';
import '../button/button.define';
import '../text/text.define';

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
		expandable: false,
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
					<xb-table-control-select></xb-table-control-select>

					<xb-table-cell width="100">Order</xb-table-cell>
					<xb-table-cell>Name</xb-table-cell>
					<xb-table-cell width="1fr">Role</xb-table-cell>
					<xb-table-cell width="120">Status</xb-table-cell>
					<xb-table-cell width="128"></xb-table-cell>
				</xb-table-row>
			</xb-table-header>

			<xb-table-body>
				{ /* Row with column spanning in details */ }
				<xb-table-row value="001">
					<xb-table-control-select></xb-table-control-select>
					<xb-table-control-expand></xb-table-control-expand>

					<xb-table-cell>001</xb-table-cell>
					<xb-table-cell>
						<xb-text ellipsize>John Doe</xb-text>
					</xb-table-cell>
					<xb-table-cell>Developer</xb-table-cell>
					<xb-table-cell>
						<xb-badge color="success" icon="circle-fill">
							Active
						</xb-badge>
					</xb-table-cell>
					<xb-table-cell>
						<xb-button variant="icon" icon="trash"></xb-button>
						<xb-button variant="icon" icon="pencil"></xb-button>
					</xb-table-cell>

					<xb-table-cell slot="expansion" colspan={ 3 }>
						<h4>Current Projects</h4>
						<ul>
							<li>Project Alpha</li>
							<li>Project Beta</li>
						</ul>
					</xb-table-cell>
					<xb-table-cell slot="expansion" colspan={ 2 }>
						<h4>Skills</h4>
						<ul>
							<li>JavaScript</li>
							<li>React</li>
							<li>Node.js</li>
						</ul>
					</xb-table-cell>
				</xb-table-row>

				{ /* Row with full-width details */ }
				<xb-table-row value="002">
					<xb-table-control-select></xb-table-control-select>
					<xb-table-control-expand></xb-table-control-expand>

					<xb-table-cell>002</xb-table-cell>
					<xb-table-cell colspan={ 2 }>
						<xb-text ellipsize>Jane Smith (Engineering Lead)</xb-text>
					</xb-table-cell>
					<xb-table-cell>
						<xb-badge color="warning" icon="circle">
							Inactive
						</xb-badge>
					</xb-table-cell>
					<xb-table-cell>
						<xb-button variant="icon" icon="trash"></xb-button>
						<xb-button variant="icon" icon="pencil"></xb-button>
					</xb-table-cell>

					<xb-table-cell slot="expansion" colspan={ 5 }>
						<div>
							<h4>Team Performance</h4>
							<div style={ { display: 'flex', gap: '20px' } }>
								<div>
									<h5>Current Sprint</h5>
									<p>15 tasks completed</p>
									<p>3 tasks in progress</p>
								</div>
								<div>
									<h5>Team Members</h5>
									<ul>
										<li>Alice (Frontend)</li>
										<li>Bob (Backend)</li>
										<li>Charlie (QA)</li>
									</ul>
								</div>
							</div>
						</div>
					</xb-table-cell>
				</xb-table-row>

				<xb-table-row value="003">
					<xb-table-control-select></xb-table-control-select>

					<xb-table-cell>003</xb-table-cell>
					<xb-table-cell>
						<xb-text ellipsize>Bob Johnson</xb-text>
					</xb-table-cell>
					<xb-table-cell>Manager</xb-table-cell>
					<xb-table-cell>
						<xb-badge color="success" icon="circle-fill">
							Active
						</xb-badge>
					</xb-table-cell>

					<xb-table-cell>
						<xb-button variant="icon" icon="trash"></xb-button>
						<xb-button variant="icon" icon="pencil"></xb-button>
					</xb-table-cell>
				</xb-table-row>
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
					minWidth: '300px',
					maxWidth: '600px',
					border: '1px dashed #ccc',
				} }
			>
				<m-stack>
					<p>
						This container is resizable (drag the bottom-right corner) and limited to 600px
						max-width. The table has fixed-width columns that sum up to 800px, causing horizontal
						scroll.
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
						</xb-table-body>
					</xb-table>
				</m-stack>
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
