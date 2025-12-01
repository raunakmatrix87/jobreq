sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    'sap/ui/model/Sorter',
    'sap/ui/core/library',
    'sap/m/p13n/Engine',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/SortController',
    'sap/m/p13n/GroupController',
    'sap/m/p13n/MetadataHelper',
    'sap/m/table/ColumnWidthController'
], (Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator, FilterType, exportLibrary, Spreadsheet, Sorter, CoreLibrary, Engine, SelectionController, SortController, GroupController, MetadataHelper, ColumnWidthController) => {
    "use strict";
    const EdmType = exportLibrary.EdmType;

    return Controller.extend("com.sap.sj.jobreq.controller.View1", {
        onInit: function () {
            // this._loadPositions();
            // Sample data for dropdowns
            var aCategories = [
                { key: "Majid Al Futtaim Ventures", text: "Majid Al Futtaim Ventures" },
                { key: "OpCo Europe", text: "OpCo Europe" }
            ];

            var aRegions = [
                { key: "LifeStyle", text: "LifeStyle" },
                { key: "L&E", text: "L&E" },
                { key: "Cinemas", text: "Cinemas" },
                { key: "Finance", text: "Finance" }
            ];

            var aStatuses = [
                { key: "Active", text: "Active" },
                { key: "Pending", text: "Pending" },
                { key: "Inactive", text: "Inactive" }
            ];

            // Initialize models
            var oFilterModel = new JSONModel({
                category: "",
                region: "",
                status: "",
                categories: aCategories,
                regions: aRegions,
                statuses: aStatuses
            });


            var rData = [
                {
                    "CountryRegion": "Pakistan",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Aqsa Tariq",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "atariq@maf.ae"
                },
                {
                    "CountryRegion": "Georgia",
                    "MainRecruiter": "Natia Ukhurgunashvili",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mari Iarajuli",
                    "MainRecruiterEmail": "atariq@maf.ae",
                    "AssignedRecruiterEmail": "MIarajuli@maf.ae"
                },
                {
                    "CountryRegion": "United Arab Emirates",
                    "MainRecruiter": "Kohar Kayabalian",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Hossam Saleh",
                    "MainRecruiterEmail": "MIarajuli@maf.ae",
                    "AssignedRecruiterEmail": "hhsaleh@mafcarrefour.com"
                },
                {
                    "CountryRegion": "Kenya",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Caroline Muya",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "cmuya@maf.ae"
                },
                {
                    "CountryRegion": "Uganda",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Caroline Muya",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "cmuya@maf.ae"
                },
                {
                    "CountryRegion": "Lebanon",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mazen Kassab",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "Mkassab@maf.ae"
                },
                {
                    "CountryRegion": "Saudi Arabia",
                    "MainRecruiter": "Mahmoud Kamal",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Salma Alfehaid",
                    "MainRecruiterEmail": "maothm@mafcarrefour.com",
                    "AssignedRecruiterEmail": "salfehaid@maf.ae"
                },
                {
                    "CountryRegion": "Bahrain",
                    "MainRecruiter": "Mahmoud Kamal",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mmaiuak",
                    "MainRecruiterEmail": "maothm@mafcarrefour.com",
                    "AssignedRecruiterEmail": "mmaiouak@maf.ae"
                },
                {
                    "CountryRegion": "Kuwait",
                    "MainRecruiter": "Mahmoud Kamal",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mmaiuak",
                    "MainRecruiterEmail": "maothm@mafcarrefour.com",
                    "AssignedRecruiterEmail": "mmaiouak@maf.ae"
                },
                {
                    "CountryRegion": "Qatar",
                    "MainRecruiter": "Mahmoud Kamal",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mmaiuak",
                    "MainRecruiterEmail": "maothm@mafcarrefour.com",
                    "AssignedRecruiterEmail": "mmaiouak@maf.ae"
                },
                {
                    "CountryRegion": "Oman",
                    "MainRecruiter": "Mahmoud Kamal",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mmaiuak",
                    "MainRecruiterEmail": "maothm@mafcarrefour.com",
                    "AssignedRecruiterEmail": "mmaiouak@maf.ae"
                },
                {
                    "CountryRegion": "Hyperstar",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Seyedeh Osveh",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "snezhad@mafpars.com"
                },
                {
                    "CountryRegion": "Egypt",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mohamed Salah",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "mohamels@maf.ae"
                },
                {
                    "CountryRegion": "Iraq",
                    "MainRecruiter": "Mohamed Mamdouh",
                    "EmployeeID": "",
                    "AssignedRecruiter": "Mhmoud Adnan",
                    "MainRecruiterEmail": "mohameabd@mafcarrefour.com",
                    "AssignedRecruiterEmail": "malaydi@maf.ae"
                }
            ]

            var sData = [
                {
                    "OpCo": "MAFR",
                    "IsUAEHire": "Yes",
                    "SourcingLead": "Fatima Khawaja Farhan Uddin",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Ousama Ali",
                    "SourcingLeadEmail": "Fatima.sheikh@maf.ae",
                    "SourcingSpecialistEmail": "Ousama.Chmissa@maf.ae"
                },
                {
                    "OpCo": "MAFP",
                    "IsUAEHire": "Yes",
                    "SourcingLead": "Fatima Khawaja Farhan Uddin",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Hessa Khalid Obaid Khadim Moh",
                    "SourcingLeadEmail": "Fatima.sheikh@maf.ae",
                    "SourcingSpecialistEmail": "Hessa.KMohammad@maf.ae"
                },
                {
                    "OpCo": "MAFL",
                    "IsUAEHire": "Yes",
                    "SourcingLead": "Fatima Khawaja Farhan Uddin",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Hessa Khalid Obaid Khadim Moh",
                    "SourcingLeadEmail": "Fatima.sheikh@maf.ae",
                    "SourcingSpecialistEmail": "Hessa.KMohammad@maf.ae"
                },
                {
                    "OpCo": "MAFGS",
                    "IsUAEHire": "Yes",
                    "SourcingLead": "Lenzil Leslie Henriques",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Lenzil Leslie Henriques",
                    "SourcingLeadEmail": "Lenzil.Henriques@maf.ae",
                    "SourcingSpecialistEmail": "Lenzil.Henriques@maf.ae"
                },
                {
                    "OpCo": "MAFE",
                    "IsUAEHire": "Yes",
                    "SourcingLead": "Jawaher Almteiri",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Jawaher Almteiri",
                    "SourcingLeadEmail": "Jawaher.Almteiri@maf.ae",
                    "SourcingSpecialistEmail": "Jawaher.Almteiri@maf.ae"
                },
                {
                    "OpCo": "MAFR",
                    "IsUAEHire": "No",
                    "SourcingLead": "Mariam Hesham Mohy ElDin Monib",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Eslam Mohamed Hosny",
                    "SourcingLeadEmail": "Mariam.Hesham@maf.ae",
                    "SourcingSpecialistEmail": "Eslam.Hosney@maf.ae"
                },
                {
                    "OpCo": "MAFL",
                    "IsUAEHire": "No",
                    "SourcingLead": "Yara Belal Badr Eldin Elnabara",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Tasniem Badr ElDin Kamal Mohamed Abdu",
                    "SourcingLeadEmail": "Yara.Belal@maf.ae",
                    "SourcingSpecialistEmail": "tasneem.badreldeen@maf.ae"
                },
                {
                    "OpCo": "MAFE",
                    "IsUAEHire": "No",
                    "SourcingLead": "Yara Belal Badr Eldin Elnabara",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "Nour Elgahel",
                    "SourcingLeadEmail": "Yara.Belal@maf.ae",
                    "SourcingSpecialistEmail": "nour.elgahel@maf.ae"
                },
                {
                    "OpCo": "MAFGS",
                    "IsUAEHire": "No",
                    "SourcingLead": "",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "",
                    "SourcingLeadEmail": "",
                    "SourcingSpecialistEmail": ""
                },
                {
                    "OpCo": "MAFP",
                    "IsUAEHire": "No",
                    "SourcingLead": "",
                    "SourcingLeadEmployeeID": "",
                    "SourcingSpecialist": "",
                    "SourcingLeadEmail": "",
                    "SourcingSpecialistEmail": ""
                }
            ]

            var oLocalDataModel = new JSONModel({
                "recuriterData": rData,
                'sourcerData': sData
            });

            this.getView().setModel(oFilterModel, "filterModel");
            this.getView().setModel(oLocalDataModel, "localModel");
            var oSelectedItemsModel = new JSONModel([]);
            this.getView().setModel(oSelectedItemsModel, "jobReqModel");
            this._registerForP13n();
            this._registerForrP13n();
            //var oODataModel = this.getOwnerComponent().getModel();
            var oTable = this.byId("positionsTable");
            oTable.setBusy(true);
            // oODataModel.attachRequestSent(function () {
            //     oTable.setBusy(true);
            // });

            // oODataModel.attachRequestCompleted(function () {
            //     oTable.setBusy(false);
            // });
        },
        onRowsUpdated: function (oEvent) {
            var oTable = this.byId("positionsTable");
            oTable.setBusy(false);
        },

        _loadPositions: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oTable = this.byId("positionsTable");

            oModel.read("/Position", {
                urlParameters: {
                    "$top": 10
                },
                success: function (oData) {

                    var oTableModel = new JSONModel(oData.results);
                    this.getView().setModel(oTableModel, "tableModel");

                    oTable.setModel(oTableModel, "tableModel");
                    oTable.bindRows("tableModel>/");
                }.bind(this),

                error: function (oErr) {
                    MessageToast.show("Failed to load Positions");
                }
            });
        },

        openPersoDialog: function (oEvt) {
            var oView = this.getView();
            var oTable = oView.byId("positionsTable");

            Engine.getInstance().show(oTable, ["Columns", "Sorter", "Groups"], {
                contentHeight: "35rem",
                contentWidth: "32rem",
                source: oEvt.getSource()
            });
        },
        onreqPersonalize: function (oEvt) {
            var oView = this.getView();
            var oTable = oView.byId("reqTable");

            Engine.getInstance().show(oTable, ["Columns", "Sorter", "Groups"], {
                contentHeight: "35rem",
                contentWidth: "32rem",
                source: oEvt.getSource()
            });
        },
        handleStatesChange: function (oEvt) {
            var oView = this.getView();
            var oTable = oView.byId("reqTable");
            var oState = oEvt.getParameter("state");
            var oId = oEvt.getParameters().control.getId();
            if (oId.indexOf("reqTable") !== -1) {
                oTable.getColumns().forEach(function (oColumn) {
                    oColumn.setVisible(false);

                });

                oState.Columns.forEach(function (oProp, iIndex) {
                    var oCol = oView.byId(oProp.key);
                    oCol.setVisible(true);

                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));

                var aSorter = [];
                oState.Sorter.forEach(function (oSorter) {
                    var oColumn = oView.byId(oSorter.key);
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(oSorter.descending ? CoreLibrary.SortOrder.Descending : CoreLibrary.SortOrder.Ascending);
                    aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oSorter.key).path, oSorter.descending));
                }.bind(this));
                oTable.getBinding("rows").sort(aSorter);
            }

        },
        handleStateChange: function (oEvt) {
            var oView = this.getView();
            var oTable = oView.byId("positionsTable");
            var oState = oEvt.getParameter("state");
            var oId = oEvt.getParameters().control.getId();

            if (oId.indexOf("positionsTable") !== -1) {



                oTable.getColumns().forEach(function (oColumn) {
                    oColumn.setVisible(false);

                });

                oState.Columns.forEach(function (oProp, iIndex) {
                    var oCol = oView.byId(oProp.key);
                    oCol.setVisible(true);

                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));

                var aSorter = [];
                oState.Sorter.forEach(function (oSorter) {
                    var oColumn = oView.byId(oSorter.key);
                    oColumn.setSorted(true);
                    oColumn.setSortOrder(oSorter.descending ? CoreLibrary.SortOrder.Descending : CoreLibrary.SortOrder.Ascending);
                    aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oSorter.key).path, oSorter.descending));
                }.bind(this));
                oTable.getBinding("rows").sort(aSorter);
                oTable.setBusy(true);
            }

        },
        onExport: function () {
            if (!this._oTable) {
                this._oTable = this.byId("positionsTable");
            }

            const oTable = this._oTable;
            const oRowBinding = oTable.getBinding("rows");
            const aCols = this.createColumnConfig();
            const oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: "Level"
                },
                dataSource: {
                    type: "odata",
                    dataUrl: oRowBinding.getDownloadUrl(),
                    serviceUrl: this.getOwnerComponent().getModel().sServiceUrl,
                    count: oRowBinding.getLength()
                },
                fileName: "TPD SUMMARY_" + this.formatDate(new Date()) + ".xlsx",
                worker: false // We need to disable worker because we are using a MockServer as OData Service
            };

            const oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },
        createColumnConfig: function () {
            const aCols = [];

            aCols.push({
                label: "TPD ID",
                property: "TPDNumber",
                type: EdmType.String,
            });

            aCols.push({
                label: "PART NUMBER",
                type: EdmType.String,
                property: "PolestarPartNumber",
            });

            aCols.push({
                label: "PART NAME",
                property: "PartName",
                type: EdmType.String
            });

            aCols.push({
                label: "STATUS",
                property: "StatusText",
                type: EdmType.String
            });

            aCols.push({
                label: "SUPPLIER ID",
                property: "SupplierDetails_SupplierId",
                type: EdmType.String
            });

            aCols.push({
                label: "SUPPLIER CODE",
                property: "SupplierDetails_SupplierCode",
                type: EdmType.String,
            });

            aCols.push({
                label: "R&D CONTACT",
                property: "PolestarRDContact",
                type: EdmType.String
            });

            aCols.push({
                label: "SQM CONTACT",
                property: "PolestarSQMContact",
                type: EdmType.String,
            });
            //     aCols.push({
            //     label: "Deviation Parts",
            //     property: "AffectedPrograms",
            //     type: EdmType.String,
            //     formatter: this.formatNavigationData
            // });

            return aCols;
        },
        _registerForP13n: function () {
            var oView = this.getView();
            var oTable = oView.byId("positionsTable");
            this.oMetadataHelper = new MetadataHelper([
                { key: "icode", path: "code", label: "Code" },
                { key: "iptitle", path: "jobTitle", label: "Position Title" },
                { key: "isdate", path: "effectiveStartDate", label: "Start Date" },
                { key: "istatus", path: "effectiveStatus", label: "Status" },
                { key: "iop", path: "cust_opcoNav/label_defaultValue", label: "OpCo" },
                { key: "ibentity", path: "cust_BusinessUnitNav/label_defaultValue", label: "Business Entity" },
                { key: "iopunit", path: "businessUnit", label: "Operating Unit" },
                { key: "iopcomp", path: "company", label: "Operating Company" },
                { key: "idivision", path: "division", label: "Division/Entity" },
                { key: "idep", path: "department", label: "Department" },
                { key: "iloc", path: "location", label: "Location(City)" },
                { key: "ccentre", path: "CostCenter", label: "Cost Centre" },
                { key: "iwloc", path: "cust_City", label: "Work Location" },
                { key: "iorgname", path: "cust_Organization_NameNav/label_defaultValue", label: "Orgnaisation Name" },
                { key: "ijcode", path: "jobCode", label: "Job Code" },
                { key: "ijtitle", path: "jobTitle", label: "Job Title" },
                { key: "ioplevel", path: "cust_OpcoLevelNav/label_defaultValue", label: "OpCo Level" },
                { key: "ijfn", path: "cust_JobFunction", label: "Job Function" },
                { key: "ijfam", path: "JobFamicust_JobFamilyNav/label_defaultValuely", label: "Job Family" },
                { key: "ifte", path: "targetFTE", label: "FTE" },
                { key: "ipgrd", path: "payGrade", label: "Pay Grade" },
                { key: "imipay", path: "cust_MinimumPay", label: "Minimum Pay" },
                { key: "impoint", path: "cust_MidPoint", label: "Mid Point" },
                { key: "imapay", path: "cust_MaximumPay", label: "Maximum Pay" },
                { key: "ieclass", path: "employeeClassNav/label_defaultValue", label: "Employee Class" },
                { key: "iregtemp", path: "regularTemporaryNav/label_defaultValue", label: "Regular/Temporary" },
                { key: "icalevel", path: "cust_OrgLevelNav/label_defaultValue", label: "Career Level" },
                { key: "irarch", path: "cust_RoleArchetypeNav/label_defaultValue", label: "Role Archetype" },
                { key: "ibudg", path: "cust_BudgetedNonBudgetedNav/label_defaultValue", label: "Budgeted" },
                { key: "itbre", path: "vacant", label: "To Be Recruited" },
                { key: "impo", path: "multipleIncumbentsAllowed", label: "Mass Position" },
                { key: "icrpos", path: "CriticalPosition", label: "Critical Position" },
                { key: "ihlpos", path: "HigherLevelPosition", label: "Higher-Level Position" },
                { key: "ioh", path: "cust_relocationagency", label: "Overseas Hirewith" },
                { key: "icom", path: "comment", label: "Comment" },
                { key: "irclass", path: "cust_roleClassNav/label_defaultValue", label: "Role Classification" },
                { key: "ihrl", path: "cust_HRLNav/label_defaultValue", label: "HRL" },
                { key: "ilevel", path: "cust_LevelNav/label_defaultValue", label: "Level" },
                { key: "iexlevel", path: "cust_Executive_LevelNav/label_defaultValue", label: "Executive Level" },
                { key: "ibrand", path: "cust_BandNav/label_defaultValue", label: "Band" },
                { key: "ibrlevel", path: "cust_Band_LevelNav/label_defaultValue", label: "Band Level" },
                { key: "isur", path: "cust_SuccessionurgencyNav/label_defaultValue", label: "Succession Urgency Rating" },
                { key: "ipjfn", path: "cust_PositionJobFunctionNav/label_defaultValue", label: "Position Job Function" }

            ]);
            Engine.getInstance().register(oTable, {
                helper: this.oMetadataHelper,
                controller: {
                    Columns: new SelectionController({
                        targetAggregation: "columns",
                        control: oTable
                    }),
                    Sorter: new SortController({
                        control: oTable
                    }),
                    Groups: new GroupController({
                        control: oTable
                    }),
                    ColumnWidth: new ColumnWidthController({
                        control: oTable
                    })
                }
            });

            Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));
        },
        _registerForrP13n: function () {
            var oView = this.getView();
            var orTable = oView.byId("reqTable");

            this.oRMetadataHelper = new MetadataHelper([
                { key: "quickapply", path: "quickApply", label: "Quick Apply" },
                { key: "evergreen", path: "evergreen", label: "Evergreen Job Requisition" },
                { key: "reqtype", path: "sfstd_jobReqType", label: "Job Requisition Type" },
                { key: "reqid", path: "id", label: "Requisition ID" },
                { key: "posid", path: "positionNumber", label: "Position ID" },
                { key: "reqstatus", path: "status", label: "Requisition Status" },
                { key: "jobtitleint", path: "title", label: "Job Title (Internal)" },
                { key: "jobtitleext", path: "extTitle", label: "Job Title (External)" },
                { key: "competencies", path: "competencies", label: "Competencies" },
                { key: "funccompetencies", path: "cust_functionalcompetencies", label: "Functional Competencies" },
                { key: "country", path: "country", label: "Country" },
                { key: "opco", path: "cust_OpCo", label: "OpCo" },
                { key: "company", path: "Cust_company", label: "Company" },
                { key: "companycode", path: "Cust_company_code", label: "Company Code" },
                { key: "businessunit", path: "Cust_businessUnit", label: "Business Unit" },
                { key: "division", path: "division_obj", label: "Division/Entity" },
                { key: "department", path: "department_obj", label: "Department" },
                { key: "worklocation", path: "cust_city", label: "Work Location" },
                { key: "costcenter", path: "cust_costCenterId", label: "Cost Center" },
                { key: "joiningdate", path: "jobStartDate", label: "Expected Joining Date" },
                { key: "vacancies", path: "numberOpenings", label: "Number of Vacancies" },
                { key: "addreplace", path: "custaddRep", label: "Addition/Replacement" },
                { key: "employeename", path: "replacementFor", label: "Employee Name (If Replacement Position)" },
                { key: "roleprofile", path: "roleDesc", label: "Role Profile" },
                { key: "jobcode", path: "jobCode", label: "Job Code" },
                { key: "jobfunction", path: "jobFunction", label: "Job Function" },
                { key: "rolecategory", path: "Job_Category", label: "Role Category" },
                { key: "careerlevel", path: "orgLevel", label: "Career Level" },
                { key: "paygrade", path: "cust_jobGrade", label: "Pay Grade" },
                { key: "hrl", path: "cust_HRL", label: "HRL" },
                { key: "bandlevel", path: "BandLevel", label: "Band Level" },
                { key: "employmenttype", path: "jobType", label: "Employment Type" },
                { key: "currency", path: "currency", label: "Currency" },
                { key: "minsalary", path: "cust_salaryMin", label: "Minimum Monthly Salary" },
                { key: "medsalary", path: "cust_salaryMid", label: "Medium Monthly Salary" },
                { key: "maxsalary", path: "cust_salaryMax", label: "Maximum Monthly Salary" },
                { key: "eligibleforreferral", path: "ReferralEligibility", label: "Is this vacancy eligible for referrals?" },
                { key: "eligibleforbonus", path: "ReferralBonusEligibility", label: "Is this vacancy eligible for Referral Bonus?" },
                { key: "erpamount", path: "erpAmount", label: "ERP Amount" },
                { key: "alignedreferral", path: "ReferralInfoCheck_LMHC", label: "Are you aligned with the Referral Information section for this role?" },
                { key: "linemanager", path: "hiringManagerName", label: "Line Manager" },
                { key: "sourcinglead", path: "secondRecruiterName", label: "Sourcing Lead" },
                { key: "mainrecruiter", path: "recruiterName", label: "Main Recruiter / Project Sponsor" },
                { key: "assignedrecruiter", path: "vpOfStaffingName", label: "Assigned Recruiter" },
                { key: "onboardingofficer", path: "sourcerName", label: "Onboarding Officer" },
                { key: "sourcingspecialist", path: "coordinatorName", label: "Sourcing Specialist" },
                { key: "intdescheader", path: "intJobDescHeader", label: "Internal Job Desc Header" },
                { key: "intdescription", path: "listingLayout", label: "Internal Job Description" },
                { key: "intdescfooter", path: "intJobDescFooter", label: "Internal Job Desc Footer" },
                { key: "extdescheader", path: "extJobDescHeader", label: "External Job Desc Header" },
                { key: "extdescription", path: "extListingLayout", label: "External Job Description" },
                { key: "extdescfooter", path: "extJobDescFooter", label: "External Job Desc Footer" },
                { key: "comments", path: "Lmcomment", label: "Additional Comments" },
                { key: "supportdocs", path: "supportDocs", label: "Supporting Documents" },
                { key: "uaenational", path: "custuaenation", label: "Is this role for UAE national hires?" }
            ]
            );

            Engine.getInstance().register(orTable, {
                helper: this.oRMetadataHelper,
                controller: {
                    Columns: new SelectionController({
                        targetAggregation: "columns",
                        control: orTable
                    }),
                    Sorter: new SortController({
                        control: orTable
                    }),
                    Groups: new GroupController({
                        control: orTable
                    }),
                    ColumnWidth: new ColumnWidthController({
                        control: orTable
                    })
                }
            });

            Engine.getInstance().attachStateChange(this.handleStatesChange.bind(this));
        },

        onGoPress: function () {
            var aTableFilters = this.byId("jobfilterbar").getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
                var oControl = oFilterGroupItem.getControl();
                var aSelectedKey = oControl.getSelectedKey();
                if (aSelectedKey !== '') {
                    var aFilters = new Filter({
                        path: oFilterGroupItem.getName(),
                        operator: FilterOperator.EQ,
                        value1: aSelectedKey
                    });

                    aResult.push(aFilters);
                }
                return aResult;
            }, []);
            this.byId("positionsTable").getBinding().filter(aTableFilters, FilterType.Application);
            this.byId("positionsTable").setShowOverlay(false);
            // var oFilterModel = this.getView().getModel("filterModel");
            // var oTableModel = this.getView().getModel("tableModel");
            // var oTable = this.byId("productsTable");

            // var oFilters = {
            //     category: oFilterModel.getProperty("/category"),
            //     region: oFilterModel.getProperty("/region"),
            //     status: oFilterModel.getProperty("/status")
            // };

            // // Filter data based on selected criteria
            // var filteredData = this._allTableData.filter(function (item) {
            //     var matchCategory = !oFilters.category || item.category === oFilters.category;
            //     var matchRegion = !oFilters.region || item.region === oFilters.region;
            //     var matchStatus = !oFilters.status || item.status === oFilters.status;
            //     return matchCategory && matchRegion && matchStatus;
            // });

            // oTableModel.setProperty("/data", filteredData);
            // oTableModel.setProperty("/visible", true);
            // oTable.removeSelections(true);
        },

        onSettingsPress: function () {
            MessageToast.show("Settings clicked");
        },


        onGenRequsition: function () {
            var oTable = this.byId("positionsTable");
            var aSelectedIndices = oTable.getSelectedIndices();
            var rModel = this.getView().getModel("jobReqModel");
            var lModel = this.getView().getModel("localModel").getData();
            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select at least one item");
                return;
            } else {
                if (rModel.getData().length !== 0) {
                    var that = this;
                    MessageBox.confirm("Are you sure you want to generate new requisitions? Existing requisitions will be overwritten. Click OK to proceed", {
                        title: "Confirmation",
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.OK) {
                                that._generateReqData(aSelectedIndices, lModel, oTable, rModel)
                            }
                        }
                    });
                } else {
                    this._generateReqData(aSelectedIndices, lModel, oTable, rModel);
                }
            }

        },
        _generateReqData: function (aSelectedIndices, lModel, oTable, rModel) {
            //var reqData = [];
            oTable.setBusy(true);
            var aPromises = [];
            for (var i = 0; i < aSelectedIndices.length; i++) {
                var iSelectedIndex = aSelectedIndices[i];
                var oContext = oTable.getContextByIndex(iSelectedIndex);
                if (oContext) {
                    var oPosData = oContext.getObject();
                    var oCountry = oContext.getProperty('companyNav/countryOfRegistrationNav/externalName_defaultValue');
                    var reData = lModel.recuriterData.find(item => item.CountryRegion.toLowerCase() === oCountry.toLowerCase());
                    var oPcO = oContext.getProperty('cust_opcoNav/label_defaultValue');
                    var matches = oPcO.match(/\b(\w)/g); // ['J','S','O','N']
                    var acronym = matches.join('');
                    var srData = lModel.sourcerData.find(item => item.OpCo === acronym && item.IsUAEHire.toLowerCase() === "Yes".toLowerCase());
                    var reqObj = {
                        "quickApply": false,
                        "evergreen": false,
                        "sfstd_jobReqType": "Standard",
                        "id": "",
                        "positionNumber": oPosData.code,
                        "status": "",
                        "title": oPosData.jobTitle,
                        "extTitle": oPosData.jobTitle,
                        "competencies": "",
                        "cust_functionalcompetencies": "",
                        "country": oContext.getProperty('companyNav/countryOfRegistrationNav/twoCharCountryCode'),
                        "cust_OpCo": oContext.getProperty('cust_opcoNav/label_defaultValue'),
                        "Cust_company": oContext.getProperty('companyNav/name_defaultValue'),
                        "Cust_company_code": oPosData.company,
                        "Cust_businessUnit": oContext.getProperty('cust_BusinessUnitNav/label_defaultValue'),
                        "division_obj": oPosData.division,
                        "department_obj": oPosData.department,
                        "cust_city": oPosData.cust_City,
                        "cust_costCenterId": oPosData.costCenter,
                        "cust_costCenter": oContext.getProperty("costCenterNav/name_defaultValue"),
                        "jobStartDate": "",
                        "numberOpenings": 1,
                        "custaddRep": "Addition",
                        "replacementFor": "",
                        "roleDesc": "",
                        "jobCode": oPosData.jobCode,
                        "jobFunction": oPosData.cust_JobFunction,
                        "Job_Category": "",
                        "orgLevel": oPosData.cust_CareerLevel,
                        "cust_jobGrade": oPosData.payGrade,
                        "cust_HRL": oPosData.cust_HRL,
                        "BandLevel": oPosData.cust_Band_Level,
                        "jobType": oContext.getProperty('regularTemporaryNav/label_defaultValue'),
                        "currency": oContext.getProperty('companyNav/countryOfRegistrationNav/currency'),
                        "cust_salaryMin": oPosData.cust_MinimumPay,
                        "cust_salaryMid": oPosData.cust_MidPoint,
                        "cust_salaryMax": oPosData.cust_MaximumPay,
                        "ReferralEligibility": "",
                        "ReferralBonusEligibility": "",
                        "erpAmount": "",
                        "ReferralInfoCheck_LMHC": "",
                        "hiringManagerName": "",
                        "hiringManagerEmail": "",
                        "secondRecruiterName": srData !== undefined ? srData.SourcingLead : "",
                        "recruiterName": reData !== undefined ? reData.MainRecruiter : "",
                        "vpOfStaffingName": reData !== undefined ? reData.AssignedRecruiter : "",
                        "SourcingLeadEmail": srData !== undefined ? srData.SourcingLeadEmail : "",
                        "MainRecruiterEmail": reData !== undefined ? reData.MainRecruiterEmail : "",
                        "AssignedRecruiterEmail": reData !== undefined ? reData.AssignedRecruiterEmail : "",
                        "SourcingSpecialistEmail": srData !== undefined ? srData.SourcingSpecialistEmail : "",
                        "sourcerName": oContext.getProperty('/companyNav/cust_OnbofficerNav/defaultFullName'),
                        "coordinatorName": srData !== undefined ? srData.SourcingSpecialist : "",
                        "intJobDescHeader": "",
                        "listingLayout": "",
                        "intJobDescFooter": "",
                        "extJobDescHeader": "",
                        "extListingLayout": "",
                        "extJobDescFooter": "",
                        "Lmcomment": "",
                        "supportDocs": "",
                        "custuaenation": "Yes",
                        "orglevelpickid": oContext.getProperty("cust_OrgLevelNav/optionId"),
                        "formDueDate": oPosData.effectiveStartDate
                    }
                    var aPromise = this._fetchLMData(reqObj).then(function (oResponse) {
                        if (oResponse.response.results.length > 0) {
                            oResponse.reqObj.hiringManagerName = oResponse.response.results[0].managerUserNav.displayName;
                            oResponse.reqObj.hiringManagerEmail = oResponse.response.results[0].managerUserNav.username;

                        }
                        return oResponse.reqObj;
                    });
                    aPromises.push(aPromise);
                }
            }

            Promise.all(aPromises).then(function (allReqObjs) {
                rModel.setProperty("/", allReqObjs);
                oTable.clearSelection();
                  oTable.setBusy(false);

                var orTable = this.byId("reqTable");
                if (orTable) {
                    var oDomRef = orTable.getDomRef();
                    if (oDomRef) {
                        oDomRef.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            }.bind(this));
        },
        _fetchLMData: function (oReqData) {
            return new Promise(function (resolve, reject) {
                var oModel = this.getView().getModel();
                var mUrlParameters = {
                    "$expand": "managerUserNav"
                };
                var aFilters = [
                    new sap.ui.model.Filter("position", sap.ui.model.FilterOperator.EQ, oReqData.positionNumber),
                ];
                // Perform OData read call (modify as per your service)
                oModel.read('/EmpJob', {
                    filters: aFilters,
                    urlParameters: mUrlParameters,
                    success: function (oResponse) {
                        resolve({"response":oResponse,"reqObj":oReqData});
                    },
                    error: function (oError) {
                        reject(oError);
                    }
                });
            }.bind(this));

        },
        onPostRequsitions: function (oEvent) {
            var oTable = this.byId("reqTable");
            var aSelectedIndices = oTable.getSelectedIndices();
            if (aSelectedIndices.length === 0) {
                MessageBox.warning("Select any one requesition to save")
                return;
            } else {

            }
            oTable.setBusy(true);
            this._pendingRequests = aSelectedIndices.length;
            this._error = "";
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            for (var i = 0; i < aSelectedIndices.length; i++) {
                var iSelectedIndex = aSelectedIndices[i];
                var oContext = oTable.getContextByIndex(iSelectedIndex);
                var oReqData = oContext.getObject();
                var oPayload =
                {
                    templateId: "5101",
                    appTemplateId: "4781",
                    statusSetId: "321",
                    defaultLanguage: "en_GB",
                    jobType: oReqData.jobType,
                    "quickApply": oReqData.quickApply,
                    "evergreen": oReqData.evergreen,
                    "Cust_businessUnit": oReqData.Cust_businessUnit,
                    "cust_costCenterId": oReqData.cust_costCenter,
                    "Cust_company_code": oReqData.Cust_company_code,
                    //"divisionR": oReqData.division_obj,
                    //"department_obj": oReqData.department_obj,
                    "cust_jobGrade": oReqData.cust_jobGrade,
                    "cust_HRL": oReqData.cust_HRL,
                    //"BandLevel": oReqData.BandLevel,
                    "jobReqLocale": {
                        "results": [
                            {
                                "extJobDescFooter": oReqData.extTitle,
                                "extJobDescHeader": oReqData.extTitle,
                                "externalJobDescription": oReqData.extTitle,
                                "externalTitle": oReqData.extTitle,
                                "intJobDescFooter": oReqData.title,
                                "intJobDescHeader": oReqData.title,
                                "jobDescription": oReqData.title,
                                "jobTitle": oReqData.title
                            }
                        ]
                    },
                    "jobCode": oReqData.jobCode,
                    "positionNumber": oReqData.positionNumber,
                    "country": oReqData.country,
                    "cust_OpCo": oReqData.cust_OpCo,
                    "Cust_company": oReqData.Cust_company,
                    "currency": oReqData.currency,
                    "cust_city": oReqData.cust_city,
                    "cust_salaryMin": oReqData.cust_salaryMin,
                    "cust_salaryMid": oReqData.cust_salaryMid,
                    "cust_salaryMax": oReqData.cust_salaryMax,
                    "formDueDate": "/Date(" + Date.parse(new Date(oReqData.formDueDate)) + ")/",
                    internalStatus: "1",
                    "custuaenational": {
                        __metadata: {
                            uri: "PicklistOption(1886256)"
                        }
                    },
                    "department_obj": {
                        "externalCode": oReqData.department_obj
                    },
                    "division_obj": {
                        "externalCode": oReqData.division_obj
                    },
                    "custaddRep": {
                        __metadata: {
                            uri: "PicklistOption(79433)"
                        }
                    },
                    "jobFunction": {
                        __metadata: {
                            uri: "PicklistOption(1890683)"
                        }
                    },
                    "orgLevel": {
                        __metadata: {
                            uri: "PicklistOption(1892738)"
                        }

                    }
                }
                if (oReqData.SourcingLeadEmail !== '') {
                    oPayload.secondRecruiter = {
                        "results": [
                            {
                                "userName": oReqData.SourcingLeadEmail,
                            }
                        ]
                    }
                }
                if (oReqData.MainRecruiterEmail !== '') {
                    oPayload.recruiter = {
                        "results": [
                            {
                                "userName": oReqData.MainRecruiterEmail,
                            }
                        ]
                    }
                }
                if (oReqData.AssignedRecruiterEmail !== '') {
                    oPayload.vpOfStaffing = {
                        "results": [
                            {
                                "userName": oReqData.AssignedRecruiterEmail,
                            }
                        ]
                    }
                }
                if (oReqData.SourcingSpecialistEmail !== '') {
                    oPayload.coordinator = {
                        "results": [
                            {
                                "userName": oReqData.SourcingSpecialistEmail,
                            }
                        ]
                    }
                }
                if (oReqData.hiringManagerEmail !== '') {
                    oPayload.hiringManager = {
                        "results": [
                            {
                                "userName": oReqData.hiringManagerEmail,
                            }
                        ]
                    }
                }
                this.iRLength = 0;
                this.oResp = [];
                this._oncreateJobReq(oPayload, iSelectedIndex);

            }
        },
        _oncreateJobReq: function (oPayload, oIndex) {
            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/JobRequisition", oPayload, {
                success: function (oResponse) {
                    this._assignJobReq(oIndex, oResponse);
                }.bind(this),
                error: function (oErr) {
                    this._assignJobReq(oIndex, null, oErr);
                    //MessageToast.show("Failed to create Requisitions.");
                }.bind(this)
            });
        },
        _assignJobReq: function (oIndex, oResp, oErr) {
            var oTable = this.byId("reqTable");
            var reqModel = this.getView().getModel("jobReqModel");
            var oModel = this.getOwnerComponent().getModel();

            if (oErr !== undefined) {
                this._error = this._error + "," + "Job Requsitions creation failed for position " + reqModel.getProperty("/" + oIndex + "/positionNumber");
            } else {
                reqModel.setProperty("/" + oIndex + "/id", oResp.jobReqId);
            }
            this._pendingRequests--;
            if (this._pendingRequests === 0) {
                oTable.setBusy(false);
                oTable.clearSelection();
                oModel.setUseBatch(true);
                if (this._error === "") {
                    sap.m.MessageToast.show("Job Requsitions created successfully.");
                } else {
                    MessageBox.error(this._error);
                }
            }
        },
        onSavePress: function () {
            var oUpdateModel = this.getView().getModel("updateModel");
            var oSelectedItemsModel = this.getView().getModel("selectedItems");

            var sValue = oUpdateModel.getProperty("/updateValue");

            if (!sValue) {
                MessageToast.show("Please enter a value");
                return;
            }

            // Update all selected items with the new value
            var aData = oSelectedItemsModel.getProperty("/data");
            aData.forEach(function (item) {
                item.value = sValue;
            });

            oSelectedItemsModel.refresh();
            MessageToast.show("All items updated with value: " + sValue);
        },


        onOpenDialog: function () {
            var oView = this.getView();
            if (!this._pDialog) {
                this._pDialog = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "com.sap.sj.jobreq.fragments.Massupdate", // Replace with your fragment path
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onDialogOk: function (oEvent) {
            var reqModel = this.getView().getModel("jobReqModel");
            var sValue = this.byId("arCBox").getSelectedKey();
            sValue = sValue === 'A' ? 'Addition' : "Replacement";
            var aData = reqModel.getData();
            aData.forEach(function (item) {
                item.custaddRep = sValue;
            });
            reqModel.setData(aData);
            reqModel.refresh(true);
            this.byId("arCBox").setSelectedKey(null);
            this.byId("addEntryDialog").close();
        },

        onDialogCancel: function () {
            this.byId("addEntryDialog").close();
        }

    });
});