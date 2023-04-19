module.exports = (sequelize, DataTypes) =>{
    const DoctorAssigment = sequelize.define(
        "DoctorAssigment",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            dateOfAssigment: {
                type: DataTypes.DATE,
                allowNull: false
            },
            doctorDepartment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            doctorRole: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
    return DoctorAssigment;
}
