'use strict';

const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'users';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['emailAddress'],

			properties: {
				id: {type: 'integer'},
				emailAddress: {type: 'string'},
				name: {type: 'string'}
			}
		};
	}

	static get relationMappings() {
		const Email = require('./Email');

		return {
			received: {
				relation: Model.ManyToManyRelation,
				modelClass: Email,
				join: {
					from: 'users.id',
					through: {
						from: 'emails_users.userId',
						to: 'emails_users.emailId'
					},
					to: 'emails.id'
				}
			}
		};
	}
}

module.exports = User;