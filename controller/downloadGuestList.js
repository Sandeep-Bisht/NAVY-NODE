// let registredUserInfo = require('../../models/registredUserInfo')
// const excel = require("exceljs");


// exports.getGuestExcel = async (req, res) => {

//     console.log("inside get guest excel getGuestExcel", req.body)

//     // try {
//     //     let workbook = new excel.Workbook();
//     //     let worksheet = workbook.addWorksheet("registredUserInfo");
//     //     worksheet.columns = [
//     //         { header: "Name", key: "name", },
//     //         { header: "Designation", key: "designation", },
//     //         { header: "Address", key: "address", },
//     //         { header: "Country", key: "country", },
//     //         { header: "Phone Number", key: "phoneNumber", },
//     //         { header: "Email", key: "email", },
//     //         { header: "Conference Mode", key: "conferenceMode", },
//     //         { header: "Registration Category", key: "registrationCategory", },
//     //         { header: "Registration Fee", key: "registrationFee", },
//     //         { header: "Registration Number", key: "registrationNumber" },
//     //         { header: "Title", key: "title" },
//     //         { header: "Nationality", key: "nationality" },
//     //         { header: "Participation Type", key: "participationType" },
//     //         { header: "Affilation", key: "affilation" },
//     //         { header: "Conference Mode", key: "conferenceMode" }
//     //     ];

//     //     // Add Array Rows
//     //     const users = await registredUserInfo.find()

//     //     worksheet.addRows(users);
//     //     res.setHeader(
//     //         "Content-Type",
//     //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     //     );
//     //     res.setHeader(
//     //         "Content-Disposition",
//     //         "attachment; filename=" + "registreduser.xlsx"
//     //     );
//     //     return workbook.xlsx.write(res).then(function () {
//     //         res.status(200).end();
//     //     });

//     // } catch (error) {
//     //     res.send({ message: "Error occured while fetching records" })
//     // }

// }