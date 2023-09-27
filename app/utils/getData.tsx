import { cache } from "react";
import "server-only";

/**
 * Eagerly initiate request and cache response
 * @param fn The data fetching function to run
 * @param args Array of function argmuments
 */
export const preload = (fn: (a?: any) => void, args: any[] = []) => {
  void fn(...args);
};

export const getData = cache(async (path: string, tags?: string[]) => {
  try {
    const tagOptions = tags ? { next: { tags: tags } } : {};
    console.log("Tag options:", tagOptions);
    const res = await fetch(
      `${process.env.CRM_API_ENDPOINT}/${path}`,
      tagOptions
    );

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("GET failed:", error);
  }
});

export const postData = cache(async (url: string, data: any) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return res;
  } catch (error) {
    console.error("POST failed:", error);
  }
});

/**
 * Cases
 */

export const getCases = async () => {
  const data = await getData("/case/list/all");
  return data;
};

export const getCasesPaginated = async (offset: string, rowCount: string) => {
  const data = await getData(
    `/case/list/all/offset/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/all/by/owner/id/${ownerID}`);
  return data;
};

export const getCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/all/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getCasesByAccount = async (accountID: string) => {
  const data = await getData(`/case/list/all/by/account/id/${accountID}`);
  return data;
};

export const getCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/all/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getOpenCases = async () => {
  const data = await getData("/case/list/open");
  return data;
};

export const getOpenCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/open/by/owner/id/${ownerID}`);
  return data;
};

export const getOpenCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/open/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getOpenCasesByAccount = async (accountID: string) => {
  const data = await getData(`/case/list/open/by/account/id/${accountID}`);
  return data;
};

export const getOpenCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/open/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getClosedCases = async () => {
  const data = await getData("/case/list/closed");
  return data;
};

export const getClosedCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/closed/by/owner/id/${ownerID}`);
  return data;
};

export const getClosedCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/closed/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getClosedCasesByAccount = async (accountID: string) => {
  const data = await getData(`/case/list/closed/by/account/id/${accountID}`);
  return data;
};

export const getClosedCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/closed/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getHibernatedCases = async () => {
  const data = await getData("/case/list/hibernated");
  return data;
};

export const getHibernatedCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/hibernated/by/owner/id/${ownerID}`);
  return data;
};

export const getHibernatedCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/hibernated/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getHibernatedCasesByAccount = async (accountID: string) => {
  const data = await getData(
    `/case/list/hibernated/by/account/id/${accountID}`
  );
  return data;
};

export const getHibernatedCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  const data = await getData(
    `/case/list/hibernated/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`
  );
  return data;
};

export const getCaseData = async (caseID: string) => {
  const data = await getData(`/case/caseid/${caseID}`, ["case"]);
  return data;
};

/**
 * Accounts
 */

export const getAccounts = async () => {
  const data = await getData("/account/list/accounts");
  return data;
};

export const getActiveAccounts = async () => {
  const data = await getData("/account/list/accounts/type/active");
  return data;
};

export const getAccountData = async (accountID: string) => {
  const data = await getData(`/account/accountid/${accountID}`, ["account"]);
  return data;
};

/**
 * Assets
 */

export const getAssetData = async (assetID: string) => {
  const data = await getData(`/asset/assetid/${assetID}`, ["asset"]);
  return data;
};

/**
 * Contacts
 */

export const getContacts = async () => {
  const data = await getData("/contact/list");
  return data;
};

export const getContactsByAccount = async (accountID: string) => {
  const data = await getData(`/contact/list/by/account/${accountID}`);
  return data;
};

export const getContactData = async (contactID: string) => {
  const data = await getData(`/contact/contactid/${contactID}`, ["contact"]);
  return data;
};

/**
 * License Keys
 */
export const getLicenseKeyData = async (keyID: string) => {
  const data = await getData(`/licensekey/licensekeyid/${keyID}`, [
    "licenseKey",
  ]);
  return data;
};

/**
 * Opportunities
 */

export const getOpenOpportunities = async () => {
  const data = await getData("/opportunity/list/open");
  return data;
};

export const getWonOpportunities = async () => {
  const data = await getData("/opportunity/list/won");
  return data;
};

export const getDeadOpportunities = async () => {
  const data = await getData("/opportunity/list/dead");
  return data;
};

export const getOpenOpportunitiesByAccount = async (accountID: string) => {
  const data = await getData(
    `/opportunity/list/open/by/account/id/${accountID}`
  );
  return data;
};

export const getWonOpportunitiesByAccount = async (accountID: string) => {
  const data = await getData(
    `/opportunity/list/won/by/account/id/${accountID}`
  );
  return data;
};

export const getDeadOpportunitiesByAccount = async (accountID: string) => {
  const data = await getData(
    `/opportunity/list/dead/by/account/id/${accountID}`
  );
  return data;
};

export const getOpportunityData = async (opportunityID: string) => {
  const data = await getData(`/opportunity/opportunityid/${opportunityID}`, [
    "opportunity",
  ]);
  return data;
};

/**
 * Quotes
 */

export const getQuoteData = async (quoteID: string) => {
  const data = await getData(`/quote/quoteid/${quoteID}`, ["quote"]);
  return data;
};

/**
 * Sales Orders
 */

export const getSalesOrdersByAccount = async (accountID: string) => {
  const data = await getData(`/salesorder/list/by/account/id/${accountID}`);
  return data;
};

/**
 * Other Data
 */

export const getMenuItems = async () => {
  const data = await getData("/menu");
  return data;
};

export const getSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/${searchTerm}`);
  return data;
};

export const getInternalUsers = async () => {
  const data = await getData("/user/list/internal");
  return data;
};
