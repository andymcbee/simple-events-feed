import { API } from "../api";

const getOrgByOrgId = async (organizationId) => {
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
