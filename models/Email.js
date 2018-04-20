'use strict';

const { Model } = require('objection');

class Email extends Model {
	static get tableName() {
		return 'emails';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['content'],

			properties: {
				id: {type: 'integer'},
				address: {type: 'string'},
				content: {type: 'string'}
			}
		};
	}

	static get relationMappings() {
		const User = require('./User');

		return {
			addressees: {
				relation: Model.ManyToManyRelation,
				modelClass: User,
				join: {
					from: 'emails.id',
					through: {
						from: 'emails_users.emailId',
						to: 'emails_users.userId'
					},
					to: 'users.id'
				}
			}
		};
	}
}

module.exports = Email;