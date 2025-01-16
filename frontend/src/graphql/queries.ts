import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
  query GetAllCategoriesAndTags {
    getAllCategories {
      id
      title
    }
    getAllTags {
      id
      name
    }
  }
`;

export const GET_ALL_ADS = gql`
  query GetAllAds($title: String, $category: String) {
    getAllAds(title: $title, category: $category) {
      id
      title
      description
      price
      location
      createdAt
      category {
        id
        title
      }
      pictures {
        id
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      price
      user {
        email
      }
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      isLoggedIn
      email
    }
  }
`;

export const GET_ALL_CATEGORIES_AND_USER_INFO = gql`
  query GetAllCategoriesAndUserInfo {
    getAllCategories {
      id
      title
    }
    getUserInfo {
      isLoggedIn
      email
    }
  }
`;
