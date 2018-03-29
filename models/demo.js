'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bid = sequelize.define('Bid', {
        // TODO add correct parameters here
        path: DataTypes.STRING,
        template: DataTypes.STRING
    });

    return Bid;
};
