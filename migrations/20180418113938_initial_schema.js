
exports.up = function(knex, Promise) {
  return knex.schema
  	.createTable('emails', table => {
  	  table.increments('id').primary();
    	table.string('address');
  		table.string('content');
  	})
};

exports.down = function(knex, Promise) {

};
