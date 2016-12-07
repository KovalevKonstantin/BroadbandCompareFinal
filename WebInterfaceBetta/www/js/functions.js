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
 */
function addMainParamsToRequestStr(requestStr, plansFilter, defaultPlansFilter, config) {
    //address
    requestStr = requestStr + config.paramPrefixA + '[address]=' + plansFilter.address + '&';
    //filter mode
    if (plansFilter.advancedMode) {
        requestStr = requestStr + config.paramPrefixA + '[search_form]=advanced&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[search_form]=simple&';
    }
    //min speed boundary (not used now)
    requestStr = requestStr + config.paramPrefixA + '[type_min]=0&';
    //max speed boundary
    requestStr = requestStr + config.paramPrefixA + '[type_max]=' + (plansFilter.speedMax - 1) + '&';
    //min price
    requestStr = requestStr + config.paramPrefixA + '[price_min]=' + plansFilter.priceMin + '&';
    //max price (can be unlimited)
    if (plansFilter.priceMax < defaultPlansFilter.priceMax) {
        requestStr = requestStr + config.paramPrefixA + '[price_max]=' + plansFilter.priceMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[price_max]=201&';
    }
    //min download speed
    requestStr = requestStr + config.paramPrefixA + '[speed_dl_min]=' + plansFilter.speedDnldMin + '&';
    //max download speed (can be unlimited)
    if (plansFilter.speedDnldMax < defaultPlansFilter.speedDnldMax) {
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_max]=' + plansFilter.speedDnldMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[speed_dl_max]=101&';
    }
    //min data limit
    requestStr = requestStr + config.paramPrefixA + '[data_min]=' + plansFilter.dataMin + '&';
    //max data limit (can be unlimited)
    if (plansFilter.dataMax < defaultPlansFilter.dataMax) {
        requestStr = requestStr + config.paramPrefixA + '[data_max]=' + plansFilter.dataMax + '&';
    } else {
        requestStr = requestStr + config.paramPrefixA + '[data_max]=201&';
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