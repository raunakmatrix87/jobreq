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
            this._registerForP13n();
            this._registerForrP13n();
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
            this.oMetadataHelperr = new MetadataHelper([
                { key: "iccode", path: "CompanyCode", label: "Company Code" },
                { key: "ifyear", path: "FiscalYear", label: "Fiscal Year" },
                { key: "iadoc", path: "AccountingDocument", label: "Accounting Document" },
                { key: "iditem", path: "AccountingDocumentItem", label: "Document Item" },
                { key: "ilglitem", path: "LedgerGLLineItem", label: "Ledger GL Line Item" },
                { key: "iledg", path: "Ledger", label: "Ledger" },
                { key: "ipdate", path: "PostingDate", label: "Posting Date" },
                { key: "iddate", path: "DocumentDate", label: "Document Date" },
                { key: "iadtype", path: "AccountingDocumentType", label: "Document Type" },
                { key: "iadhtxt", path: "AccountingDocumentHeaderText", label: "Document Header Text" },
                { key: "itcode", path: "TransactionCode", label: "Transaction Code" },
                { key: "iitrans", path: "IntercompanyTransaction", label: "Intercompany Transaction" },
                { key: "idref", path: "DocumentReferenceID", label: "Document Reference ID" },
                { key: "iradoc", path: "RecurringAccountingDocument", label: "Recurring Document" },
                { key: "irdoc", path: "ReverseDocument", label: "Reverse Document" },
                { key: "irdfy", path: "ReverseDocumentFiscalYear", label: "Reverse Doc Fiscal Year" },
                { key: "iadc", path: "AccountingDocumentCategory", label: "Document Category" },
                { key: "ipkey", path: "PostingKey", label: "Posting Key" },
                { key: "iglacc", path: "GLAccount", label: "GL Account" },
                { key: "iscomp", path: "SourceCompany", label: "Source Company" },
                { key: "irccentre", path: "CostCenter", label: "Cost Center" },
                { key: "ipcenter", path: "ProfitCenter", label: "Profit Center" },
                { key: "ifnarea", path: "FunctionalArea", label: "Functional Area" },
                { key: "ibarea", path: "BusinessArea", label: "Business Area" },
                { key: "icarea", path: "ControllingArea", label: "Controlling Area" },
                { key: "isegment", path: "Segment", label: "Segment" },
                { key: "ipccenter", path: "PartnerCostCenter", label: "Partner Cost Center" },
                { key: "ippcenter", path: "PartnerProfitCenter", label: "Partner Profit Center" },
                { key: "ipfnarea", path: "PartnerFunctionalArea", label: "Partner Functional Area" },
                { key: "ipbarea", path: "PartnerBusinessArea", label: "Partner Business Area" },
                { key: "ipcomp", path: "PartnerCompany", label: "Partner Company" },
                { key: "ipseg", path: "PartnerSegment", label: "Partner Segment" },
                { key: "ibtcurr", path: "BalanceTransactionCurrency", label: "Balance Trans Currency" },
                { key: "iabtr", path: "AmountInBalanceTransacCrcy", label: "Amount in Balance Trans Crcy" },
                { key: "itcurr", path: "TransactionCurrency", label: "Transaction Currency" },
                { key: "iatcurr", path: "AmountInTransactionCurrency", label: "Amount in Trans Currency" },
                { key: "iccodecur", path: "CompanyCodeCurrency", label: "Company Code Currency" },
                { key: "iaccurr", path: "AmountInCompanyCodeCurrency", label: "Amount in Co Code Crcy" },
                { key: "igcurr", path: "GlobalCurrency", label: "Global Currency" },
                { key: "iaigcurr", path: "AmountInGlobalCurrency", label: "Amount in Global Crcy" },
                { key: "ifncurr", path: "FunctionalCurrency", label: "Functional Currency" },
                { key: "iaifcurr", path: "AmountInFunctionalCurrency", label: "Amount in Functional Crcy" },
                { key: "ibunit", path: "BaseUnit", label: "Base Unit" },
                { key: "iquan", path: "Quantity", label: "Quantity" }
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