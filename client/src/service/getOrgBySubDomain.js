import { API } from "../api";

const getOrgBySubDomain = async (subDomain) => {
  try {
    const { data } = await API.get(
      `/api/v1/organizations/sub-domain/${subDomain}`
    );

    return data.data.organization;
  } catch (error) {
    console.log(error);
  }
};

export default getOrgBySubDomain;
