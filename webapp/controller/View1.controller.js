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
            // Sample data for dropdowns
            var aCategories = [
                { key: "OpCo North America", text: "OpCo North America" },
                { key: "OpCo Europe", text: "OpCo Europe" }
            ];

            var aRegions = [
                { key: "North", text: "North" },
                { key: "South", text: "South" },
                { key: "East", text: "East" },
                { key: "West", text: "West" }
            ];

            var aStatuses = [
                { key: "Active", text: "Active" },
                { key: "Pending", text: "Pending" },
                { key: "Inactive", text: "Inactive" }
            ];
         
            

            // All available data
            var allTableData = [
                {
                    Code: "POS-2024-001",
                    PositionTitle: "Senior Software Engineer",
                    StartDate: "2024-01-15",
                    Status: "Active",
                    OpCo: "OpCo North America",
                    BusinessEntity: "Technology Services",
                    OperatingUnit: "Software Development",
                    OperatingCompany: "Tech Solutions Inc.",
                    "Division": "Engineering Division",
                    Department: "Application Development",
                    "Location": "New York",
                    CostCentre: "CC-1001",
                    WorkLocation: "Hybrid",
                    "OrganizationName": "Tech Corp International",
                    JobCode: "JC-SE-001",
                    JobTitle: "Senior Software Engineer",
                    OpCoLevel: "Level 3",
                    JobFunction: "Engineering",
                    JobFamily: "Software Development",
                    FTE: "1.0",
                    PayGrade: "Grade 7",
                    MinimumPay: "85000",
                    MidPoint: "105000",
                    MaximumPay: "125000",
                    EmployeeClass: "Professional",
                    Regular: "Regular",
                    CareerLevel: "Senior",
                    RoleArchetype: "Technical Expert",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "No",
                    CriticalPosition: "Yes",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Key position for digital transformation",
                    RoleClassification: "Technical",
                    HRL: "HRL-3",
                    Level: "P3",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Tech Brand",
                    BrandLevel: "Senior Professional",
                    SuccessionUrgencyRating: "Medium",
                    PositionJobFunction: "Software Engineering"
                },
                {
                    Code: "POS-2024-002",
                    PositionTitle: "Marketing Manager",
                    StartDate: "2024-02-01",
                    Status: "Active",
                    OpCo: "OpCo Europe",
                    BusinessEntity: "Commercial Operations",
                    OperatingUnit: "Marketing",
                    OperatingCompany: "Marketing Solutions Ltd.",
                    "Division": "Sales & Marketing",
                    Department: "Digital Marketing",
                    "Location": "London",
                    CostCentre: "CC-2001",
                    WorkLocation: "Office",
                    "OrgnaizationName": "Global Marketing Corp",
                    JobCode: "JC-MM-002",
                    JobTitle: "Marketing Manager",
                    OpCoLevel: "Level 4",
                    JobFunction: "Marketing",
                    JobFamily: "Commercial",
                    FTE: "1.0",
                    PayGrade: "Grade 8",
                    MinimumPay: "75000",
                    MidPoint: "95000",
                    MaximumPay: "115000",
                    EmployeeClass: "Management",
                    Regular: "Regular",
                    CareerLevel: "Manager",
                    RoleArchetype: "People Manager",
                    Budgeted: "Yes",
                    ToBeRecruited: "Yes",
                    MassPosition: "No",
                    CriticalPosition: "Yes",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Responsible for European market expansion",
                    RoleClassification: "Commercial",
                    HRL: "HRL-4",
                    Level: "M1",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Premium Brand",
                    BrandLevel: "Manager",
                    SuccessionUrgencyRating: "High",
                    PositionJobFunction: "Marketing Management"
                },
                {
                    Code: "POS-2024-003",
                    PositionTitle: "HR Business Partner",
                    StartDate: "2024-01-20",
                    Status: "Active",
                    OpCo: "OpCo Asia Pacific",
                    BusinessEntity: "Human Resources",
                    OperatingUnit: "HR Operations",
                    OperatingCompany: "HR Services Asia",
                    "Division": "Corporate Services",
                    Department: "Human Resources",
                    "Location": "Singapore",
                    CostCentre: "CC-3001",
                    WorkLocation: "Hybrid",
                    "OrganizationName": "Asia Pacific Holdings",
                    JobCode: "JC-HR-003",
                    JobTitle: "HR Business Partner",
                    OpCoLevel: "Level 3",
                    JobFunction: "Human Resources",
                    JobFamily: "HR",
                    FTE: "1.0",
                    PayGrade: "Grade 7",
                    MinimumPay: "70000",
                    MidPoint: "88000",
                    MaximumPay: "106000",
                    EmployeeClass: "Professional",
                    Regular: "Regular",
                    CareerLevel: "Senior",
                    RoleArchetype: "Business Partner",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "No",
                    CriticalPosition: "No",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Supporting 200+ employees across APAC",
                    RoleClassification: "Support",
                    HRL: "HRL-3",
                    Level: "P3",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Corporate Brand",
                    BrandLevel: "Senior Professional",
                    SuccessionUrgencyRating: "Low",
                    PositionJobFunction: "HR Partnership"
                },
                {
                    Code: "POS-2024-004",
                    PositionTitle: "Financial Controller",
                    StartDate: "2024-03-01",
                    Status: "Pending",
                    OpCo: "OpCo Middle East",
                    BusinessEntity: "Finance",
                    OperatingUnit: "Financial Planning",
                    OperatingCompany: "Finance Corp ME",
                    "Division": "Finance Division",
                    Department: "Financial Control",
                    "Location": "Dubai",
                    CostCentre: "CC-4001",
                    WorkLocation: "Office",
                    "OrganizationName": "Middle East Operations",
                    JobCode: "JC-FC-004",
                    JobTitle: "Financial Controller",
                    OpCoLevel: "Level 5",
                    JobFunction: "Finance",
                    JobFamily: "Finance & Accounting",
                    FTE: "1.0",
                    PayGrade: "Grade 9",
                    MinimumPay: "95000",
                    MidPoint: "120000",
                    MaximumPay: "145000",
                    EmployeeClass: "Management",
                    Regular: "Regular",
                    CareerLevel: "Senior Manager",
                    RoleArchetype: "Financial Leader",
                    Budgeted: "Yes",
                    ToBeRecruited: "Yes",
                    MassPosition: "No",
                    CriticalPosition: "Yes",
                    "HigherLevelPosition": "Yes",
                    "OverseasHirewith": "Yes",
                    Comment: "Strategic finance leadership role",
                    RoleClassification: "Finance",
                    HRL: "HRL-5",
                    Level: "M2",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Premium Brand",
                    BrandLevel: "Senior Manager",
                    SuccessionUrgencyRating: "High",
                    PositionJobFunction: "Financial Control"
                },
                {
                    Code: "POS-2024-005",
                    PositionTitle: "Data Analyst",
                    StartDate: "2024-02-15",
                    Status: "Active",
                    OpCo: "OpCo North America",
                    BusinessEntity: "Analytics",
                    OperatingUnit: "Business Intelligence",
                    OperatingCompany: "Data Solutions Inc.",
                    "Division": "Technology Division",
                    Department: "Data Analytics",
                    "Location": "San Francisco",
                    CostCentre: "CC-1002",
                    WorkLocation: "Remote",
                    "OrganizationName": "Tech Corp International",
                    JobCode: "JC-DA-005",
                    JobTitle: "Data Analyst",
                    OpCoLevel: "Level 2",
                    JobFunction: "Analytics",
                    JobFamily: "Data & Analytics",
                    FTE: "1.0",
                    PayGrade: "Grade 5",
                    MinimumPay: "60000",
                    MidPoint: "75000",
                    MaximumPay: "90000",
                    EmployeeClass: "Professional",
                    Regular: "Regular",
                    CareerLevel: "Mid-Level",
                    RoleArchetype: "Analyst",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "No",
                    CriticalPosition: "No",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Focus on business intelligence reporting",
                    RoleClassification: "Technical",
                    HRL: "HRL-2",
                    Level: "P2",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Tech Brand",
                    BrandLevel: "Professional",
                    SuccessionUrgencyRating: "Low",
                    PositionJobFunction: "Data Analysis"
                },
                {
                    Code: "POS-2024-006",
                    PositionTitle: "Supply Chain Manager",
                    StartDate: "2024-01-10",
                    Status: "Active",
                    OpCo: "OpCo Europe",
                    BusinessEntity: "Operations",
                    OperatingUnit: "Supply Chain",
                    OperatingCompany: "Logistics Europe Ltd.",
                    "Division": "Operations Division",
                    Department: "Supply Chain Management",
                    "Location": "Amsterdam",
                    CostCentre: "CC-2002",
                    WorkLocation: "Hybrid",
                    "OrganizationName": "European Logistics Corp",
                    JobCode: "JC-SCM-006",
                    JobTitle: "Supply Chain Manager",
                    OpCoLevel: "Level 4",
                    JobFunction: "Operations",
                    JobFamily: "Supply Chain",
                    FTE: "1.0",
                    PayGrade: "Grade 8",
                    MinimumPay: "80000",
                    MidPoint: "100000",
                    MaximumPay: "120000",
                    EmployeeClass: "Management",
                    Regular: "Regular",
                    CareerLevel: "Manager",
                    RoleArchetype: "Operational Manager",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "No",
                    CriticalPosition: "Yes",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Managing end-to-end supply chain",
                    RoleClassification: "Operations",
                    HRL: "HRL-4",
                    Level: "M1",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Corporate Brand",
                    BrandLevel: "Manager",
                    SuccessionUrgencyRating: "Medium",
                    PositionJobFunction: "Supply Chain Operations"
                },
                {
                    Code: "POS-2024-007",
                    PositionTitle: "Customer Service Representative",
                    StartDate: "2024-02-20",
                    Status: "Active",
                    OpCo: "OpCo Asia Pacific",
                    BusinessEntity: "Customer Service",
                    OperatingUnit: "Support Operations",
                    OperatingCompany: "Service Center Asia",
                    "Division": "Customer Experience",
                    Department: "Customer Support",
                    "Location": "Manila",
                    CostCentre: "CC-3002",
                    WorkLocation: "Office",
                    "OrganizationName": "Customer Solutions Asia",
                    JobCode: "JC-CSR-007",
                    JobTitle: "Customer Service Representative",
                    OpCoLevel: "Level 1",
                    JobFunction: "Customer Service",
                    JobFamily: "Customer Support",
                    FTE: "1.0",
                    PayGrade: "Grade 3",
                    MinimumPay: "25000",
                    MidPoint: "32000",
                    MaximumPay: "39000",
                    EmployeeClass: "Support Staff",
                    Regular: "Regular",
                    CareerLevel: "Entry-Level",
                    RoleArchetype: "Service Provider",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "Yes",
                    CriticalPosition: "No",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Part of 24/7 customer support team",
                    RoleClassification: "Support",
                    HRL: "HRL-1",
                    Level: "P1",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Service Brand",
                    BrandLevel: "Entry Professional",
                    SuccessionUrgencyRating: "Low",
                    PositionJobFunction: "Customer Support"
                },
                {
                    Code: "POS-2024-008",
                    PositionTitle: "Chief Technology Officer",
                    StartDate: "2024-04-01",
                    Status: "Pending",
                    OpCo: "OpCo North America",
                    BusinessEntity: "Executive Leadership",
                    OperatingUnit: "Technology",
                    OperatingCompany: "Tech Corp NA",
                    "Division": "Executive Office",
                    Department: "Executive Management",
                    "Location": "Boston",
                    CostCentre: "CC-1003",
                    WorkLocation: "Hybrid",
                    "OrganizationName": "Tech Corp International",
                    JobCode: "JC-CTO-008",
                    JobTitle: "Chief Technology Officer",
                    OpCoLevel: "Level 7",
                    JobFunction: "Executive Leadership",
                    JobFamily: "C-Suite",
                    FTE: "1.0",
                    PayGrade: "Grade 12",
                    MinimumPay: "180000",
                    MidPoint: "230000",
                    MaximumPay: "280000",
                    EmployeeClass: "Executive",
                    Regular: "Regular",
                    CareerLevel: "Executive",
                    RoleArchetype: "Strategic Leader",
                    Budgeted: "Yes",
                    ToBeRecruited: "Yes",
                    MassPosition: "No",
                    CriticalPosition: "Yes",
                    "HigherLevelPosition": "Yes",
                    "OverseasHirewith": "Yes",
                    Comment: "Leading technology strategy and innovation",
                    RoleClassification: "Executive",
                    HRL: "HRL-7",
                    Level: "E1",
                    ExecutiveLevel: "C-Suite",
                    Brand: "Executive Brand",
                    BrandLevel: "Executive",
                    SuccessionUrgencyRating: "Critical",
                    PositionJobFunction: "Technology Leadership"
                },
                {
                    Code: "POS-2024-009",
                    PositionTitle: "Product Designer",
                    StartDate: "2024-01-25",
                    Status: "Active",
                    OpCo: "OpCo Europe",
                    BusinessEntity: "Product Development",
                    OperatingUnit: "Design",
                    OperatingCompany: "Design Studios EU",
                    "Division": "Product Division",
                    Department: "UX Design",
                    "Location": "Berlin",
                    CostCentre: "CC-2003",
                    WorkLocation: "Hybrid",
                    "OrganizationName": "Design Corp Europe",
                    JobCode: "JC-PD-009",
                    JobTitle: "Product Designer",
                    OpCoLevel: "Level 2",
                    JobFunction: "Design",
                    JobFamily: "Product Design",
                    FTE: "1.0",
                    PayGrade: "Grade 6",
                    MinimumPay: "65000",
                    MidPoint: "82000",
                    MaximumPay: "99000",
                    EmployeeClass: "Professional",
                    Regular: "Regular",
                    CareerLevel: "Mid-Level",
                    RoleArchetype: "Creative Professional",
                    Budgeted: "Yes",
                    ToBeRecruited: "No",
                    MassPosition: "No",
                    CriticalPosition: "No",
                    "HigherLevelPosition": "No",
                    "OverseasHirewith": "No",
                    Comment: "Working on next-gen product experiences",
                    RoleClassification: "Creative",
                    HRL: "HRL-2",
                    Level: "P2",
                    ExecutiveLevel: "Non-Executive",
                    Brand: "Design Brand",
                    BrandLevel: "Professional",
                    SuccessionUrgencyRating: "Low",
                    PositionJobFunction: "Product Design"
                }];

            // Initialize models
            var oFilterModel = new JSONModel({
                category: "",
                region: "",
                status: "",
                categories: aCategories,
                regions: aRegions,
                statuses: aStatuses
            });

            var oTableModel = new JSONModel(allTableData);

          

            var oUpdateModel = new JSONModel({
                updateValue: ""
            });

            // Set models to view
            this.getView().setModel(oFilterModel, "filterModel");
            this.getView().setModel(oTableModel, "tableModel");
         
            this.getView().setModel(oUpdateModel, "updateModel");
            this._registerForP13n();
            this._registerForrP13n();
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
        onreqPersonalize:function(oEvt){
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
            var oId=oEvt.getParameters().control.getId();
             if(oId.indexOf("reqTable")!==-1){
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
            var oId=oEvt.getParameters().control.getId();

            if(oId.indexOf("positionsTable")!==-1){
            
            

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
                { key: "icode", path: "Code", label: "Code" },
                { key: "iptitle", path: "PositionTitle", label: "Position Title" },
                { key: "isdate", path: "StartDate", label: "Start Date" },
                { key: "istatus", path: "Status", label: "Status" },
                { key: "iop", path: "OpCo", label: "OpCo" },
                { key: "ibentity", path: "BusinessEntity", label: "Business Entity" },
                { key: "iopunit", path: "OperatingUnit", label: "Operating Unit" },
                { key: "iopcomp", path: "OperatingCompany", label: "Operating Company" },
                { key: "idivision", path: "Division", label: "Division/Entity" },
                { key: "idep", path: "Department", label: "Department" },
                { key: "iloc", path: "Location", label: "Location(City)" },
                { key: "ccentre", path: "CostCentre", label: "Cost Centre" },
                { key: "iwloc", path: "WorkLocation", label: "Work Location" },
                { key: "iorgname", path: "Orgnaisation Name", label: "Orgnaisation Name" },
                { key: "ijcode", path: "JobCode", label: "Job Code" },
                { key: "ijtitle", path: "JobTitle", label: "Job Title" },
                { key: "ioplevel", path: "OpCoLevel", label: "OpCo Level" },
                { key: "ijfn", path: "JobFunction", label: "Job Function" },
                { key: "ijfam", path: "JobFamily", label: "Job Family" },
                { key: "ifte", path: "FTE", label: "FTE" },
                { key: "ipgrd", path: "PayGrade", label: "Pay Grade" },
                { key: "imipay", path: "MinimumPay", label: "Minimum Pay" },
                { key: "impoint", path: "MidPoint", label: "Mid Point" },
                { key: "imapay", path: "PartOwner", label: "Maximum Pay" },
                { key: "ieclass", path: "EmployeeClass", label: "Employee Class" },
                { key: "iregtemp", path: "Regular", label: "Regular/Temporary" },
                { key: "icalevel", path: "CareerLevel", label: "Career Level" },
                { key: "irarch", path: "RoleArchetype", label: "Role Archetype" },
                { key: "ibudg", path: "Budgeted", label: "Budgeted" },
                { key: "itbre", path: "ToBeRecruited", label: "To Be Recruited" },
                { key: "impo", path: "MassPosition", label: "Mass Position" },
                { key: "icrpos", path: "CriticalPosition", label: "Critical Position" },
                { key: "ihlpos", path: "HigherLevelPosition", label: "Higher-Level Position" },
                { key: "ioh", path: "OverseasHirewith", label: "Overseas Hirewith" },
                { key: "icom", path: "Comment", label: "Comment" },
                { key: "irclass", path: "RoleClassification", label: "Role Classification" },
                { key: "ihrl", path: "HRL", label: "HRL" },
                { key: "ilevel", path: "Level", label: "Level" },
                { key: "iexlevel", path: "ExecutiveLevel", label: "Executive Level" },
                { key: "ibrand", path: "Brand", label: "Brand" },
                { key: "ibrlevel", path: "BrandLevel", label: "Brand Level" },
                { key: "isur", path: "SuccessionUrgencyRating", label: "Succession Urgency Rating" },
                { key: "ipjfn", path: "PositionJobFunction", label: "Position Job Function" }

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
            this.oMetadataHelperr = new MetadataHelper([
                    { key:"iccode",path: "CompanyCode", label: "Company Code" },
                    { key:"ifyear",path: "FiscalYear", label: "Fiscal Year" },
                    { key:"iadoc",path: "AccountingDocument", label: "Accounting Document"},
                    { key:"iditem",path: "AccountingDocumentItem", label: "Document Item"},
                    { key:"ilglitem",path: "LedgerGLLineItem", label: "Ledger GL Line Item"},
                    { key:"iledg",path: "Ledger", label: "Ledger"},
                    { key:"ipdate",path: "PostingDate", label: "Posting Date"},
                    { key:"iddate",path: "DocumentDate", label: "Document Date"},
                    { key:"iadtype",path: "AccountingDocumentType", label: "Document Type"},
                    { key:"iadhtxt",path: "AccountingDocumentHeaderText", label: "Document Header Text" },
                    { key:"itcode",path: "TransactionCode", label: "Transaction Code"},
                    { key:"iitrans",path: "IntercompanyTransaction", label: "Intercompany Transaction" },
                    { key:"idref",path: "DocumentReferenceID", label: "Document Reference ID"},
                    { key:"iradoc",path: "RecurringAccountingDocument", label: "Recurring Document" },
                    { key:"irdoc",path: "ReverseDocument", label: "Reverse Document" },
                    { key:"irdfy",path: "ReverseDocumentFiscalYear", label: "Reverse Doc Fiscal Year" },
                    { key:"iadc",path: "AccountingDocumentCategory", label: "Document Category"},
                    { key:"ipkey",path: "PostingKey", label: "Posting Key"},
                    { key:"iglacc",path: "GLAccount", label: "GL Account"},
                    { key:"iscomp",path: "SourceCompany", label: "Source Company" },
                    { key:"irccentre",path: "CostCenter", label: "Cost Center"},
                    { key:"ipcenter",path: "ProfitCenter", label: "Profit Center"},
                    { key:"ifnarea",path: "FunctionalArea", label: "Functional Area" },
                    { key:"ibarea",path: "BusinessArea", label: "Business Area" },
                    { key:"icarea",path: "ControllingArea", label: "Controlling Area" },
                    { key:"isegment",path: "Segment", label: "Segment" },
                    { key:"ipccenter",path: "PartnerCostCenter", label: "Partner Cost Center" },
                    { key:"ippcenter",path: "PartnerProfitCenter", label: "Partner Profit Center" },
                    { key:"ipfnarea",path: "PartnerFunctionalArea", label: "Partner Functional Area" },
                    { key:"ipbarea",path: "PartnerBusinessArea", label: "Partner Business Area" },
                    { key:"ipcomp",path: "PartnerCompany", label: "Partner Company" },
                    { key:"ipseg",path: "PartnerSegment", label: "Partner Segment" },
                    { key:"ibtcurr",path: "BalanceTransactionCurrency", label: "Balance Trans Currency"},
                    { key:"iabtr",path: "AmountInBalanceTransacCrcy", label: "Amount in Balance Trans Crcy"},
                    { key:"itcurr",path: "TransactionCurrency", label: "Transaction Currency"},
                    { key:"iatcurr",path: "AmountInTransactionCurrency", label: "Amount in Trans Currency"},
                    { key:"iccodecur",path: "CompanyCodeCurrency", label: "Company Code Currency" },
                    { key:"iaccurr",path: "AmountInCompanyCodeCurrency", label: "Amount in Co Code Crcy" },
                    { key:"igcurr",path: "GlobalCurrency", label: "Global Currency" },
                    { key:"iaigcurr",path: "AmountInGlobalCurrency", label: "Amount in Global Crcy" },
                    { key:"ifncurr",path: "FunctionalCurrency", label: "Functional Currency" },
                    { key:"iaifcurr",path: "AmountInFunctionalCurrency", label: "Amount in Functional Crcy" },
                    { key:"ibunit",path: "BaseUnit", label: "Base Unit" },
                    { key:"iquan",path: "Quantity", label: "Quantity" }
                ]);
            Engine.getInstance().register(orTable, {
                helper: this.oMetadataHelperr,
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


        onSelectPress: function () {
            var oTable = this.byId("positionsTable");
            var aSelectedItems = oTable.getSelectedIndices();

            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select at least one item");
                return;
            }

            // Get selected data
              var osData = 
               [
                    {
                        CompanyCode: "1000",
                        FiscalYear: "2024",
                        AccountingDocument: "1900000001",
                        AccountingDocumentItem: "001",
                        LedgerGLLineItem: "0001",
                        Ledger: "0L",
                        PostingDate: "2024-01-15",
                        DocumentDate: "2024-01-15",
                        AccountingDocumentType: "SA",
                        AccountingDocumentHeaderText: "Sample Document",
                        TransactionCode: "FB01",
                        IntercompanyTransaction: "",
                        DocumentReferenceID: "REF001",
                        RecurringAccountingDocument: "",
                        ReverseDocument: "",
                        ReverseDocumentFiscalYear: "",
                        AccountingDocumentCategory: "Standard",
                        PostingKey: "40",
                        GLAccount: "400000",
                        SourceCompany: "1000",
                        CostCenter: "1000",
                        ProfitCenter: "1000",
                        FunctionalArea: "1000",
                        BusinessArea: "1000",
                        ControllingArea: "1000",
                        Segment: "1000",
                        PartnerCostCenter: "",
                        PartnerProfitCenter: "",
                        PartnerFunctionalArea: "",
                        PartnerBusinessArea: "",
                        PartnerCompany: "",
                        PartnerSegment: "",
                        BalanceTransactionCurrency: "USD",
                        AmountInBalanceTransacCrcy: "1000.00",
                        TransactionCurrency: "USD",
                        AmountInTransactionCurrency: "1000.00",
                        CompanyCodeCurrency: "USD",
                        AmountInCompanyCodeCurrency: "1000.00",
                        GlobalCurrency: "USD",
                        AmountInGlobalCurrency: "1000.00",
                        FunctionalCurrency: "USD",
                        AmountInFunctionalCurrency: "1000.00",
                        BaseUnit: "EA",
                        Quantity: "10"
                    }
                ]
            var oSelectedItemsModel = new JSONModel(osData);
            this.getView().setModel(oSelectedItemsModel, "selectedItems");
    
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

        onCompletePress: function () {
            MessageBox.success("Wizard completed successfully!");
        },

        onWizardComplete: function () {
            MessageBox.success("All steps completed!");
        }
    });
});