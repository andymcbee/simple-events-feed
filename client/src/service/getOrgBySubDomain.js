import axios from "axios";

const getOrgBySubDomain = async (subDomain) => {
  console.log("GET ORG BY SUB DOMAIN SERVICE");
  console.log(subDomain);

  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/organizations/sub-domain/${subDomain}`
    );

    //  console.log(data.data.events);
    //console.log(data);

    console.log("DATA WITHIN GET ORG BY SUB DOMAIN");
    console.log(data.data);
    return data.data.organization;
  } catch (error) {
    console.log(error);
  }
};

export default getOrgBySubDomain;
