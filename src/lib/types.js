import PropTypes from "prop-types";
import { z } from "zod";

export const contentItemPropTypes = PropTypes.shape({
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number,
  mediaType: PropTypes.oneOf(["tv", "movie"]),
  original_language: PropTypes.string,
  original_title: PropTypes.string, // For movies
  original_name: PropTypes.string, // For TV shows
  overview: PropTypes.string,
  popularity: PropTypes.number,
  poster_path: PropTypes.string,
  release_date: PropTypes.string, // For movies
  first_air_date: PropTypes.string, // For TV shows
  title: PropTypes.string, // For movies
  name: PropTypes.string, // For TV shows
  origin_country: PropTypes.arrayOf(PropTypes.string), // For TV shows
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "The email is invalid" }).nonempty({
    message: "An email is required",
  }),
  displayName: z.string(),
  avatar: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "The email is invalid" }).nonempty({
    message: "An email is required",
  }),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 characters" }),
});

export const signUpFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "The password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, {
      message: "The confirmation password must be at least 8 characters",
    }),
    email: z.string().email({ message: "The email is invalid" }).nonempty({
      message: "An email is required",
    }),
    displayName: z.string().min(8, {
      message: "The Display Name must be at least 8 characters",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

export const updateAccountFormSchema = z.object({
  displayName: z.string().min(8, {
    message: "The Display Name must be at least 8 characters",
  }),
});

export const updatePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "The password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "The new password must be at least 8 characters" }),
    confirmNewPassword: z.string().min(8, {
      message: "The confirmation password must be at least 8 characters",
    }),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "The passwords do not match",
    path: ["confirmNewPassword"],
  });

export const updateAvatarFormSchema = z.object({
  avatar: z.string().nonempty({ message: "An avatar is required" }),
});

export const searchFormSchema = z.object({
  searchTerm: z.string().nonempty({ message: "A search term is required" }),
});
