import createLogger from './logger';

class QueuedWorkManager {
	constructor() {
		this.rounds = 0;
		this.logger = createLogger( 'queued-work-manager' );
		this.queuedWork = [];
	}

	/**
	 * Check if the queue is empty.
	 * @return {boolean} true if the queue is empty, false otherwise
	 */
	isEmpty() {
		return this.queuedWork.length === 0;
	}

	/**
	 * Push work to the queue. If the predicate is satisfied, the function will be executed immediately.
	 * Otherwise, the work will be added to the queue and will be executed in the next round.
	 * @param {() => boolean} predicate predicate to check if the work should be executed
	 * @param {() => void} fn function to execute if the predicate is satisfied
	 */
	push( predicate, fn ) {
		if ( predicate() ) {
			fn();
		} else {
			this.queuedWork.push( { predicate, fn } );
		}
	}

	/**
	 * Flush the queue. Execute all the work in the queue.
	 */
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
