import createLogger from './logger';

class QueuedWorkManager {
	constructor() {
		this.rounds = 0;
		this.logger = createLogger( 'queued-work-manager' );
		this.queuedWork = [];
	}

	isEmpty() {
		return this.queuedWork.length === 0;
	}

	push( predicate, fn ) {
		if ( predicate() ) {
			fn();
		} else {
			this.queuedWork.push( { predicate, fn } );
		}
	}

	flush() {
		if ( this.isEmpty() ) {
			this.logger.debug( 'no work to do' );
			this.rounds = 0;
			return;
		}

		this.rounds++;
		this.logger.debug( 'flushing queue [round ', this.rounds, ']' );

		// iterate over queued work; if predicate is satisfied, remove from queuedWork
		// and execute the function. otherwise, leave it in the queue.
		this.queuedWork = this.queuedWork.filter( ( { predicate, fn } ) => {
			if ( predicate() ) {
				fn();

				return false;
			}

			return true;
		} );
	}
}

export default QueuedWorkManager;
