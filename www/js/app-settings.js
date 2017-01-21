//custom app settings
app.constant('config', {
    appVersion: 1.0,
    appDate: '09 January 2017',
    // siteAddress: 'http://broadbandcompare.dev',
    siteAddress: 'http://www.broadbandcompare.co.nz',
    //global prefixes for main request parameters to filter plans
    paramPrefixA: 'application_components_DynamicModel',
    paramPrefixB: 'application_modules_site_models_web_FilterRowForm',
    //global prefix for lead request parameters
    leadParamPrefix: 'application_models_ar_Leads',
    //error messages settings
    errMsg: {
        loadProviders: {
            title: "Connection error",
            template: "Cannot load list of ISPs"
        },
        loadProviderInfo: {
            title: "Connection error",
            template: "Cannot load provider info"
        },
        loadExtras: {
            title: "Connection error",
            template: "Cannot load plan filter settings"
        },
        loadContractOptions: {
            title: "Connection error",
            template: "Cannot load plan filter settings"
        },
        loadConnectionOptions: {
            title: "Connection error",
            template: "Cannot load plan filter settings"
        },
        loadPlans: {
            title: "Connection error",
            template: "Cannot load list of internet plans"
        },
        loadOptions: {
            title: "Connection error",
            template: "Cannot load plan's options"
        },
        saveLead: {
            title: "Connection error",
            template: "Cannot save your details"
        }
    },
    //confirmation messages
    cnfMsg: {
        signUpPartner: {
            title: "Thank you!",
            template: "Congratulations, you've almost finished. Now we'll redirect you to " +
            "out partner's website so you can finish signing up"
        },
        signUpNonPartner: {
            title: "Thank you!",
            template: "If you have left your details to discuss another broadband plan " +
            "one of our partners will be in touch shortly"
        }
    }
});