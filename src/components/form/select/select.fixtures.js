export const OPTIONS = [
	{ label: 'Accept', value: 'accept' },
	{ label: 'Change', value: 'change' },
	{ label: 'Leave', value: 'leave' },
];

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
		fetch: async function fetch( { query, regex } ) {
			return new Promise( ( resolve ) => {
				if ( query.length < 3 ) {
					resolve( [] );
					return;
				}

				setTimeout( () => {
					resolve( FRUITS.filter( ( { value } ) => regex.test( value ) ) );
				}, 1000 );
			} );
		},
	};
}

export const USERS = [
	{
		guid: '75644317-ef91-4daa-8d64-ec95b82bcf88',
		picture: 'http://placehold.it/32x32',
		name: 'Tate Mcclure',
		company: 'Kog',
		email: 'tatemcclure@kog.com',
		phone: '+1 (802) 440-2815',
	},
	{
		guid: 'd785b3df-6b30-4b18-8ec9-e5c259e0583a',
		picture: 'http://placehold.it/32x32',
		name: 'Theresa Talley',
		company: 'Strezzo',
		email: 'theresatalley@strezzo.com',
		phone: '+1 (830) 572-3412',
	},
	{
		guid: '2526c2ac-c56e-4ce1-aab6-424e35120a5a',
		picture: 'http://placehold.it/32x32',
		name: 'Kara Dudley',
		company: 'Callflex',
		email: 'karadudley@callflex.com',
		phone: '+1 (875) 508-3119',
	},
	{
		guid: '09df6d81-11c2-4ce4-a635-2b4a87614522',
		picture: 'http://placehold.it/32x32',
		name: 'Mclaughlin Ward',
		company: 'Kangle',
		email: 'mclaughlinward@kangle.com',
		phone: '+1 (865) 533-2512',
	},
	{
		guid: '4814c741-7d89-4253-b951-21e2e1a76629',
		picture: 'http://placehold.it/32x32',
		name: 'Cristina Carrillo',
		company: 'Ecraze',
		email: 'cristinacarrillo@ecraze.com',
		phone: '+1 (996) 458-2693',
	},
	{
		guid: 'a995d1a3-40b3-4483-a78c-5f91d28f2e52',
		picture: 'http://placehold.it/32x32',
		name: 'Warren Wright',
		company: 'Hairport',
		email: 'warrenwright@hairport.com',
		phone: '+1 (866) 543-3362',
	},
	{
		guid: 'd629adf4-44d6-4170-832a-27e7578340d0',
		picture: 'http://placehold.it/32x32',
		name: 'Janette Juarez',
		company: 'Rameon',
		email: 'janettejuarez@rameon.com',
		phone: '+1 (951) 430-3325',
	},
	{
		guid: '760a4c47-3f04-447d-90fb-04761b2f6314',
		picture: 'http://placehold.it/32x32',
		name: 'Kristie Bell',
		company: 'Evidends',
		email: 'kristiebell@evidends.com',
		phone: '+1 (995) 549-3719',
	},
	{
		guid: 'e8e5ad36-b14b-4c73-857f-ebff882405f7',
		picture: 'http://placehold.it/32x32',
		name: 'Darlene Mcgowan',
		company: 'Parleynet',
		email: 'darlenemcgowan@parleynet.com',
		phone: '+1 (880) 596-2839',
	},
	{
		guid: '96b09657-4597-4ebe-b3cc-4ffb7b0bad7b',
		picture: 'http://placehold.it/32x32',
		name: 'Browning Hunt',
		company: 'Wazzu',
		email: 'browninghunt@wazzu.com',
		phone: '+1 (889) 492-2150',
	},
	{
		guid: '9b4632e5-0811-40a1-8d05-88fd242da4a7',
		picture: 'http://placehold.it/32x32',
		name: 'Nora Mueller',
		company: 'Comfirm',
		email: 'noramueller@comfirm.com',
		phone: '+1 (868) 482-3292',
	},
	{
		guid: '174240ce-c284-43fe-826a-48b186377403',
		picture: 'http://placehold.it/32x32',
		name: 'Lessie Stevens',
		company: 'Furnigeer',
		email: 'lessiestevens@furnigeer.com',
		phone: '+1 (970) 492-3961',
	},
	{
		guid: '655267a6-7dad-4c2c-905c-7fbebed4743c',
		picture: 'http://placehold.it/32x32',
		name: 'Mcneil Odom',
		company: 'Quiltigen',
		email: 'mcneilodom@quiltigen.com',
		phone: '+1 (908) 577-2178',
	},
	{
		guid: 'f9cc2b85-5240-4b2a-88fb-c57182c80129',
		picture: 'http://placehold.it/32x32',
		name: 'Maritza Kirkland',
		company: 'Corpulse',
		email: 'maritzakirkland@corpulse.com',
		phone: '+1 (902) 583-3292',
	},
	{
		guid: '385a2305-b438-4e62-8515-0d7c880ac24d',
		picture: 'http://placehold.it/32x32',
		name: 'Gertrude Decker',
		company: 'Polarax',
		email: 'gertrudedecker@polarax.com',
		phone: '+1 (818) 558-3788',
	},
	{
		guid: '0ee507a3-3d02-49a8-baba-abf34513ff11',
		picture: 'http://placehold.it/32x32',
		name: 'Nicholson Rose',
		company: 'Boilcat',
		email: 'nicholsonrose@boilcat.com',
		phone: '+1 (837) 453-3842',
	},
	{
		guid: '5ffa2a56-286e-4d36-a627-9cbf35000918',
		picture: 'http://placehold.it/32x32',
		name: 'Klein Gillespie',
		company: 'Magmina',
		email: 'kleingillespie@magmina.com',
		phone: '+1 (901) 408-3183',
	},
	{
		guid: '9da764f4-57a1-4884-a32b-89f77e57fae1',
		picture: 'http://placehold.it/32x32',
		name: 'Medina Cantu',
		company: 'Accufarm',
		email: 'medinacantu@accufarm.com',
		phone: '+1 (933) 486-2267',
	},
	{
		guid: '4f25e282-8fd3-4d5c-9fcf-bd7dfaa622da',
		picture: 'http://placehold.it/32x32',
		name: 'Noel Franks',
		company: 'Geekmosis',
		email: 'noelfranks@geekmosis.com',
		phone: '+1 (881) 503-3864',
	},
	{
		guid: '6e70c86d-ecc6-40b3-bf09-3683ba4f22ef',
		picture: 'http://placehold.it/32x32',
		name: 'Terri Blankenship',
		company: 'Exoblue',
		email: 'terriblankenship@exoblue.com',
		phone: '+1 (814) 452-3350',
	},
	{
		guid: 'b957edf4-be3f-4d4d-bc80-1ce29dd978f3',
		picture: 'http://placehold.it/32x32',
		name: 'Gibbs Foley',
		company: 'Geekular',
		email: 'gibbsfoley@geekular.com',
		phone: '+1 (975) 573-2961',
	},
	{
		guid: '3f3d4547-5f67-4692-822a-d975763957d5',
		picture: 'http://placehold.it/32x32',
		name: 'Webb Moses',
		company: 'Elpro',
		email: 'webbmoses@elpro.com',
		phone: '+1 (913) 578-3950',
	},
	{
		guid: '0eb2db16-ac05-4a93-9128-f964508882d9',
		picture: 'http://placehold.it/32x32',
		name: 'Gabriela Bennett',
		company: 'Nspire',
		email: 'gabrielabennett@nspire.com',
		phone: '+1 (802) 533-3143',
	},
	{
		guid: '611e954b-f5b0-48c4-8e16-7ea912255fc8',
		picture: 'http://placehold.it/32x32',
		name: 'Rhoda Mullen',
		company: 'Recritube',
		email: 'rhodamullen@recritube.com',
		phone: '+1 (947) 556-2777',
	},
	{
		guid: 'd0ab1536-d140-4262-9f1c-30bbefcdb78d',
		picture: 'http://placehold.it/32x32',
		name: 'Kaitlin Perez',
		company: 'Viasia',
		email: 'kaitlinperez@viasia.com',
		phone: '+1 (827) 508-3012',
	},
	{
		guid: '9e762ecf-d7cc-4efd-9348-a71eaf1b8fe7',
		picture: 'http://placehold.it/32x32',
		name: 'Mayra Contreras',
		company: 'Xelegyl',
		email: 'mayracontreras@xelegyl.com',
		phone: '+1 (902) 512-3784',
	},
	{
		guid: '5c2d3890-d9da-4f93-8019-26b245a2586f',
		picture: 'http://placehold.it/32x32',
		name: 'Ross Emerson',
		company: 'Isotrack',
		email: 'rossemerson@isotrack.com',
		phone: '+1 (998) 428-3176',
	},
	{
		guid: 'e806665e-f38d-45ce-8b57-5807f0bde12a',
		picture: 'http://placehold.it/32x32',
		name: 'Rojas Stokes',
		company: 'Enaut',
		email: 'rojasstokes@enaut.com',
		phone: '+1 (907) 497-2994',
	},
	{
		guid: '96b4d052-855c-4133-8a13-932fdc241db0',
		picture: 'http://placehold.it/32x32',
		name: 'Ewing Dickerson',
		company: 'Glukgluk',
		email: 'ewingdickerson@glukgluk.com',
		phone: '+1 (875) 579-2681',
	},
	{
		guid: '92bc863a-a2ac-4cdd-8d37-e493499efe81',
		picture: 'http://placehold.it/32x32',
		name: 'Edwina English',
		company: 'Filodyne',
		email: 'edwinaenglish@filodyne.com',
		phone: '+1 (945) 523-2497',
	},
	{
		guid: '1f8a6124-9ac7-406b-b50a-04079f42d903',
		picture: 'http://placehold.it/32x32',
		name: 'Louisa Mcleod',
		company: 'Sustenza',
		email: 'louisamcleod@sustenza.com',
		phone: '+1 (929) 494-3563',
	},
	{
		guid: '4f98a35d-8120-4d34-be23-25cbf26ad799',
		picture: 'http://placehold.it/32x32',
		name: 'Kim Koch',
		company: 'Momentia',
		email: 'kimkoch@momentia.com',
		phone: '+1 (843) 587-2043',
	},
	{
		guid: 'd1462838-9715-4731-a83e-d67b2f562a9a',
		picture: 'http://placehold.it/32x32',
		name: 'Chasity Dickson',
		company: 'Emergent',
		email: 'chasitydickson@emergent.com',
		phone: '+1 (940) 518-2990',
	},
	{
		guid: 'd6b9d08c-4441-483d-b9d7-da6276d3eefe',
		picture: 'http://placehold.it/32x32',
		name: 'Slater Mills',
		company: 'Ezentia',
		email: 'slatermills@ezentia.com',
		phone: '+1 (992) 512-2975',
	},
	{
		guid: '20dd9ee2-d5c7-4924-b5b1-3987b7c79782',
		picture: 'http://placehold.it/32x32',
		name: 'Tran Witt',
		company: 'Prowaste',
		email: 'tranwitt@prowaste.com',
		phone: '+1 (963) 494-3043',
	},
	{
		guid: '0928fdd3-b55a-4721-80b5-0dcd9a34229d',
		picture: 'http://placehold.it/32x32',
		name: 'Fisher Cooley',
		company: 'Hyplex',
		email: 'fishercooley@hyplex.com',
		phone: '+1 (976) 483-2466',
	},
	{
		guid: '0cca2858-698f-45fe-ade4-5357d6fe1a02',
		picture: 'http://placehold.it/32x32',
		name: 'Daugherty Wyatt',
		company: 'Cuizine',
		email: 'daughertywyatt@cuizine.com',
		phone: '+1 (826) 486-2607',
	},
	{
		guid: 'ab35ad9a-4f1f-4cfd-a94b-9ecece400226',
		picture: 'http://placehold.it/32x32',
		name: 'Charlene Hanson',
		company: 'Zidant',
		email: 'charlenehanson@zidant.com',
		phone: '+1 (992) 440-2779',
	},
	{
		guid: '27f6ed64-cdbb-4fa9-ac10-83728d4bcb56',
		picture: 'http://placehold.it/32x32',
		name: 'Solomon Rivas',
		company: 'Entroflex',
		email: 'solomonrivas@entroflex.com',
		phone: '+1 (881) 512-3163',
	},
	{
		guid: '18106902-08a1-467c-bfbd-45d640750a92',
		picture: 'http://placehold.it/32x32',
		name: 'Janna Mckinney',
		company: 'Pyramax',
		email: 'jannamckinney@pyramax.com',
		phone: '+1 (867) 588-3063',
	},
	{
		guid: 'aa675a8c-5f4a-4606-8567-8e17d033be52',
		picture: 'http://placehold.it/32x32',
		name: 'Francine Finley',
		company: 'Vendblend',
		email: 'francinefinley@vendblend.com',
		phone: '+1 (808) 422-3224',
	},
	{
		guid: '52243942-cab4-4454-89a3-d42ebcbfb89a',
		picture: 'http://placehold.it/32x32',
		name: 'Mari Lawson',
		company: 'Musanpoly',
		email: 'marilawson@musanpoly.com',
		phone: '+1 (949) 519-2050',
	},
	{
		guid: '2bcbbaa9-6f9e-4650-8317-0a7866aa83c3',
		picture: 'http://placehold.it/32x32',
		name: 'Brenda Sims',
		company: 'Venoflex',
		email: 'brendasims@venoflex.com',
		phone: '+1 (966) 573-2666',
	},
	{
		guid: '43e17d51-c400-45f0-b0b2-9a7f540f0610',
		picture: 'http://placehold.it/32x32',
		name: 'Little Shepard',
		company: 'Tersanki',
		email: 'littleshepard@tersanki.com',
		phone: '+1 (942) 575-2280',
	},
	{
		guid: '6cf619d6-2af8-4977-8062-1d3ae38d06e9',
		picture: 'http://placehold.it/32x32',
		name: 'Sampson Blake',
		company: 'Combogen',
		email: 'sampsonblake@combogen.com',
		phone: '+1 (913) 540-2859',
	},
	{
		guid: 'b30c6c15-922b-418d-9e40-30609bf50bdd',
		picture: 'http://placehold.it/32x32',
		name: 'Angelina Gutierrez',
		company: 'Obliq',
		email: 'angelinagutierrez@obliq.com',
		phone: '+1 (992) 518-3446',
	},
	{
		guid: '40819de8-528c-4dc7-a57d-f7a2de28222d',
		picture: 'http://placehold.it/32x32',
		name: 'Sherman Galloway',
		company: 'Bulljuice',
		email: 'shermangalloway@bulljuice.com',
		phone: '+1 (984) 581-3283',
	},
	{
		guid: '71e27b46-e846-4222-9e6b-47926e46bdfe',
		picture: 'http://placehold.it/32x32',
		name: 'Lauren Bailey',
		company: 'Duflex',
		email: 'laurenbailey@duflex.com',
		phone: '+1 (873) 537-3021',
	},
	{
		guid: 'c21d9213-9b97-4cd5-875c-a352d711cbec',
		picture: 'http://placehold.it/32x32',
		name: 'Foreman Wynn',
		company: 'Waretel',
		email: 'foremanwynn@waretel.com',
		phone: '+1 (879) 498-2065',
	},
	{
		guid: 'ec96355e-53de-4594-ac5c-6196d7bc8644',
		picture: 'http://placehold.it/32x32',
		name: 'Noelle Mcdonald',
		company: 'Techade',
		email: 'noellemcdonald@techade.com',
		phone: '+1 (808) 550-2993',
	},
	{
		guid: 'b5779238-c598-4b87-af86-ed0af6a82caf',
		picture: 'http://placehold.it/32x32',
		name: 'Diann Walker',
		company: 'Pharmacon',
		email: 'diannwalker@pharmacon.com',
		phone: '+1 (864) 575-3563',
	},
	{
		guid: '449cc7b4-d001-49d4-a8b4-97724ad51b3b',
		picture: 'http://placehold.it/32x32',
		name: 'Waters Kaufman',
		company: 'Interodeo',
		email: 'waterskaufman@interodeo.com',
		phone: '+1 (931) 467-3980',
	},
	{
		guid: '56d851fa-1036-4c90-9ef4-38ad90488b07',
		picture: 'http://placehold.it/32x32',
		name: 'Enid Myers',
		company: 'Comtours',
		email: 'enidmyers@comtours.com',
		phone: '+1 (891) 524-2083',
	},
	{
		guid: '59095753-d374-4627-9cbc-d5b55d858156',
		picture: 'http://placehold.it/32x32',
		name: 'Jordan Ray',
		company: 'Isonus',
		email: 'jordanray@isonus.com',
		phone: '+1 (861) 436-2657',
	},
	{
		guid: 'b5f66f34-4add-48e2-8665-03192ca60ba2',
		picture: 'http://placehold.it/32x32',
		name: 'Georgina Morse',
		company: 'Powernet',
		email: 'georginamorse@powernet.com',
		phone: '+1 (804) 577-2331',
	},
	{
		guid: 'c682ba3c-29b9-41e9-a7b1-26857957be30',
		picture: 'http://placehold.it/32x32',
		name: 'Mack Lester',
		company: 'Empirica',
		email: 'macklester@empirica.com',
		phone: '+1 (968) 457-2573',
	},
];

export function useSyncUsers() {
	return {
		name: 'user',
		adapter: {
			getValue( user ) {
				return String( user.guid );
			},
			getLabel( user ) {
				return user.name;
			},
		},
		fetch: async function fetch( { query, regex } ) {
			if ( query.length < 3 ) {
				return USERS;
			}

			return USERS.filter( ( { name } ) => regex.test( name ) );
		},
	};
}

export function useAsyncUsers() {
	return {
		name: 'user',
		adapter: {
			getValue( user ) {
				return String( user.guid );
			},
			getLabel( user ) {
				return user.name;
			},
		},
		fetch: async function fetch( { query, regex } ) {
			return new Promise( ( resolve ) => {
				if ( query.length < 3 ) {
					resolve( [] );
					return;
				}

				setTimeout( () => {
					resolve( USERS.filter( ( { name } ) => regex.test( name ) ) );
				}, 1000 );
			} );
		},
	};
}

export function useSyncOptions() {
	return {
		name: 'life-option',
		fetch: function fetch( { query, regex } ) {
			if ( query.length < 3 ) {
				return [];
			}

			return OPTIONS.filter( ( { value } ) => regex.test( value ) );
		},
	};
}

export function useAsyncOptions() {
	return {
		name: 'life-option',
		fetch: async function fetch( { query, regex } ) {
			return new Promise( ( resolve ) => {
				if ( query.length < 3 ) {
					resolve( [] );
					return;
				}

				setTimeout( () => {
					resolve( OPTIONS.filter( ( { value } ) => regex.test( value ) ) );
				}, 750 );
			} );
		},
	};
}

export function useSlowAsyncOptions() {
	return {
		name: 'life-option',
		fetch: async function fetch( { query, regex } ) {
			return new Promise( ( resolve ) => {
				if ( query.length < 3 ) {
					resolve( [] );
					return;
				}

				setTimeout( () => {
					resolve( OPTIONS.filter( ( { value } ) => regex.test( value ) ) );
				}, 1750 );
			} );
		},
	};
}
