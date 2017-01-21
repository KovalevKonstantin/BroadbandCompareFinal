/**
 * Compare function to sort plans and options
 *
 * @param a first plan (is it lower (-1) or upper (1) than the second?)
 * @param b second plan
 * @returns {number} comparison result (-1/0/1)
 */
function globalComparatorForPlansOptions (a, b) {
    switch (globalComparatorForPlansOptions.orderBy.value) {
        // order by rate DESC
        case globalComparatorForPlansOptions.sortings.rating.value:
            if (a.pureRate < b.pureRate) {
                return 1;
            } else if (a.pureRate > b.pureRate) {
                return -1;
            } else {
                return 0;
            }
            break;
        //order by price ASC, then by rate DESC
        case globalComparatorForPlansOptions.sortings.price_asc.value:
            if (a.price > b.price) {
                return 1;
            } else if (a.price < b.price) {
                return -1;
            } else {
                if (a.pureRate < b.pureRate) {
                    return 1;
                } else if (a.pureRate > b.pureRate) {
                    return -1;
                } else {
                    return 0;
                }
            }
            break;
        //order by price DESC, then by rate DESC
        case globalComparatorForPlansOptions.sortings.price_desc.value:
            if (a.price < b.price) {
                return 1;
            } else if (a.price > b.price) {
                return -1;
            } else {
                if (a.pureRate < b.pureRate) {
                    return 1;
                } else if (a.pureRate > b.pureRate) {
                    return -1;
                } else {
                    return 0;
                }
            }
            break;
    }
}

/**
 * Add main parameters (from global filter) to request string. Used to get data from website via API
 * @param requestStr request sting to assemble
 * @param plansFilter global filter
 * @param defaultPlansFilter default global filter settings
 * @param config app config constant
 * @param typeToParameters association between general connection purpose (type) and connection params
 */
function addMainParamsToRequestStr(requestStr, plansFilter, defaultPlansFilter, config, typeToParameters) {
    //address
    requestStr = requestStr + config.paramPrefixA + '[address]=' + plansFilter.address + '&';
    //min type (general connection purpose) boundary
    requestStr = requestStr + config.paramPrefixA + '[type_min]=' + (plansFilter.speedMin - 1) + '&';
    //max type (general connection purpose) boundary
    requestStr = requestStr + config.paramPrefixA + '[type_max]=' + (plansFilter.speedMax - 1) + '&';
    //filter mode
    if (plansFilter.advancedMode) {
        requestStr = requestStr + config.paramPrefixA + '[search_form]=advanced&';

        //for anvanced filter set  connection parameters as chosen op filter page

        //min download speed
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_min]=' + plansFilter.speedDnldMin + '&';
        //min data limit
        requestStr = requestStr + config.paramPrefixA + '[data_min]=' + plansFilter.dataMin + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[search_form]=simple&';

        //for simple filter set some connection parameters according to general purpose chosen
        
        //min download speed
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_min]=' + typeToParameters.typeMin[plansFilter.speedMin - 1].speedDlMin + '&';
        //min data limit
        requestStr = requestStr + config.paramPrefixA + '[data_min]=' + typeToParameters.typeMin[plansFilter.speedMin - 1].dataMin + '&';
    }
    //max download speed (can be unlimited)
    if (plansFilter.speedDnldMax < defaultPlansFilter.speedDnldMax) {
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_max]=' + plansFilter.speedDnldMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_max]=1000&';
    }
    //max data limit (can be unlimited)
    if (plansFilter.dataMax < defaultPlansFilter.dataMax) {
        requestStr = requestStr + config.paramPrefixA + '[data_max]=' + plansFilter.dataMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[data_max]=201&';
    }
    //min price
    requestStr = requestStr + config.paramPrefixA + '[price_min]=' + plansFilter.priceMin + '&';
    //max price (can be unlimited)
    if (plansFilter.priceMax < defaultPlansFilter.priceMax) {
        requestStr = requestStr + config.paramPrefixA + '[price_max]=' + plansFilter.priceMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[price_max]=201&';
    }
    //list of providers (ISP IDs)
    if (plansFilter.providers != null) {
        plansFilter.providers.forEach(function (provider) {
            requestStr = requestStr + config.paramPrefixA + '[isp_ids][]=' + provider.id + '&';
        });
    }
    //list of extras (tariff options)
    if (plansFilter.extrasList != null) {
        plansFilter.extrasList.forEach(function (extra) {
            if (extra.checked) {
                requestStr = requestStr + config.paramPrefixA + '[tariff_options][]=' + extra.value + '&';
            }
        });
    }
    //list of contract options
    if (plansFilter.contractOptions != null) {
        plansFilter.contractOptions.forEach(function (option) {
            if (option.checked) {
                requestStr = requestStr + config.paramPrefixA + '[contract][]=' + option.value + '&';
            }
        });
    }
    //list of connection (additional) options
    if (plansFilter.connectionOptions != null) {
        plansFilter.connectionOptions.forEach(function (option) {
            if (option.checked) {
                requestStr = requestStr + config.paramPrefixB + '[filter][]=' + option.value + '&';
            }
        });
    }
    //order of plans
    requestStr = requestStr + config.paramPrefixB + '[order]=' + plansFilter.orderBy.value + '&';

    return requestStr;
}

/**
 * Add additional parameters (for options filtering) to request string. Used to get data from website via API
 * @param requestStr request sting to assemble
 * @param plansList
 * @param planIndex
 */
function addOptionsParamsToRequestStr(requestStr, plansList, planIndex) {
    //plan (family) ID
    requestStr = requestStr + 'familyId=' + plansList[planIndex].id + '&';
    //max rating for all plans (families)
    requestStr = requestStr + 'maxRate=' + plansList[planIndex].pureRate + '&';
    //rating of the plan (family)
    requestStr = requestStr + 'familyRating=' + plansList[planIndex].rating + '&';
    //full search (not used now)
    requestStr = requestStr + 'fullSearch=1&';

    return requestStr;
}

/**
 * Replace placeholders in tracking link with actual params
 * @param link Tracking link
 * @param option Purchased plan (option)
 * @param plan Option parent plan (family)
 * @param appConfig Config const
 * @param clickId Click ID
 * @returns Processed link
 */
function fillPurchaseLinkParams(link, option, plan, appConfig, clickId) {
    link = link.replace(/\{pid\}/g, '69');
    link = link.replace('{clickid}', clickId);
    var offerId = link.match(/offer_id=(\d+)/)[1];
    link = link.replace('{offer_id}', offerId);

    link = link.replace('{planID}', option.id);
    link = link.replace('{type}', plan.connectionType);
    link = link.replace('{data}', (option.data > 0) ? option.data + 'GB' : 'Unlim');
    link = link.replace('{speed}', Math.round(option.speedDnld) + 'Mbps' + '/' +
        Math.round(option.speedUpld) + 'Mbps');
    link = link.replace('{price}', '$' + option.price);

    link = link.replace('{utm_source}', 'application');
    link = link.replace('{utm_medium}', 'cpa');
    link = link.replace('{utm_term}', 'broadbandcompare');
    link = link.replace('{utm_content}', 'application v' + appConfig.appVersion);
    link = link.replace('{utm_campaign}', 'Google/Apple');

    link = link.replace('{sub1}', '');
    link = link.replace('{sub2}', '');
    link = link.replace('{sub3}', '');
    link = link.replace('{sub4}', '');
    link = link.replace('{sub5}', '');

    return link;
}