// create 5 burgers (at least 3 should be beef)

db.burger.insertMany([
	{
		name: 'The Big One',
		buns: 'plain',
		patty: 2,
		cheese: 'american',
		meat: 'beef',
		toppings: ['lettuce', 'tomatoes', 'onions', 'mustard', 'tomatoes'],
	},
	{
		name: 'Minimal',
		buns: 'plain',
		patty: 1,
		cheese: 'american',
		meat: 'beef',
	},
	{
		name: 'Triple beef',
		buns: 'plain',
		patty: 3,
		cheese: 'american',
		meat: 'beef',
		toppings: ['lettuce', 'tomatoes', 'onions', 'ketchup'],
	},
	{
		name: 'Chicken',
		buns: 'plain',
		patty: 1,
		cheese: 'american',
		meat: 'chicken',
		toppings: ['lettuce', 'tomatoes', 'onions'],
	},
	{
		name: 'Double Chicken',
		buns: 'plain',
		patty: 2,
		cheese: 'american',
		meat: 'chicken',
		toppings: ['lettuce', 'tomatoes', 'onions'],
	},
]);

// find all the burgers

db.burger.find();

// show just the meat of each burger

db.burger.find({}, { meat: 1 });

// show just the toppings of each burger

db.burger.find({}, { toppings: 1 });

// show everything but the cheese

db.burger.find({}, { cheese: 0 });

// find all the burgers with beef

db.burger.find({ meat: { $eq: 'beef' } });

// find all the burgers that are not beef

db.burger.find({ meat: { $ne: 'beef' } });

// find the first burger with cheese

db.find({ cheese: { $ne: null } }).limit(1);

// find one and update the first burger with cheese to have a property of 'double cheese'

db.burger.updateOne(
	{ cheese: { $ne: null } },
	{ $set: { cheese: 'double cheese' } }
);

// find the burger you updated to have double cheese

db.find({ cheese: { $eq: 'double cheese' } });

// find and update all the beef burgers to be 'veggie'

db.burger.updateMany({ meat: { $eq: 'beef' } }, { $set: { meat: 'veggie' } });

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})

db.burger.deleteOne({ meat: { $eq: 'veggie' } });

// drop the collection
//Expected Output
//true

db.burger.drop();

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }

db.dropDatabase();

//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database

// Change the name of the key cheese to 'pumpkinSpice'

db.burger.updateMany({}, { $rename: { cheese: 'pumpkinSpice' } });

// find all the burgers with ketchup (or another topping you used at least once)

db.burger.find({ toppings: { $exists: true } });

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles

db.burger.find({ toppings: { $all: ['lettuce'] } });

//finding all onions and dropping onions from topping
db.burger.updateMany(
	{ toppings: { $all: ['onions'] } },
	{ $pull: { toppings: 'onions' } }
);

// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact

//since I used an array for toppings
db.burger.updateMany({ meat: 'beef' }, { $push: { toppings: 'eggs' } });

//Add a price to each burger, start with $5.00 for each burger

db.burger.updateMany({ meat: 'beef' }, { $set: { price: '$5.00' } });
