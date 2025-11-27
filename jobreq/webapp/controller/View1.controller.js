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

            var oUpdateModel = new JSONModel({
                updateValue: ""
            });

            this.getView().setModel(oFilterModel, "filterModel");

            this.getView().setModel(oUpdateModel, "updateModel");
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
        onRowsUpdated:function(oEvent){
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
            var reqData = [];

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Please select at least one item");
                return;
            } else {
                for (var i = 0; i < aSelectedIndices.length; i++) {
                    var iSelectedIndex = aSelectedIndices[i];
                    var oContext = oTable.getContextByIndex(iSelectedIndex);
                    if (oContext) {
                        var oPosData = oContext.getObject();

                        reqData.push({
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
                            "secondRecruiterName": "",
                            "recruiterName": "",
                            "vpOfStaffingName": "",
                            "sourcerName": oContext.getProperty('/companyNav/cust_OnbofficerNav/defaultFullName'),
                            "coordinatorName": "",
                            "intJobDescHeader": "",
                            "listingLayout": "",
                            "intJobDescFooter": "",
                            "extJobDescHeader": "",
                            "extListingLayout": "",
                            "extJobDescFooter": "",
                            "Lmcomment": "",
                            "supportDocs": "",
                            "custuaenation": "",
                            "orglevelpickid": oContext.getProperty("cust_OrgLevelNav/optionId"),
                            "formDueDate": oPosData.effectiveStartDate
                        }
                        );

                        // reqData.push({
                        //     "jobCode": oPosData.jobCode,
                        //     "positionNumber": oPosData.code,
                        //     "country": oContext.getProperty("companyNav/countryOfRegistrationNav/twoCharCountryCode"),
                        //     "cust_OpCo": oContext.getProperty("cust_opcoNav/label_defaultValue"),
                        //     "Cust_company": oPosData.company,
                        //     "currency": oContext.getProperty("companyNav/countryOfRegistrationNav/currency"),
                        //     "cust_city": "",
                        //     "cust_salaryMin": oPosData.cust_MinimumPay,
                        //     "cust_salaryMid":  oPosData.cust_MidPoint,
                        //     "cust_salaryMax": oPosData.cust_MaximumPay,
                        //     "orglevelpickid":oContext.getProperty("cust_OrgLevelNav/optionId"),
                        //     "uaenationalid":"1886256",
                        //     "jobfunid":"1890683",
                        //     "formDueDate":oPosData.effectiveStartDate,
                        //     "addrepid":"79433"

                        // });
                        //aSelectedData.push(oSelectedRowData); // Add the data to your array
                    }
                }
            }
            this.getView().getModel("jobReqModel").setProperty("/", reqData);
            var orTable = this.byId("reqTable"); // Get the table control by its ID
            if (orTable) {
                var oDomRef = orTable.getDomRef(); // Get the DOM element of the table
                if (oDomRef) {
                    oDomRef.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll the element into view
                }
            }
        },
        onPostRequsitions: function (oEvent) {
            var oTable = this.byId("reqTable");
            oTable.setBusy(true);
            var oModel = this.getOwnerComponent().getModel();
            var aSelectedIndices = oTable.getSelectedIndices();
            this._aSI=aSelectedIndices.length;
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
                    "custuaenational": {
                        __metadata: {
                            uri: "PicklistOption(1886256)"
                        }
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
                this.iRLength=0;
                this.oResp=[];
                oModel.create("/JobRequisition", oPayload, {
                    success: function (oResponse) {
                    // this.iRLength++;
                    // this.oResp.pus(oResponse);
                    // if(this.iRLength===this._aSI){
                        //this._assignJobReq(this.oResp);
                        this.byId("reqTable").setBusy(false);
                        this.getView().getModel("jobReqModel").setProperty("/0/id",oResponse.jobReqId);
                        MessageToast.show("Successfully created the Job Requisitions.");
                    //}                      
                    }.bind(this),
                    error: function (oErr) {
                        this.iRLength++;
                        MessageToast.show("Failed to create Requisitions.");
                    }
                });

            }
        },

        _assignJobReq:function(oResp){
            var oIndices=this.byId("reqTable").getSelectedIndices();
            var oJRModel=this.getView().getModel("jobReqModel");
            for(var i=0;i<oResp.length;i++){
                //if(oResp.positionNumber)
            }
            this.getView().getModel("jobReqModel").setProperty("/0/id",oResponse.jobReqId);
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