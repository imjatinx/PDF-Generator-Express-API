const express = require("express")
const con = require("../connection")
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();
const hbs = require("handlebars");
var wkhtmltopdf = require('wkhtmltopdf');

// Define a custom Handlebars helper functions

// match 2 strings equal or not
hbs.registerHelper('eq', function (value1, value2) {
    return value1 === value2;
});

hbs.registerHelper('eqNot', function (value1, value2) {
    return value1 != value2;
});


const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'pdftemplate', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf8')
    return hbs.compile(html)(data);
};

async function savedata(FirstName, LastName, Email, Phone, Course, Domain, Area, State, total, services) {
    services = JSON.stringify(services)
    const query = `INSERT INTO scholars (firstname,lastname,email,phone,course,domain,area,state,services,totalcost) VALUES ('${FirstName}','${LastName}','${Email}','${Phone}','${Course}','${Domain}','${Area}','${State}','${services}','${total}');`

    const result = con.query(query, function (err, result) {
        if (err) throw err;
        console.warn("all result are here", result)
    });
    return (result)
}

async function generatePdf(filename, data) {
    const content = await compile(filename, data);
    return (content);
}

router.post("/pdf", async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=certificate.pdf',
    });

    const services = req.body.Services
    const data = {
        "Personal":
        {
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "Domain": req.body.Domain,
            "Area": req.body.Area,
            "Topic": req.body.Topic,
            "Course":req.body.Course,
			"QueryID": req.body.QueryID,
			"PreparedBy": req.body.PreparedBy,
            "Current_Date": req.body.Current_Date,
            "Expiry_Date": req.body.Expiry_Date,
        },
        "Service": {
            ...services,
        },
        "Total": req.body.Total,
        "Qty":req.body.Qty,
		"Discount": req.body.Discount,
		"Extra": req.body.Extra,
        "Remark": req.body.Remark,
		"Payable": req.body.Payable,
		"Journal":req.body.Journal,
		"Installment":req.body.Installment,
		"InstallmentCount":req.body.InstallmentCount,
		"Offer":req.body.Offer 
    }
    // result = await savedata(FirstName, LastName, Email, Phone, Course, Domain, Area, State, total, services);

    // console.log(data)
    const abc = await generatePdf('index' ,data)

    wkhtmltopdf(abc,
        {
            pageSize: 'A4',
            orientation: 'Portrait',
            marginLeft: '1mm',
            marginTop: '1mm'
        }
    ).pipe(res)

})

router.post("/publication", async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=certificate.pdf',
    });

    const services = req.body.Services
    const data = {
        "Personal":
        {
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "Domain": req.body.Domain,
            "Area": req.body.Area,
            "Topic": req.body.Topic,
            "Course":req.body.Course,
			"QueryID": req.body.QueryID,
			"PreparedBy": req.body.PreparedBy,
            "Current_Date": req.body.Current_Date,
            "Expiry_Date": req.body.Expiry_Date,
        },
        "Service": {
            ...services,
        },
        "Total": req.body.Total,
        "Qty":req.body.Qty,
		"Discount": req.body.Discount,
		"Extra": req.body.Extra,
        "Remark": req.body.Remark,
		"Payable": req.body.Payable,
		"Journal":req.body.Journal,
		"Installment":req.body.Installment,
		"InstallmentCount":req.body.InstallmentCount,
		"Offer":req.body.Offer 
    }
    // result = await savedata(FirstName, LastName, Email, Phone, Course, Domain, Area, State, total, services);

    // console.log(data)
    const abc = await generatePdf('publication', data)

    wkhtmltopdf(abc,
        {
            pageSize: 'A4',
            orientation: 'Portrait',
            marginLeft: '1mm',
            marginTop: '1mm'
        }
    ).pipe(res)

})

module.exports = router;

