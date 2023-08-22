export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SUSI',
    editProfile: 'B2C_1_EDIT_PROFILE',
  },
  authorities: {
    signUpSignIn: {
      authority: process.env.NEXT_PUBLIC_SUSI_AUTHORITY,
    },
    editProfile: {
      authority: process.env.NEXT_PUBLIC_EDIT_PROFILE_AUTHORITY,
    },
  },
  authorityDomain: process.env.NEXT_PUBLIC_AUTHORITY_DOMAIN,
}
