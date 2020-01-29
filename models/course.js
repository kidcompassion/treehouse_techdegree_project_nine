const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
	class Course extends Sequelize.Model {}

	Course.init({
		id: {
			type:Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING,
			nullable: false
		},
		description: {
			type: Sequelize.TEXT,
			nullable: false
		},
		estimatedTime: {
			type: Sequelize.STRING,
			nullable: true
		},
		materialsNeeded: {
			type: Sequelize.STRING,
			nullable: true
		}
		
	},{sequelize});

	Course.associate = (models) => {
		Course.belongsTo(models.User, {
			foreignKey: {
				fieldName: 'userId'
			},
		});
	};

	return Course;
}