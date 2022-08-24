import Organization from "../models/organization.js";

export const getOrganizationById = async (req, res) => {
  const { organizationId: _id } = req.params;

  // const _id = "62fd60aa19e803d1b5ff2110";

  const organization = await Organization.findOne({ _id });
  console.log("Existing Org::::");
  console.log(organization);

  if (!organization) {
    return res.json({
      message: "No organization exists with this id.",
      error: true,
    });
  }

  return res.json({
    data: { organization: organization },
    message: "success",
    error: false,
  });
};

export const getOrganizationBySubDomain = async (req, res) => {
  const { subDomain } = req.params;
  console.log(req.params);

  // const _id = "62fd60aa19e803d1b5ff2110";

  const organization = await Organization.findOne({ subDomain });
  console.log("Existing Org::::");
  console.log(organization);

  if (!organization) {
    return res.json({
      message: "No organization exists with this id.",
      error: true,
    });
  }

  return res.json({
    data: { organization: organization },
    message: "success",
    error: false,
  });
};
