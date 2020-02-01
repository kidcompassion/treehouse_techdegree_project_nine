'use strict';

const Sequelize = require('sequelize');



module.exports = (sequelize) =>{
	class Course extends Sequelize.Model{}

	Course.init({
		id: {
			type:Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING,
			nullable: false,
			validate:{
				notEmpty:true
			}
		},
		description: {
			type: Sequelize.TEXT,
			nullable: false,
			validate:{
				notEmpty:true
			}
		},
		estimatedTime: {
			type: Sequelize.STRING,
			nullable: true,
			validate:{
				notEmpty:true
			}
		},
		materialsNeeded: {
			type: Sequelize.STRING,
			nullable: true,
			validate:{
				notEmpty:true
			}
		}
		
	},{sequelize});

	const User = sequelize.define('User');

	Course.associate = function(models) {
		
		Course.belongsTo(User, {
			foreignKey: {
				fieldName: 'userId',
				allowNull: false,
			},
			
		});
	}

	return Course;
}