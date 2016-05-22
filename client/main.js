import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../api/resolutions.js';
//import { Session } from 'meteor/session';
import { Session } from 'meteor/session';
import './main.html';


Template.body.helpers({
	resolutions: function() {
		if (Session.get('hideFinished')){
			return Resolutions.find(
					{checked: {$ne: true}}
			);
		}
		return Resolutions.find();
	},
	hideFinished: function(){
		return Session.get('hideFinished');
	}
});

Template.body.events({
	'submit .new-resolution': function (event) {
		var title = event.target.title.value;
		Resolutions.insert({
			title: title,
			createAt: new Date()
		});

		event.target.title.value = "";
		return false;
	},
	'change .hide-finished': function(event){
		Session.set('hideFinished', event.target.checked);
	}
});
Template.resolution.events({
	'click .toggle-check': function(){
		Resolutions.update(this._id, {$set: {
			checked: !this.checked
		}});	
	},
	'click .remove': function () {
		Resolutions.remove(this._id);
	}
});