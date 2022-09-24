import '@welingtonms/xb-wc/dist/text';

function Text( { children, ...rest } ) {
	return <xb-text { ...rest }>{ children }</xb-text>;
}

export default Text;
