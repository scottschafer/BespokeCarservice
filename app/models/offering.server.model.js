'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Offering Schema
 */
var OfferingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Offering name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Offering', OfferingSchema);