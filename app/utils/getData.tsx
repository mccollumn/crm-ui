import { cache } from "react";
import "server-only";

export const preload = (path: string) => {
  void getData(path);
};

export const getData = cache(async (path: string) => {
  try {
    const res = await fetch(`${process.env.CRM_API_ENDPOINT}/${path}`);

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("GET failed:", error);
  }
});

export const postData = cache(async (data: any) => {
  try {
    console.log("Posting data...");
    const res = await fetch("https://dev.to/api/articles", {
      method: "POST", // Or PUT?
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    console.log("POST result:", result);
    return res.json();
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

export const getOpenCases = async () => {
  const data = await getData("/case/list/open");
  return data;
};

export const getOpenCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/open/${ownerID}`);
  return data;
};

export const getHibernatedCases = async () => {
  const data = await getData("/case/list/hibernated");
  return data;
};

export const getHibernatedCasesByOwner = async (ownerID: string) => {
  const data = await getData(`/case/list/hibernated/${ownerID}`);
  return data;
};

export const getCaseData = async (caseID: string) => {
  // TODO: Are the API routes needed? Either use these functions or fetch directly from components.
  // const res = await fetch(`${process.env.API_ENDPOINT}/cases/api/${caseID}`);
  // const result = await res.json();
  // return result.data;
  const data = await getData(`/case/caseid/${caseID}`);
  return data;
};

export const getCasesPaginated = async (offset: string, rowCount: string) => {
  const data = await getData(`/case/list/all/${offset}/${rowCount}`);
  return data;
};

/**
 * Accounts
 */

export const getAccounts = async () => {
  const data = await getData("/account/listAccounts");
  return data;
};

export const getActiveAccounts = async () => {
  const data = await getData("/account/listActiveAccounts");
  return data;
};

/**
 * Contacts
 */

export const getContactsByAccount = async (accountID: string) => {
  const data = await getData(`/contact/listContactByAccount/${accountID}`);
  return data;
};

/**
 * Opportunities
 */

export const getOpportunityData = async (opportunityID: string) => {
  const data = await getData(`/opportunity/opportunityid/${opportunityID}`);
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
