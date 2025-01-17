import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation CreateNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const LOGIN = gql`
  mutation Login($data: UserInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_AD_BY_ID = gql`
  mutation UpdateAdById($data: UpdateAdInput!) {
    updateAd(data: $data)
  }
`;

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($codeByUser: String!) {
    confirmEmail(codeByUser: $codeByUser)
  }
`;

export const CONFIRM_PASSWORD = gql`
  mutation ConfirmPassword($newPassword: String!, $codeByUser: String!) {
    confirmPassword(newPassword: $newPassword, codeByUser: $codeByUser)
  }
`;

export const PASSWORD_RESET = gql`
  mutation PasswordReset($email: String!) {
    passwordReset(email: $email)
  }
`;
