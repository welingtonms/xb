export const FRUITS = [
	{ label: 'Acerola', value: 'acerola' },
	{ label: 'Apple', value: 'apple' },
	{ label: 'Apricots', value: 'apricots' },
	{ label: 'Avocado', value: 'avocado' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Blackberries', value: 'blackberries' },
	{ label: 'Blackcurrant', value: 'blackcurrant' },
	{ label: 'Blueberries', value: 'blueberries' },
	{ label: 'Breadfruit', value: 'breadfruit' },
	{ label: 'Cantaloupe', value: 'cantaloupe' },
	{ label: 'Carambola', value: 'carambola' },
	{ label: 'Cherimoya', value: 'cherimoya' },
	{ label: 'Cherries', value: 'cherries' },
	{ label: 'Clementine', value: 'clementine' },
	{ label: 'Coconut Meat', value: 'coconut meat' },
	{ label: 'Cranberries', value: 'cranberries' },
	{ label: 'Custard-Apple', value: 'custard-apple' },
	{ label: 'Date Fruit', value: 'date fruit' },
	{ label: 'Durian', value: 'durian' },
	{ label: 'Elderberries', value: 'elderberries' },
	{ label: 'Feijoa', value: 'feijoa' },
	{ label: 'Figs', value: 'figs' },
	{ label: 'Gooseberries', value: 'gooseberries' },
	{ label: 'Grapefruit', value: 'grapefruit' },
	{ label: 'Grapes', value: 'grapes' },
	{ label: 'Guava', value: 'guava' },
	{ label: 'Honeydew Melon', value: 'honeydew melon' },
	{ label: 'Jackfruit', value: 'jackfruit' },
	{ label: 'Java-Plum', value: 'java-plum' },
	{ label: 'Jujube Fruit', value: 'jujube fruit' },
	{ label: 'Kiwifruit', value: 'kiwifruit' },
	{ label: 'Kumquat', value: 'kumquat' },
	{ label: 'Lemon', value: 'lemon' },
	{ label: 'Lime', value: 'lime' },
	{ label: 'Longan', value: 'longan' },
	{ label: 'Loquat', value: 'loquat' },
	{ label: 'Lychee', value: 'lychee' },
	{ label: 'Mandarin', value: 'mandarin' },
	{ label: 'Mango', value: 'mango' },
	{ label: 'Mangosteen', value: 'mangosteen' },
	{ label: 'Mulberries', value: 'mulberries' },
	{ label: 'Nectarine', value: 'nectarine' },
	{ label: 'Olives', value: 'olives' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Papaya', value: 'papaya' },
	{ label: 'Passion Fruit', value: 'passion fruit' },
	{ label: 'Peaches', value: 'peaches' },
	{ label: 'Pear', value: 'pear' },
	{ label: 'Persimmon', value: 'persimmon' },
	{ label: 'Pitaya (Dragonfruit)', value: 'pitaya (dragonfruit)' },
	{ label: 'Pineapple', value: 'pineapple' },
	{ label: 'Pitanga', value: 'pitanga' },
	{ label: 'Plantain', value: 'plantain' },
	{ label: 'Plums', value: 'plums' },
	{ label: 'Pomegranate', value: 'pomegranate' },
	{ label: 'Prickly Pear', value: 'prickly pear' },
	{ label: 'Prunes', value: 'prunes' },
	{ label: 'Pummelo', value: 'pummelo' },
	{ label: 'Quince', value: 'quince' },
	{ label: 'Raspberries', value: 'raspberries' },
	{ label: 'Rhubarb', value: 'rhubarb' },
	{ label: 'Rose-Apple', value: 'rose-apple' },
	{ label: 'Sapodilla', value: 'sapodilla' },
	{ label: 'Sapote, Mamey', value: 'sapote, mamey' },
	{ label: 'Soursop', value: 'soursop' },
	{ label: 'Strawberries', value: 'strawberries' },
	{ label: 'Sugar-Apple', value: 'sugar-apple' },
	{ label: 'Tamarind', value: 'tamarind' },
	{ label: 'Tangerine', value: 'tangerine' },
	{ label: 'Watermelon', value: 'watermelon' },
];

export function useSyncFruits() {
	return {
		name: 'fruit',
		fetch: async function fetch( { query, regex } ) {
			console.log( 'useSyncFruits', query );

			if ( query.length < 3 ) {
				return FRUITS;
			}

			return FRUITS.filter( ( { value } ) => regex.test( value ) );
		},
	};
}

export function useAsyncFruits() {
	return {
		name: 'fruit',
		fetch: async function fetch( { regex } ) {
			return new Promise( ( resolve ) => {
				setTimeout( () => {
					resolve( FRUITS.filter( ( { value } ) => regex.test( value ) ) );
				}, 5000 );
			} );
		},
	};
}
