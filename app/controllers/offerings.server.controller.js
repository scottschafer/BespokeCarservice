'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Offering = mongoose.model('Offering'),
	_ = require('lodash');

/**
 * Create a Offering
 */
exports.create = function(req, res) {
	var offering = new Offering(req.body);
	offering.user = req.user;

	offering.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(offering);
		}
	});
};

/**
 * Show the current Offering
 */
exports.read = function(req, res) {
	res.jsonp(req.offering);
};

/**
 * Update a Offering
 */
exports.update = function(req, res) {
	var offering = req.offering ;

	offering = _.extend(offering , req.body);

	offering.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(offering);
		}
	});
};

/**
 * Delete an Offering
 */
exports.delete = function(req, res) {
	var offering = req.offering ;

	offering.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(offering);
		}
	});
};

/**
 * List of Offerings
 */
exports.list = function(req, res) { 
	Offering.find().sort('-created').populate('user', 'displayName').exec(function(err, offerings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(offerings);
		}
	});
};

/**
 * Offering middleware
 */
exports.offeringByID = function(req, res, next, id) { 
	Offering.findById(id).populate('user', 'displayName').exec(function(err, offering) {
		if (err) return next(err);
		if (! offering) return next(new Error('Failed to load Offering ' + id));
		req.offering = offering ;
		next();
	});
};

/**
 * Offering authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.offering.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
