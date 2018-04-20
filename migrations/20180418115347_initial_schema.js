
exports.up = function(knex, Promise) {
  return knex.schema
  	.createTable('emails', table => {
  	  	table.increments('id').primary();
    	table.string('address');
  		table.string('content');
  	})
  	.createTable('users', table => {
  		table.increments('id').primary();
  		table.string('name');
  		table.string('emailAddress');
  	})
  	.createTable('emails_users', table =>{
  		table.increments('id').primary();
  		table
  			.integer('emailId')
  			.unsigned()
  			.references('id')
  			.inTable('emails')
  			.onDelete('CASCADE');
  		table
  			.integer('userId')
  			.unsigned()
  			.references('id')
  			.inTable('users')
  			.onDelete('CASCADE');
  	})
};

exports.down = function(knex, Promise) {
  return knex.schema
  	.dropTableIfExists('emails')
  	.dropTableIfExists('users')
  	.dropTableIfExists('emails_users')
};
