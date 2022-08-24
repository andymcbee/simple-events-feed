import axios from "axios";

const getOrgByOrgId = async (organizationId) => {
  console.log("GET ORG BY ORG ID SERVICE");
  console.log(organizationId);

  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/organizations/org-id/${organizationId}`
    );

    //  console.log(data.data.events);
    //console.log(data);

    console.log("DATA WITHIN GET ORG BY SUB DOMAIN");
    console.log(data.data?.organization);
    //  console.log(data.data);
    return data.data?.organization;
  } catch (error) {
    console.log(error);
  }
};

export default getOrgByOrgId;
