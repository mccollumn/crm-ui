import { AccountData } from "../types/accounts";
import { AssetData } from "../types/assets";
import { CaseData } from "../types/cases";
import { ContactData } from "../types/contacts";
import { LicenseKeyData } from "../types/licenseKeys";
import { OpportunityData } from "../types/opportunities";
import {
  QuoteData,
  QuoteFulfillmentData,
  QuoteProductData,
} from "../types/quotes";
import { MenuItem } from "../types/types";
import { htmlEscape } from "./utils";
import { logger } from "../logger";
import "server-only";

/**
 * Eagerly initiate request and cache response
 * @param fn The data fetching function to run
 * @param args Array of function argmuments
 */
export const preload = (fn: (a?: any) => void, args: any[] = []) => {
  void fn(...args);
};

/**
 * Extracts the message from an unknown error type.
 * @param error Error thrown.
 * @returns Error message.
 */
const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export const getData = async (
  path: string,
  tags?: string[],
  noCache = false
) => {
  const tagOptions = tags ? { next: { tags: tags } } : {};
  const cacheOptions: RequestInit = noCache ? { cache: "no-store" } : {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/${path}`,
      { ...tagOptions, ...cacheOptions }
    );

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    logger.error(`<--- GET failed: ${errorMessage} --->`);
    logger.error(error);
    logger.error(
      `Request: ${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/${path}`,
      { requestOptions: { ...tagOptions, ...cacheOptions } }
    );
    return { message: errorMessage };
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: htmlEscape(JSON.stringify(data)),
    });
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    logger.error(`<--- POST failed: ${errorMessage} --->`);
    logger.error(error);
    logger.error(`Request: ${url}`, { requestOptions: data });
    return { message: errorMessage };
  }
};

/**
 * Cases
 */

export const getCases = async () => {
  await revalidateCaseCache();
  const data = await getData("/case/list/all", ["case"], true);
  return data;
};

export const getCasesPaginated = async (offset: string, rowCount: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/offset/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getCasesByOwner = async (ownerID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/by/owner/id/${ownerID}`,
    ["case"],
    true
  );
  return data;
};

export const getCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getCasesByAccount = async (accountID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/by/account/id/${accountID}`,
    ["case"],
    true
  );
  return data;
};

export const getCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getCasesByContact = async (contactID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/all/by/contact/id/${contactID}`,
    ["case"],
    true
  );
  return data;
};

export const getOpenCases = async () => {
  await revalidateCaseCache();
  const data = await getData("/case/list/open", ["case"], true);
  return data;
};

export const getOpenCasesByOwner = async (ownerID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/open/by/owner/id/${ownerID}`,
    ["case"],
    true
  );
  return data;
};

export const getOpenCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/open/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getOpenCasesByAccount = async (accountID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/open/by/account/id/${accountID}`,
    ["case"],
    true
  );
  return data;
};

export const getOpenCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/open/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getClosedCases = async () => {
  await revalidateCaseCache();
  const data = await getData("/case/list/closed", ["case"], true);
  return data;
};

export const getClosedCasesByOwner = async (ownerID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/closed/by/owner/id/${ownerID}`,
    ["case"],
    true
  );
  return data;
};

export const getClosedCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/closed/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getClosedCasesByAccount = async (accountID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/closed/by/account/id/${accountID}`,
    ["case"],
    true
  );
  return data;
};

export const getClosedCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/closed/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getHibernatedCases = async () => {
  await revalidateCaseCache();
  const data = await getData("/case/list/hibernated", ["case"], true);
  return data;
};

export const getHibernatedCasesByOwner = async (ownerID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/hibernated/by/owner/id/${ownerID}`,
    ["case"],
    true
  );
  return data;
};

export const getHibernatedCasesByOwnerPaginated = async (
  ownerID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/hibernated/by/owner/id/${ownerID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getHibernatedCasesByAccount = async (accountID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/hibernated/by/account/id/${accountID}`,
    ["case"],
    true
  );
  return data;
};

export const getHibernatedCasesByAccountPaginated = async (
  accountID: string,
  offset: string,
  rowCount: string
) => {
  await revalidateCaseCache();
  const data = await getData(
    `/case/list/hibernated/by/account/id/${accountID}/${offset}/rowcount/${rowCount}`,
    ["case"],
    true
  );
  return data;
};

export const getCaseData = async (caseID: string) => {
  const data: CaseData = await getData(`/case/caseid/${caseID}`, ["case"]);
  return data;
};

export const revalidateCaseCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=case`
  );
};

/**
 * Accounts
 */

export const getAccounts = async () => {
  await revalidateAccountCache();
  const data = await getData("/account/list/accounts", ["account"], true);
  return data;
};

export const getActiveAccounts = async () => {
  await revalidateAccountCache();
  const data = await getData(
    "/account/list/accounts/type/active",
    ["account"],
    true
  );
  return data;
};

export const getAccountData = async (accountID: string) => {
  const data: AccountData = await getData(`/account/accountid/${accountID}`, [
    "account",
  ]);
  return data;
};

export const revalidateAccountCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=account`
  );
};

/**
 * Assets
 */

export const getAssetData = async (assetID: string) => {
  const data: AssetData = await getData(`/asset/assetid/${assetID}`, ["asset"]);
  return data;
};

export const revalidateAssetCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=asset`
  );
};

/**
 * Contacts
 */

export const getContacts = async () => {
  await revalidateContactCache();
  const data = await getData("/contact/list", ["contact"], true);
  return data;
};

export const getContactsByAccount = async (accountID: string) => {
  await revalidateCaseCache();
  const data = await getData(
    `/contact/list/by/account/${accountID}`,
    ["contact"],
    true
  );
  return data;
};

export const getContactData = async (contactID: string) => {
  const data: ContactData = await getData(`/contact/contactid/${contactID}`, [
    "contact",
  ]);
  return data;
};

export const revalidateContactCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=contact`
  );
};

/**
 * License Keys
 */
export const getLicenseKeyData = async (keyID: string) => {
  const data: LicenseKeyData = await getData(
    `/licensekey/licensekeyid/${keyID}`,
    ["licenseKey"]
  );
  return data;
};

export const revalidateLicenseKeyCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=licenseKey`
  );
};

/**
 * Opportunities
 */

export const getOpenOpportunities = async () => {
  await revalidateOpportunityCache();
  const data = await getData("/opportunity/list/open", ["opportunity"], true);
  return data;
};

export const getWonOpportunities = async () => {
  await revalidateOpportunityCache();
  const data = await getData("/opportunity/list/won", ["opportunity"], true);
  return data;
};

export const getDeadOpportunities = async () => {
  await revalidateOpportunityCache();
  const data = await getData("/opportunity/list/dead", ["opportunity"], true);
  return data;
};

export const getOpenOpportunitiesByAccount = async (accountID: string) => {
  await revalidateOpportunityCache();
  const data = await getData(
    `/opportunity/list/open/by/account/id/${accountID}`,
    ["opportunity"],
    true
  );
  return data;
};

export const getWonOpportunitiesByAccount = async (accountID: string) => {
  await revalidateOpportunityCache();
  const data = await getData(
    `/opportunity/list/won/by/account/id/${accountID}`,
    ["opportunity"],
    true
  );
  return data;
};

export const getDeadOpportunitiesByAccount = async (accountID: string) => {
  await revalidateOpportunityCache();
  const data = await getData(
    `/opportunity/list/dead/by/account/id/${accountID}`,
    ["opportunity"],
    true
  );
  return data;
};

export const getOpportunityData = async (opportunityID: string) => {
  const data: OpportunityData = await getData(
    `/opportunity/opportunityid/${opportunityID}`,
    ["opportunity"]
  );
  return data;
};

export const submitNewOpportunity = async (data: any) => {
  const responseData = await postData(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/opportunity/insert`,
    data
  );
  return responseData;
};

export const revalidateOpportunityCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=opportunity`
  );
};

/**
 * Quotes
 */

export const getQuoteData = async (quoteID: string) => {
  const data: QuoteData = await getData(`/quote/quoteid/${quoteID}`, ["quote"]);
  return data;
};

export const getQuoteProductData = async (quoteProductID: string) => {
  const data: QuoteProductData = await getData(
    `/quoteproduct/quoteproductid/${quoteProductID}`,
    ["quote"]
  );
  return data;
};

export const getQuoteFulfillmentData = async (quoteFulfillmentID: string) => {
  const data: QuoteFulfillmentData = await getData(
    `/quotefulfillment/quotefulfillmentid/${quoteFulfillmentID}`,
    ["quote"]
  );
  return data;
};

export const submitNewQuote = async (data: any) => {
  const responseData = await postData(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/quote/insert`,
    data
  );
  return responseData;
};

export const submitNewQuoteProduct = async (data: any) => {
  const responseData = await postData(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/quoteproduct/insert`,
    data
  );
  return responseData;
};

export const revalidateQuoteCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=quote`
  );
};

/**
 * Sales Orders
 */

export const getSalesOrdersByAccount = async (accountID: string) => {
  await revalidateSalesOrderCache();
  const data = await getData(
    `/salesorder/list/by/account/id/${accountID}`,
    ["salesOrder"],
    true
  );
  return data;
};

export const revalidateSalesOrderCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=salesOrder`
  );
};

/**
 * Products
 */

export const getProducts = async () => {
  const data = await getData("/product/list", ["product"]);
  return data;
};

export const getProductData = async (productID: string) => {
  const data = await getData(`/product/productid/${productID}`);
  return data;
};

export const revalidateProductCache = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=product`
  );
};

/**
 * Search
 */

export const getSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/${searchTerm}`);
  return data;
};

export const getAccountSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/account/${searchTerm}`);
  return data;
};

export const getCaseSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/case/${searchTerm}`);
  return data;
};

export const getCaseCommentSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/casecomment/${searchTerm}`);
  return data;
};

export const getContactSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/contact/${searchTerm}`);
  return data;
};

export const getAssetSearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/asset/${searchTerm}`);
  return data;
};

export const getOpportunitySearchResults = async (searchTerm: string) => {
  const data = await getData(`/search/opportunity/${searchTerm}`);
  return data;
};

/**
 * Other Data
 */

export const getMenuItems = async () => {
  const data: MenuItem[] = await getData("/menu");
  return data;
};

export const getInternalUsers = async () => {
  const data = await getData("/user/list/internal");
  return data;
};
