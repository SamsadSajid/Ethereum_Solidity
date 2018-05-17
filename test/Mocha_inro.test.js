// /*
// 	getting my hands dirty with Mocha
// */

// // assertion about test. We can assert x is equal to 3
// const assert = require('assert');


// class Car{

// 	park(){
// 		return 'stopped';
// 	}

// 	drive(){
// 		return 'vroom';
// 	}
// }

// // as the value of car will change each time beforeach is called, we won't use const here.
// let car;
// let i = 0;

// beforeEach(() => {
// 	console.log("Running test "+ i +" 	#####");
// 	car = new Car();
// 	i++;
// });


// describe('Car class', () => {
// 	it('can park', () => {
// 		assert.equal(car.park(), 'stopped');
// 	});

// 	it('can drive', () => {
// 		assert.equal(car.drive(), 'vroom');
// 	});
// });

