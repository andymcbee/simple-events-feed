import { API } from "../api";

const getOrgByOrgId = async (organizationId) => {
  console.log("GET ORG BY ID -- SERVICE ---");
  console.log(organizationId);
  try {
    const { data } = await API.get(
      `/api/v1/organizations/org-id/${organizationId}`
    );

    return data.data?.organization;
  } catch (error) {
    console.log(error);
  }
};

export default getOrgByOrgId;
